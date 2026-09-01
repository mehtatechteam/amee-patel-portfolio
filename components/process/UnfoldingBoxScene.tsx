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
const LID_DEPTH = 1.15; // a touch shorter than DEPTH so it reads as a flap, not another wall
// How far the lid ends up propped open once the box is fully folded, in
// radians, measured relative to the back panel it's hinged to (not world
// space) — see the lid rig comment below for why relative-to-parent is
// what makes this a hinge rather than a second independently-driven panel.
const LID_OPEN_ANGLE = -0.55;

const PAPER_COLOR = "#f2efe6";
const INK_COLOR = "#1d2a4a";
const ACCENT_COLOR = "#2a9d8f";
const NAVY_COLOR = "#1d2a4a";

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return { canvas, ctx: canvas.getContext("2d")! };
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Pure, stateless pseudo-random float in [0, 1) for a given index — used
 * instead of `Math.random()`/a mutable LCG closure so texture generation
 * stays a pure function of its inputs (no impure calls, no reassigned
 * variables), which the project's react-hooks/purity lint rule requires
 * even inside a one-time `useMemo`. Same texture every time, deterministic. */
function pseudoRandom(index: number) {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Every panel gets its own real texture (not just the front) — an earlier
 * version left back/left/right as bare flat color, which read as an
 * obvious placeholder the moment the box was rotated, next to the site's
 * actual richly-lit product photography two sections earlier. Still no
 * stretched product photo anywhere: we only have a photo of the *assembled*
 * box, and warping that across flat panels would look faked. Front/back
 * carry real typography; sides carry a simple brand monogram + a
 * decorative (non-functional, no fabricated numbers) barcode graphic —
 * standard packaging panel conventions, not scanned from anywhere real.
 */
function usePanelTextures() {
  return useMemo(() => {
    const w = HEIGHT / WIDTH;

    // Front — the wordmark, unchanged from the original single-texture version.
    const front = makeCanvas(512, Math.round(512 * w));
    front.ctx.fillStyle = PAPER_COLOR;
    front.ctx.fillRect(0, 0, front.canvas.width, front.canvas.height);
    front.ctx.fillStyle = ACCENT_COLOR;
    front.ctx.fillRect(0, front.canvas.height * 0.42, front.canvas.width, front.canvas.height * 0.04);
    front.ctx.fillStyle = INK_COLOR;
    front.ctx.font = "700 64px Arial";
    front.ctx.textAlign = "center";
    front.ctx.textBaseline = "middle";
    front.ctx.fillText("MEDWEEN", front.canvas.width / 2, front.canvas.height * 0.28);
    front.ctx.font = "400 20px Arial";
    front.ctx.fillStyle = "#6e6e73";
    front.ctx.fillText("ONE BOTTLE. ONE DOSE. ONE PURPOSE.", front.canvas.width / 2, front.canvas.height * 0.62);

    // Back — accent stripe + simulated fine-print block (thin gray lines,
    // not real/legible text) — the panel real cartons put manufacturing
    // detail on, without inventing specific claims.
    const back = makeCanvas(512, Math.round(512 * w));
    back.ctx.fillStyle = PAPER_COLOR;
    back.ctx.fillRect(0, 0, back.canvas.width, back.canvas.height);
    back.ctx.fillStyle = ACCENT_COLOR;
    back.ctx.fillRect(0, back.canvas.height * 0.12, back.canvas.width, back.canvas.height * 0.03);
    back.ctx.strokeStyle = "#c9c6ba";
    back.ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      const y = back.canvas.height * 0.28 + i * 14;
      const lineW = back.canvas.width * (0.5 + pseudoRandom(i) * 0.35);
      back.ctx.beginPath();
      back.ctx.moveTo(back.canvas.width * 0.5 - lineW / 2, y);
      back.ctx.lineTo(back.canvas.width * 0.5 + lineW / 2, y);
      back.ctx.stroke();
    }
    back.ctx.fillStyle = "#9a9790";
    back.ctx.font = "400 14px Arial";
    back.ctx.textAlign = "center";
    back.ctx.fillText("MFG. DETAIL ON CARTON", back.canvas.width / 2, back.canvas.height * 0.82);

    // Left — navy ground, brand monogram.
    const side = makeCanvas(512, Math.round(512 * (HEIGHT / DEPTH)));
    side.ctx.fillStyle = NAVY_COLOR;
    side.ctx.fillRect(0, 0, side.canvas.width, side.canvas.height);
    side.ctx.fillStyle = ACCENT_COLOR;
    side.ctx.fillRect(0, side.canvas.height * 0.46, side.canvas.width, side.canvas.height * 0.03);
    side.ctx.fillStyle = "#f5f4ef";
    side.ctx.font = "700 120px Arial";
    side.ctx.textAlign = "center";
    side.ctx.textBaseline = "middle";
    side.ctx.fillText("M", side.canvas.width / 2, side.canvas.height * 0.3);

    // Right — navy ground, decorative barcode (visual convention only,
    // not encoding any real value). Bar widths/gaps come from the same
    // pure index-based pseudoRandom() as the back panel's lines above —
    // deterministic, same texture every time.
    const side2 = makeCanvas(512, Math.round(512 * (HEIGHT / DEPTH)));
    side2.ctx.fillStyle = NAVY_COLOR;
    side2.ctx.fillRect(0, 0, side2.canvas.width, side2.canvas.height);
    side2.ctx.fillStyle = "#f5f4ef";
    const barAreaW = side2.canvas.width * 0.7;
    const barStartX = (side2.canvas.width - barAreaW) / 2;
    let cursor = 0;
    let barIndex = 0;
    while (cursor < barAreaW) {
      const barW = 1 + pseudoRandom(barIndex * 2) * 4;
      if (pseudoRandom(barIndex * 2 + 1) > 0.35) {
        side2.ctx.fillRect(barStartX + cursor, side2.canvas.height * 0.35, barW, side2.canvas.height * 0.3);
      }
      cursor += barW + 2;
      barIndex += 1;
    }

    return {
      front: toTexture(front.canvas),
      back: toTexture(back.canvas),
      left: toTexture(side.canvas),
      right: toTexture(side2.canvas),
    };
  }, []);
}

/** A soft radial-gradient blob used as a fake contact shadow under the box
 * so it doesn't look like it's floating on pure white. */
function useShadowTexture() {
  return useMemo(() => {
    const { canvas, ctx } = makeCanvas(256, 256);
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(20,20,20,0.35)");
    gradient.addColorStop(0.6, "rgba(20,20,20,0.14)");
    gradient.addColorStop(1, "rgba(20,20,20,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return toTexture(canvas);
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
 *
 * Has a top-lid flap, hinged to the back panel via a real Object3D
 * parent/child relationship (the lid mesh is nested inside `backRef`'s
 * JSX, not a sibling) so it inherits the back panel's own fold rotation
 * for free and only needs a small additional open/close delta on top —
 * the nested-transform work an earlier version scoped out. It ends up
 * propped open, not swung shut over the opening, so the "open
 * presentation tray" framing in UnfoldingBox.tsx's copy still holds; a
 * fully sealed lid would need the flap's swing to overshoot past the
 * opening's plane and was judged more likely to clip through the front
 * panel than to read as a convincing seal.
 */
export function UnfoldingBoxScene({ onHandleReady }: { onHandleReady?: (handle: UnfoldingBoxHandle) => void }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const frontRef = useRef<THREE.Mesh | null>(null);
  const backRef = useRef<THREE.Mesh | null>(null);
  const leftRef = useRef<THREE.Mesh | null>(null);
  const rightRef = useRef<THREE.Mesh | null>(null);
  const lidRef = useRef<THREE.Mesh | null>(null);
  const textures = usePanelTextures();
  const shadowTexture = useShadowTexture();

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
  // Same hinge-at-edge technique as the walls above, but this geometry's
  // mesh is nested as a JSX *child* of the back panel's own mesh (see the
  // render below) rather than a sibling of it — a real Object3D parent/
  // child relationship, not just visual proximity. That's what makes this
  // a hinge relative to the back panel instead of a second panel animated
  // independently: the lid's own rotation is defined in the back panel's
  // local space, so it automatically inherits the back panel's fold and
  // only needs its own small delta on top for the open/close swing.
  const lidGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(WIDTH, LID_DEPTH);
    g.translate(0, LID_DEPTH / 2, 0);
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
        // At clamped=0 the lid's own local rotation is 0, so it stays
        // flush with the back panel — correct for the flat dieline, where
        // the lid is just another flap continuing the same 2D layout. As
        // clamped rises toward 1 (box fully folded, back panel now
        // standing upright), the lid swings open by LID_OPEN_ANGLE
        // *relative to the back panel* — propped open, completing the box
        // with a real hinged lid rather than leaving it as bare walls.
        if (lidRef.current) lidRef.current.rotation.x = LID_OPEN_ANGLE * clamped;
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
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} />
      <directionalLight position={[-3, 2, -4]} intensity={0.4} />

      <mesh position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
        <planeGeometry args={[WIDTH * 1.8, DEPTH * 2.2]} />
        <meshBasicMaterial map={shadowTexture} transparent depthWrite={false} />
      </mesh>

      <group ref={groupRef}>
        <mesh geometry={baseGeo} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={PAPER_COLOR} side={THREE.DoubleSide} roughness={0.9} />
        </mesh>

        <mesh ref={frontRef} geometry={frontBackGeo} position={[0, 0, DEPTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial map={textures.front} side={THREE.DoubleSide} roughness={0.85} />
        </mesh>
        <mesh ref={backRef} geometry={frontBackGeo} position={[0, 0, -DEPTH / 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial map={textures.back} side={THREE.DoubleSide} roughness={0.9} />
          {/* Lid flap, hinged at the back panel's top edge — nested here
              (a real Object3D child of backRef, not a sibling) so it
              inherits the back panel's own fold rotation for free and only
              needs the small extra open/close delta driven above. */}
          <mesh ref={lidRef} geometry={lidGeo} position={[0, HEIGHT, 0]}>
            <meshStandardMaterial color={PAPER_COLOR} side={THREE.DoubleSide} roughness={0.9} />
          </mesh>
        </mesh>
        <mesh ref={leftRef} geometry={leftRightGeo} position={[-WIDTH / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial map={textures.left} side={THREE.DoubleSide} roughness={0.7} />
        </mesh>
        <mesh ref={rightRef} geometry={leftRightGeo} position={[WIDTH / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial map={textures.right} side={THREE.DoubleSide} roughness={0.7} />
        </mesh>
      </group>
    </Canvas>
  );
}
