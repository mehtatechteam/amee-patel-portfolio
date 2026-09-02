"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { PortfolioItem } from "@/lib/constants/portfolio";

export type HeroArcHandle = {
  /** Spin the arc by a drag delta, in pixels of pointer movement. */
  nudge: (deltaPx: number) => void;
  /** Release with an inertial angular velocity (radians/frame-ish). */
  release: (angularVelocity: number) => void;
};

const RADIUS = 9.5;
const ANGLE_STEP = 0.3;
const CARD_HEIGHT = 4.4;
// The curve amplitude used to be a fixed world-unit constant applied to
// every card regardless of width — fine for wide cards, but a narrow
// portrait card (e.g. a slim pouch, ~2.9 world units wide) got the exact
// same absolute bend as a wide one (~6+ units), which is a much steeper
// bend relative to its own width: it read as a warped, twisted product
// shot instead of a gentle curl, and made on-package text illegible.
// Fixed by making curve depth a per-card uniform proportional to that
// card's own width (see Card below) instead of a shader-baked constant.
const CURVE_DEPTH_RATIO = 0.065;
const CURVE_SEGMENTS = 32;
// The reference's spotlight effect only works because the stage behind the
// cards is dark — a light void gives the shader nothing to contrast
// against (confirmed live: an earlier all-paper-white version scored 61/100
// specifically for reading as "overexposed" rather than dramatic). This is
// a deliberate, confirmed exception to the site's light-mode rule: the
// overall page (nav, headline band, background) stays light — only this
// contained WebGL "stage" goes dark, reusing the site's own `--color-ink`
// token (not a new invented color) so it still feels like this site's ink,
// not an unrelated dark theme bolted on.
const STAGE_DARK = "#1d1d1f"; // matches --color-ink in app/globals.css
const STAGE_DARKER = "#131315";
const FOG_COLOR = STAGE_DARKER;
const FLOOR_COLOR = "#1a1a1c";
const GRID_LINE_COLOR = "#54545a";

function effectiveAngle(index: number, centerIndex: number, groupRotation: number, idleSway = 0) {
  return (index - centerIndex) * ANGLE_STEP - groupRotation - idleSway;
}
/** A slow, continuous sway applied on top of the drag offset — reference
 * has this too. so the arc reads as a living scene, not a static render
 * that only moves when dragged. */
function idleSway(elapsed: number) {
  return Math.sin(elapsed * 0.35) * 0.018;
}
function arcPosition(effAngle: number): [number, number, number] {
  return [Math.sin(effAngle) * RADIUS, 0, Math.cos(effAngle) * RADIUS - RADIUS];
}

// Vertex shader: bows each card's width toward the camera (a cylindrical
// page curl, like Jesper's bent-plane cards) via a parabola on local u,
// and derives a real per-vertex normal from the curve's slope (not just a
// fake shading term) so the fragment shader can do actual rim lighting.
const CARD_VERTEX_SHADER = /* glsl */ `
  uniform float uCurveDepth;
  varying vec2 vUv;
  varying float vCurve;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float u = uv.x - 0.5;
    float curve = (1.0 - u * u * 4.0);
    pos.z += curve * uCurveDepth;
    vCurve = curve;

    // Slope of the curve at this u gives the local surface tilt; rotate
    // the flat plane normal (0,0,1) by that tilt around Y for a real bent
    // normal instead of a flat one wrapped over curved geometry.
    float slope = -u * 8.0 * uCurveDepth;
    vec3 n = normalize(vec3(sin(slope), 0.0, cos(slope)));
    vNormal = normalize(normalMatrix * n);

    vec4 worldPos = modelViewMatrix * vec4(pos, 1.0);
    vViewDir = normalize(-worldPos.xyz);
    gl_Position = projectionMatrix * worldPos;
  }
`;

const CARD_FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uFocus;
  varying vec2 vUv;
  varying float vCurve;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 tex = texture2D(uMap, vUv);

    // Base curve shading: the bowl's rim reads darker than its center.
    float shade = 0.86 + vCurve * 0.16;

    // Fresnel-style rim light — brightest where the bent surface grazes
    // away from the viewer, like a studio rim light catching the edge of
    // a curved product shot. Scaled by uFocus so only the front-ish
    // card(s) actually catch a visible highlight, matching the
    // reference's single-spotlit-card composition.
    float fresnel = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), 2.2);
    float rim = fresnel * 0.55 * uFocus;

    // Off-focus cards don't just fade to transparent, they also desaturate
    // and dim toward near-black — real underexposure into the dark stage,
    // matching the reference's side cards sinking into shadow rather than
    // just going see-through.
    float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    vec3 desaturated = mix(vec3(gray), tex.rgb, 0.3 + uFocus * 0.7);
    vec3 dimmed = mix(vec3(0.04), desaturated, 0.12 + uFocus * 0.88);

    vec3 color = dimmed * shade + vec3(rim);
    gl_FragColor = vec4(color, tex.a * uOpacity);
  }
`;

function makeGridTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = FLOOR_COLOR;
  ctx.fillRect(0, 0, size, size);
  // Thin, high-contrast lines — the reference's grid reads like precise
  // technical drafting, not a soft decorative pattern, and that crispness
  // is a real part of what makes the void feel considered rather than a
  // placeholder texture.
  ctx.strokeStyle = GRID_LINE_COLOR;
  ctx.lineWidth = 1;
  const step = size / 20;
  for (let i = 0; i <= 20; i++) {
    ctx.beginPath();
    ctx.moveTo(i * step, 0);
    ctx.lineTo(i * step, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * step);
    ctx.lineTo(size, i * step);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(24, 24);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Floor() {
  const texture = useMemo(() => makeGridTexture(), []);
  return (
    <mesh position={[0, -CARD_HEIGHT / 2 - 0.02, -6]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[140, 140]} />
      <meshBasicMaterial map={texture} transparent opacity={0.95} />
    </mesh>
  );
}

function Card({
  item,
  index,
  centerIndex,
  groupRotationRef,
}: {
  item: PortfolioItem;
  index: number;
  centerIndex: number;
  groupRotationRef: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(item.src);
  const ratio = item.width / item.height;
  const cardWidth = CARD_HEIGHT * ratio;

  const geometry = useMemo(() => new THREE.PlaneGeometry(cardWidth, CARD_HEIGHT, CURVE_SEGMENTS, 1), [cardWidth]);
  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uOpacity: { value: 1 },
      uFocus: { value: 0 },
      uCurveDepth: { value: cardWidth * CURVE_DEPTH_RATIO },
    }),
    [texture, cardWidth],
  );

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    const effAngle = effectiveAngle(index, centerIndex, groupRotationRef.current ?? 0, idleSway(state.clock.elapsedTime));
    const [x, y, z] = arcPosition(effAngle);
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = effAngle;

    // Two separate curves off the same angle: opacity fades gradually so
    // cards don't hard-cut out of existence, but uFocus (driving
    // desaturation/dimming/rim-light in the shader) collapses much faster
    // — only the front card (or the one or two nearest it) reads as truly
    // "lit," everything else recedes into a dim, gray haze well before it
    // goes transparent. That asymmetry is what makes the reference's
    // single-spotlit-card composition read as premium instead of a flat,
    // evenly-lit row.
    const abs = Math.abs(effAngle);
    const opacityAbs = Math.min(1, abs / (ANGLE_STEP * 2.1));
    materialRef.current.uniforms.uOpacity.value = 1 - opacityAbs * 0.96;
    const focusAbs = Math.min(1, abs / (ANGLE_STEP * 0.85));
    materialRef.current.uniforms.uFocus.value = 1 - focusAbs;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial ref={materialRef} vertexShader={CARD_VERTEX_SHADER} fragmentShader={CARD_FRAGMENT_SHADER} uniforms={uniforms} transparent />
    </mesh>
  );
}

/** Tracks whichever card is currently nearest dead-center and floats an
 * HTML label (client name + view chip) at its position — recomputed
 * directly from the same angle math the cards use, not fed back from
 * them, so there's only one source of truth for "what's in front." */
function FrontLabel({ items, centerIndex, groupRotationRef }: { items: PortfolioItem[]; centerIndex: number; groupRotationRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const [frontItem, setFrontItem] = useState<PortfolioItem | null>(items[Math.round(centerIndex)] ?? null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const sway = idleSway(state.clock.elapsedTime);
    let bestIndex = 0;
    let bestAbs = Infinity;
    for (let i = 0; i < items.length; i++) {
      const abs = Math.abs(effectiveAngle(i, centerIndex, groupRotationRef.current ?? 0, sway));
      if (abs < bestAbs) {
        bestAbs = abs;
        bestIndex = i;
      }
    }
    const effAngle = effectiveAngle(bestIndex, centerIndex, groupRotationRef.current ?? 0, sway);
    const [x, , z] = arcPosition(effAngle);
    groupRef.current.position.set(x, -CARD_HEIGHT / 2 + 0.55, z);
    const next = items[bestIndex] ?? null;
    if (next && next.slug !== frontItem?.slug) setFrontItem(next);
  });

  return (
    <group ref={groupRef}>
      {/* distanceFactor kept low (a bigger on-screen render scaled down
          less) with a matching larger base font-size — a smaller
          distanceFactor + bigger font produces the same on-screen size as
          a larger distanceFactor + smaller font, but renders the DOM text
          at higher effective resolution before the Html CSS transform
          shrinks it, which is what actually fixes the blur/loose-tracking
          look a steeper scale-down caused. A solid paper scrim behind the
          text (not just the arrow chip) guarantees contrast against any
          product photo, since a bare-text label had no contrast guarantee
          against busy packaging art. Two-line title/tag treatment mirrors
          the reference's front-card-only rich caption (side cards there
          carry almost no chrome at all — matched by our uFocus-gated rim
          light making only this same front card read as "selected"). */}
      <Html center distanceFactor={4.5} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div
          key={frontItem?.slug}
          className="flex items-center gap-3 rounded-2xl bg-paper/95 py-2 pr-2 pl-4 whitespace-nowrap shadow-[0_12px_30px_-10px_rgba(0,0,0,0.4)]"
          style={{ animation: "labelFade 0.25s ease-out" }}
        >
          <div className="flex flex-col leading-tight">
            <span className="font-spec text-lg font-normal tracking-wide text-ink">{frontItem?.client}</span>
            {frontItem?.tags?.[0] && <span className="text-xs text-ink-faint">{frontItem.tags[0]}</span>}
          </div>
          <span className="flex size-9 flex-none items-center justify-center rounded-full bg-ink text-sm text-paper">↗</span>
        </div>
      </Html>
    </group>
  );
}

function Scene({
  items,
  onHandleReady,
}: {
  items: PortfolioItem[];
  onHandleReady: (handle: HeroArcHandle) => void;
}) {
  const { camera } = useThree();
  const groupRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const centerIndex = (items.length - 1) / 2;
  const maxOffset = (items.length - 1) * 0.5 * ANGLE_STEP;

  useEffect(() => {
    camera.position.set(0, 0.6, RADIUS * 0.55);
    camera.lookAt(0, -1.1, -1.5);

    onHandleReady({
      nudge(deltaPx: number) {
        velocityRef.current = 0;
        groupRotationRef.current = Math.max(-maxOffset, Math.min(maxOffset, groupRotationRef.current - deltaPx * 0.0035));
      },
      release(angularVelocity: number) {
        velocityRef.current = -angularVelocity;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-time camera + handle setup; refs stay live for the scene's lifetime.
  }, []);

  useFrame(() => {
    if (Math.abs(velocityRef.current) > 0.0002) {
      const next = groupRotationRef.current + velocityRef.current;
      if (next > maxOffset || next < -maxOffset) velocityRef.current = 0;
      groupRotationRef.current = Math.max(-maxOffset, Math.min(maxOffset, next));
      velocityRef.current *= 0.94;
    }
  });

  return (
    <>
      <fog attach="fog" args={[FOG_COLOR, 4, 19]} />
      <Floor />
      {/* useTexture (in Card) suspends while each image decodes — without
          this boundary the whole scene (including Floor, which doesn't
          depend on any texture) stayed stuck in a pending Suspense state
          with nothing painted at all, confirmed live as a blank transparent
          canvas showing the page's paper background through it. */}
      <Suspense fallback={null}>
        {items.map((item, i) => (
          <Card key={item.slug} item={item} index={i} centerIndex={centerIndex} groupRotationRef={groupRotationRef} />
        ))}
      </Suspense>
      <FrontLabel items={items} centerIndex={centerIndex} groupRotationRef={groupRotationRef} />
    </>
  );
}

/**
 * A real WebGL arc of curved product-shot planes over a fog-lit grid
 * floor, rebuilding jesperlandberg.com's dark-void spotlit card arc —
 * built from scratch on this codebase's own R3F stack (see
 * components/process/UnfoldingBoxScene.tsx for the established
 * imperative-handle/dynamic-import conventions this follows). Cards sit on
 * a fixed arc; dragging spins the whole arc's rotation offset (`nudge`/
 * `release`) rather than translating a flat row, and distance-based scale
 * falls out of the real 3D camera for free instead of being faked with CSS.
 *
 * Deliberately NOT light-mode inside this canvas (see STAGE_DARK above) —
 * an earlier all-paper-white version scored 61/100 for reading as
 * "overexposed" rather than dramatic, because the reference's spotlight
 * effect only works against a dark stage. The site around it (nav, hero
 * headline band, page background) stays fully light-mode; only this
 * contained WebGL stage goes dark, reusing the site's own ink token.
 */
export function HeroArcScene({ items, onHandleReady }: { items: PortfolioItem[]; onHandleReady: (handle: HeroArcHandle) => void }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 44, near: 0.1, far: 60 }} gl={{ antialias: true, alpha: false }}>
      {/* Opaque dark background (not the alpha:true/transparent-to-page
          approach the light-void version used) — the stage needs to be
          reliably dark at every pixel, including corners past the fog's
          reach, not just wherever the fog/floor happen to paint. */}
      <color attach="background" args={[STAGE_DARK]} />
      <Scene items={items} onHandleReady={onHandleReady} />
    </Canvas>
  );
}
