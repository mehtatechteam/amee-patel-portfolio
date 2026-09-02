"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type ClothCurtainHandle = {
  /** 0 = flat, covering the viewport. 1 = fully lifted off the top edge. */
  setProgress: (t: number) => void;
};

const PAPER_COLOR = "#fcfcfa";
const SEGMENTS_X = 48;
const SEGMENTS_Y = 32;

// Cloth-like ripple: low-frequency sway plus a higher-frequency flutter,
// both damped toward the top edge (uv.y near 1) since that's the leading
// edge that lifts first and straightens out fastest — the bottom (uv.y
// near 0) is the last part still moving and whips the most, same as
// yanking a sheet up off a table.
const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  varying float vFold;

  void main() {
    vec3 pos = position;
    float trail = 1.0 - uv.y;
    float sway = sin(uv.x * 9.0 + uTime * 1.1) * 14.0;
    float flutter = sin(uv.x * 26.0 - uTime * 2.6) * 5.0;
    float fold = (sway + flutter) * trail;
    pos.z += fold;
    vFold = fold;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fake diffuse shading from the fold value alone (cheap stand-in for real
// normals) — folds bulging toward the camera read lighter, recessed folds
// read darker, giving the ripple actual dimensionality instead of a flat
// wobbling color field.
const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  varying float vFold;

  void main() {
    // Near-white paper has almost no headroom to brighten, so a plain
    // multiplicative shade (uColor * factor) clips to 1.0 almost
    // immediately and the ripple barely reads. Mixing toward a darker
    // "shadow" tone in the troughs (and a true white at the crests)
    // keeps both directions visible instead of losing the highlight half
    // to clipping.
    float t = clamp(vFold * 0.045 + 0.5, 0.0, 1.0);
    vec3 shadow = uColor * 0.88;
    vec3 highlight = vec3(1.0);
    vec3 color = mix(shadow, highlight, t);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function CurtainMesh({ onReady }: { onReady: (handle: ClothCurtainHandle) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const progressRef = useRef(0);
  const { size } = useThree();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(size.width, size.height, SEGMENTS_X, SEGMENTS_Y),
    [size.width, size.height],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uColor: { value: new THREE.Color(PAPER_COLOR) },
    }),
    [],
  );

  useEffect(() => {
    onReady({
      setProgress(t: number) {
        progressRef.current = Math.min(1, Math.max(0, t));
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- report the handle once; the ref-backed setter stays live for the mesh's lifetime.
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uProgress.value = progressRef.current;
    // Lift the whole sheet up and off the top edge as progress advances —
    // one full viewport height of travel plus a margin so the rippling
    // bottom trailing edge fully clears the screen before it's hidden.
    meshRef.current.position.y = progressRef.current * (size.height + 120);
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial ref={materialRef} vertexShader={VERTEX_SHADER} fragmentShader={FRAGMENT_SHADER} uniforms={uniforms} />
    </mesh>
  );
}

/**
 * The loading screen's curtain, rebuilt as an actual rippling cloth sheet
 * (a displaced-vertex PlaneGeometry, not a flat CSS panel) that lifts up
 * and off the top edge on completion — see LoadingScreen.tsx's finish(),
 * which drives `setProgress` 0→1 via GSAP. An orthographic camera at
 * zoom 1 makes world units equal CSS pixels, so the plane's geometry is
 * sized directly from the canvas's own pixel dimensions (via useThree's
 * `size`) and always exactly covers the viewport with no unit conversion.
 */
export function ClothCurtainScene({ onReady }: { onReady: (handle: ClothCurtainHandle) => void }) {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 500], zoom: 1, near: 0.1, far: 2000 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
      <CurtainMesh onReady={onReady} />
    </Canvas>
  );
}
