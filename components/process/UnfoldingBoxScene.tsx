"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export type UnfoldingBoxHandle = {
  /** 0 = flat dieline, 1 = fully folded box. Imperative (no React re-render per frame). */
  setFoldProgress: (t: number) => void;
  /** Extra user-driven spin on top of the fold, in radians. */
  setUserRotationY: (rad: number) => void;
};

const WIDTH = 2;
const DEPTH = 1.4;
const HEIGHT = 1.5;

const PAPER_COLOR = "#f2efe6";
const INK_COLOR = "#1d2a4a";
const ACCENT_COLOR = "#2a9d8f";

/** Renders the front panel's simplified brand mark onto a canvas — real
 * typography, not a stretched product photo (we only have a photo of the
 * assembled box, and warping that across a flat panel would look faked). */
function useFrontTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = Math.round(512 * (HEIGHT / WIDTH));
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = PAPER_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ACCENT_COLOR;
    ctx.fillRect(0, canvas.height * 0.42, canvas.width, canvas.height * 0.04);
    ctx.fillStyle = INK_COLOR;
    ctx.font = "700 64px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("MEDWEEN", canvas.width / 2, canvas.height * 0.28);
    ctx.font = "400 20px Arial";
    ctx.fillStyle = "#6e6e73";
    ctx.fillText("ONE BOTTLE. ONE DOSE. ONE PURPOSE.", canvas.width / 2, canvas.height * 0.62);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/**
 * Reports an imperative handle to the parent via a plain callback prop
 * rather than `forwardRef` — this component is loaded through
 * `next/dynamic`, and depending on a `ref` prop surviving that wrapper
 * boundary isn't guaranteed the way a normal prop is.
 *
 * The box rig lives directly in this component (not split into a child
 * that receives the mesh refs as props) — react-hooks' `refs` rule flags
 * passing ref objects down as props and attaching them in a child as
 * "accessing a ref during render," even though nothing here reads
 * `.current` at render time. Keeping every `ref={...}` attachment in the
 * same component that owns the `useRef` call sidesteps that entirely.
 */
export function UnfoldingBoxScene({ onHandleReady }: { onHandleReady?: (handle: UnfoldingBoxHandle) => void }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const frontRef = useRef<THREE.Mesh | null>(null);
  const backRef = useRef<THREE.Mesh | null>(null);
  const leftRef = useRef<THREE.Mesh | null>(null);
  const rightRef = useRef<THREE.Mesh | null>(null);
  const frontTexture = useFrontTexture();

  // Panel geometries with pivots relocated to their hinge edge via
  // `geometry.translate()` (the Codrops on-scroll-folding-box technique) —
  // rotating the mesh then reads as a real hinge instead of a pivot around
  // the panel's own center.
  const baseGeo = useMemo(() => new THREE.PlaneGeometry(WIDTH, DEPTH), []);
  const frontBackGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(WIDTH, HEIGHT);
    g.translate(0, HEIGHT / 2, 0);
    return g;
  }, []);
  const leftRightGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(DEPTH, HEIGHT);
    g.rotateY(Math.PI / 2);
    g.translate(0, HEIGHT / 2, 0);
    return g;
  }, []);

  useEffect(() => {
    onHandleReady?.({
      setFoldProgress(t: number) {
        const clamped = Math.min(1, Math.max(0, t));
        const swing = (Math.PI / 2) * (1 - clamped);
        if (frontRef.current) frontRef.current.rotation.x = swing;
        if (backRef.current) backRef.current.rotation.x = -swing;
        if (leftRef.current) leftRef.current.rotation.z = swing;
        if (rightRef.current) rightRef.current.rotation.z = -swing;
      },
      setUserRotationY(rad: number) {
        if (groupRef.current) groupRef.current.rotation.y = rad;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- report once on mount; refs are stable for the component's lifetime.
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [3.4, 2.6, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <directionalLight position={[-3, 2, -4]} intensity={0.35} />
      <group ref={groupRef}>
        <mesh geometry={baseGeo} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={PAPER_COLOR} side={THREE.DoubleSide} roughness={0.9} />
        </mesh>

        <mesh ref={frontRef} geometry={frontBackGeo} position={[0, 0, DEPTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial map={frontTexture} side={THREE.DoubleSide} roughness={0.85} />
        </mesh>
        <mesh ref={backRef} geometry={frontBackGeo} position={[0, 0, -DEPTH / 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={PAPER_COLOR} side={THREE.DoubleSide} roughness={0.9} />
        </mesh>
        <mesh ref={leftRef} geometry={leftRightGeo} position={[-WIDTH / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color={PAPER_COLOR} side={THREE.DoubleSide} roughness={0.9} />
        </mesh>
        <mesh ref={rightRef} geometry={leftRightGeo} position={[WIDTH / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial color={PAPER_COLOR} side={THREE.DoubleSide} roughness={0.9} />
        </mesh>
      </group>
    </Canvas>
  );
}
