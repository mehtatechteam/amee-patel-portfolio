/* eslint-disable react-hooks/refs */
"use client";

import { createRef, Suspense, useMemo, useRef, type RefObject } from "react";
import { Canvas, extend, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { Physics, RigidBody, useSphericalJoint, type RapierRigidBody } from "@react-three/rapier";
import { RigidBodyType } from "@dimforge/rapier3d-compat";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElements["bufferGeometry"];
    meshLineMaterial: ThreeElements["meshBasicMaterial"] & { lineWidth?: number };
  }
}

const SEGMENT_COUNT = 4;
const SEGMENT_GAP = 0.3;
const ANCHOR_Y = 2.1;
const CARD_SIZE: [number, number, number] = [0.85, 1.2, 0.06];

type BodyRef = RefObject<RapierRigidBody | null>;
// @react-three/rapier's joint hooks type their ref params as
// RefObject<RapierRigidBody> (non-null) — React's own createRef/useRef
// always type as RefObject<T | null> since a ref starts empty. The
// values are handled correctly either way; this is just bridging the
// two libraries' ref typings at the call site.
const asJointRef = (ref: BodyRef) => ref as unknown as RefObject<RapierRigidBody>;

/** Draws the real, sourced "studio ID" content onto a canvas texture — a
 * designed monogram + Amee's real name/title/start-year, the same
 * honesty rule DesignerSpecCard's "SCFA Alum" badge already follows
 * (no fabricated photo, no invented institution crest). */
function useCardTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f4f3ee";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#1d1d1f";
      ctx.lineWidth = 8;
      ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);

      ctx.beginPath();
      ctx.setLineDash([9, 7]);
      ctx.lineWidth = 4;
      ctx.arc(256, 240, 96, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#1d1d1f";
      ctx.textAlign = "center";
      ctx.font = "700 64px system-ui, sans-serif";
      ctx.fillText("AP", 256, 268);

      ctx.font = "600 34px system-ui, sans-serif";
      ctx.fillText("AMEE J. PATEL", 256, 430);

      ctx.fillStyle = "#6e6e73";
      ctx.font = "600 20px system-ui, sans-serif";
      ctx.fillText("PACKAGING & PRINT DESIGNER", 256, 470);

      ctx.font = "500 18px system-ui, sans-serif";
      ctx.fillText("STUDIO ID · SINCE 2012", 256, 620);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/** Ribbon geometry following the live rope-segment positions each frame
 * (MeshLine, not a plain line — gives it real width). */
function Ribbon({ anchorRef, segRefs, cardRef }: { anchorRef: BodyRef; segRefs: BodyRef[]; cardRef: BodyRef }) {
  const geoRef = useRef<InstanceType<typeof MeshLineGeometry>>(null);
  const buffer = useRef(new Float32Array((SEGMENT_COUNT + 2) * 3));

  useFrame(() => {
    const anchor = anchorRef.current;
    const card = cardRef.current;
    if (!anchor || !card || !geoRef.current) return;

    let i = 0;
    const write = (v: { x: number; y: number; z: number }) => {
      buffer.current[i * 3] = v.x;
      buffer.current[i * 3 + 1] = v.y;
      buffer.current[i * 3 + 2] = v.z;
      i += 1;
    };
    write(anchor.translation());
    for (const seg of segRefs) {
      if (seg.current) write(seg.current.translation());
    }
    write(card.translation());
    geoRef.current.setPoints(buffer.current.slice(0, i * 3));
  });

  return (
    <mesh>
      <meshLineGeometry ref={geoRef} />
      <meshLineMaterial color="#1d1d1f" lineWidth={0.045} />
    </mesh>
  );
}

function Card({ segmentEndRef, cardRef }: { segmentEndRef: BodyRef; cardRef: BodyRef }) {
  const texture = useCardTexture();
  const { camera, gl } = useThree();
  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const raycaster = useRef(new THREE.Raycaster());

  useSphericalJoint(asJointRef(segmentEndRef), asJointRef(cardRef), [
    [0, -SEGMENT_GAP / 2, 0],
    [0, CARD_SIZE[1] / 2 + 0.05, 0],
  ]);

  function toWorldPoint(clientX: number, clientY: number) {
    const rect = gl.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.current.setFromCamera(ndc, camera);
    const point = new THREE.Vector3();
    raycaster.current.ray.intersectPlane(dragPlane.current, point);
    return point;
  }

  function onPointerDown(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    const body = cardRef.current;
    if (!body) return;
    const t = body.translation();
    dragPlane.current.set(new THREE.Vector3(0, 0, 1), -t.z);
    body.setBodyType(RigidBodyType.KinematicPositionBased, true);

    function handleMove(ev: PointerEvent) {
      const point = toWorldPoint(ev.clientX, ev.clientY);
      body!.setNextKinematicTranslation({ x: point.x, y: point.y, z: t.z });
    }
    function handleUp() {
      body!.setBodyType(RigidBodyType.Dynamic, true);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    }
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  return (
    <RigidBody
      ref={cardRef}
      colliders="cuboid"
      position={[0, ANCHOR_Y - (SEGMENT_COUNT + 1) * SEGMENT_GAP, 0]}
      angularDamping={2.2}
      linearDamping={0.6}
    >
      <mesh onPointerDown={onPointerDown} castShadow>
        <boxGeometry args={CARD_SIZE} />
        <meshStandardMaterial map={texture} roughness={0.55} metalness={0.05} />
      </mesh>
    </RigidBody>
  );
}

function RopeSegment({ bodyRef, prevRef, y, isFirst }: { bodyRef: BodyRef; prevRef: BodyRef; y: number; isFirst: boolean }) {
  useSphericalJoint(asJointRef(prevRef), asJointRef(bodyRef), [
    [0, isFirst ? 0 : -SEGMENT_GAP / 2, 0],
    [0, SEGMENT_GAP / 2, 0],
  ]);

  return (
    <RigidBody ref={bodyRef} colliders="ball" position={[0, y, 0]} linearDamping={0.6} angularDamping={0.9}>
      <mesh visible={false}>
        <sphereGeometry args={[0.04]} />
      </mesh>
    </RigidBody>
  );
}

function Rig() {
  // One stable array of refs — [anchor, seg0..segN-1, card] — created
  // once via createRef so every joint hook gets a referentially-stable
  // RefObject across renders (a fresh object literal each render would
  // make useSphericalJoint tear down and recreate the joint every frame).
  const bodyRefs = useMemo(() => Array.from({ length: SEGMENT_COUNT + 2 }, () => createRef<RapierRigidBody>()), []);
  const anchorRef = bodyRefs[0];
  const segRefs = bodyRefs.slice(1, 1 + SEGMENT_COUNT);
  const cardRef = bodyRefs[bodyRefs.length - 1];

  return (
    <>
      <RigidBody ref={anchorRef} type="fixed" position={[0, ANCHOR_Y, 0]}>
        <mesh>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#1d1d1f" />
        </mesh>
      </RigidBody>

      {segRefs.map((ref, i) => (
        <RopeSegment
          key={i}
          bodyRef={ref}
          prevRef={i === 0 ? anchorRef : segRefs[i - 1]}
          y={ANCHOR_Y - (i + 1) * SEGMENT_GAP}
          isFirst={i === 0}
        />
      ))}

      <Card segmentEndRef={segRefs[SEGMENT_COUNT - 1]} cardRef={cardRef} />
      <Ribbon anchorRef={anchorRef} segRefs={segRefs} cardRef={cardRef} />
    </>
  );
}

/**
 * Small, self-contained physics-simulated "studio ID" hanging from a
 * ribbon — its own Canvas + Physics world, not the (now-removed)
 * site-wide persistent one. Draggable/swingable via real spherical-joint
 * physics (@react-three/rapier), rendered as a MeshLine ribbon.
 */
export function Lanyard({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: 170, height: 260 }} aria-hidden>
      <Canvas camera={{ position: [0, 1.1, 4.6], fov: 38 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 3]} intensity={1.1} />
        {/* @react-three/rapier's <Physics> lazily loads the Rapier WASM
            module via suspend-react and must be wrapped in <Suspense> —
            without it, the Canvas's WebGL context reliably crashed
            (observed as THREE.WebGLRenderer: Context Lost) the moment
            Physics mounted, confirmed by isolating a bare RigidBody
            with no joints/meshline still reproducing the same crash. */}
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <Rig />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
