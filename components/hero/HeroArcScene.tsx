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
const CURVE_DEPTH = 0.95;
const CURVE_SEGMENTS = 24;
const FOG_COLOR = "#fcfcfa";
const FLOOR_COLOR = "#f4f3ee";
const GRID_LINE_COLOR = "#dedad0";

function effectiveAngle(index: number, centerIndex: number, groupRotation: number) {
  return (index - centerIndex) * ANGLE_STEP - groupRotation;
}
function arcPosition(effAngle: number): [number, number, number] {
  return [Math.sin(effAngle) * RADIUS, 0, Math.cos(effAngle) * RADIUS - RADIUS];
}

// Vertex shader: bows each card's width toward the camera (a shallow page
// curl, like Jesper's bent-plane cards) via a parabola on local u — cheap,
// no real cloth sim needed since the bend is static per card, not dynamic.
const CARD_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  varying float vCurve;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float u = uv.x - 0.5;
    float curve = (1.0 - u * u * 4.0);
    pos.z += curve * ${CURVE_DEPTH.toFixed(2)};
    vCurve = curve;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const CARD_FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vCurve;
  void main() {
    vec4 tex = texture2D(uMap, vUv);
    // Fake diffuse from the curve's own slope: the bowl's rim reads
    // slightly darker than its center, giving the bend real dimensionality
    // instead of a flat texture wrapped over a curved shape.
    float shade = 0.88 + vCurve * 0.14;
    gl_FragColor = vec4(tex.rgb * shade, tex.a * uOpacity);
  }
`;

function makeGridTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = FLOOR_COLOR;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = GRID_LINE_COLOR;
  ctx.lineWidth = 2;
  const step = size / 14;
  for (let i = 0; i <= 14; i++) {
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
  tex.repeat.set(10, 10);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Floor() {
  const texture = useMemo(() => makeGridTexture(), []);
  return (
    <mesh position={[0, -CARD_HEIGHT / 2 - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshBasicMaterial map={texture} transparent opacity={0.85} />
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
  const uniforms = useMemo(() => ({ uMap: { value: texture }, uOpacity: { value: 1 } }), [texture]);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;
    const effAngle = effectiveAngle(index, centerIndex, groupRotationRef.current ?? 0);
    const [x, y, z] = arcPosition(effAngle);
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = effAngle;

    const abs = Math.min(1, Math.abs(effAngle) / (ANGLE_STEP * 2.1));
    materialRef.current.uniforms.uOpacity.value = 1 - abs * 0.96;
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

  useFrame(() => {
    if (!groupRef.current) return;
    let bestIndex = 0;
    let bestAbs = Infinity;
    for (let i = 0; i < items.length; i++) {
      const abs = Math.abs(effectiveAngle(i, centerIndex, groupRotationRef.current ?? 0));
      if (abs < bestAbs) {
        bestAbs = abs;
        bestIndex = i;
      }
    }
    const effAngle = effectiveAngle(bestIndex, centerIndex, groupRotationRef.current ?? 0);
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
          against busy packaging art. */}
      <Html center distanceFactor={4.5} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div
          key={frontItem?.slug}
          className="flex items-center gap-2.5 rounded-full bg-paper/95 py-1.5 pr-1.5 pl-4 whitespace-nowrap shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]"
          style={{ animation: "labelFade 0.25s ease-out" }}
        >
          <span className="font-spec text-lg font-normal tracking-wide text-ink">{frontItem?.client}</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-ink text-sm text-paper">↗</span>
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
      <fog attach="fog" args={[FOG_COLOR, 3.5, 13]} />
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
 * floor — the light-mode rebuild of jesperlandberg.com's dark-void card
 * arc, built from scratch on this codebase's own R3F stack (see
 * components/process/UnfoldingBoxScene.tsx for the established
 * imperative-handle/dynamic-import conventions this follows). Cards sit on
 * a fixed arc; dragging spins the whole arc's rotation offset (`nudge`/
 * `release`) rather than translating a flat row, and distance-based scale
 * falls out of the real 3D camera for free instead of being faked with
 * CSS. Fog fades receding cards and the floor to paper white — the
 * light-mode analogue of the reference fading to black void.
 */
export function HeroArcScene({ items, onHandleReady }: { items: PortfolioItem[]; onHandleReady: (handle: HeroArcHandle) => void }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 44, near: 0.1, far: 60 }} gl={{ antialias: true, alpha: true }}>
      <Scene items={items} onHandleReady={onHandleReady} />
    </Canvas>
  );
}
