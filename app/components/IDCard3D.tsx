/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyTypeString,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import serious from "@/app/Images/moodoff.png";
import hoodie from "@/app/Images/Hoodie.png";
import bandTexture from "@/app/Images/Band.png";

extend({ MeshLineGeometry, MeshLineMaterial });

interface RigidBodyRef {
  translation: () => THREE.Vector3;
  rotation: () => THREE.Euler;
  angvel: () => THREE.Vector3;
  setAngvel: (vel: { x: number; y: number; z: number }) => void;
  setNextKinematicTranslation: (pos: {
    x: number;
    y: number;
    z: number;
  }) => void;
  wakeUp: () => void;
  lerped?: THREE.Vector3;
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RigidBodyRef>(null);
  const j1 = useRef<RigidBodyRef>(null);
  const j2 = useRef<RigidBodyRef>(null);
  const j3 = useRef<RigidBodyRef>(null);
  const card = useRef<RigidBodyRef>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps = {
    type: "dynamic" as RigidBodyTypeString,
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  };
  const texture = useTexture(bandTexture.src);
  const frontTexture = useTexture(serious.src);
  const backTexture = useTexture(hoodie.src);
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3 as any, card as any, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current &&
      band.current
    ) {
      [j1, j2].forEach((ref) => {
        if (!ref.current!.lerped) {
          ref.current!.lerped = new THREE.Vector3().copy(
            ref.current!.translation()
          );
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(
            1,
            ref.current!.lerped.distanceTo(ref.current!.translation())
          )
        );
        const speed = minSpeed + clampedDistance * (maxSpeed - minSpeed);
        ref.current!.lerped.lerp(ref.current!.translation(), delta * speed);
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped!);
      curve.points[2].copy(j1.current.lerped!);
      curve.points[3].copy(fixed.current.translation());
      if (band.current.geometry instanceof MeshLineGeometry) {
        band.current.geometry.setPoints(curve.getPoints(32));
      }
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* @ts-expect-error  ref is not defined*/}
        <RigidBody ref={fixed} type="fixed" />
        {/* @ts-expect-error  ref is not defined*/}
        <RigidBody position={[0.8, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.15]} />
        </RigidBody>
        {/* @ts-expect-error  ref is not defined*/}
        <RigidBody position={[1.6, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.15]} />
        </RigidBody>
        {/* @ts-expect-error  ref is not defined*/}
        <RigidBody position={[2.4, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.15]} />
        </RigidBody>

        <RigidBody
          position={[3.2, 0, 0]}
          // @ts-expect-error ref type mismatch
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerUp={(e: any) => {
            e.target.releasePointerCapture(e.pointerId);
            drag(false);
          }}
          onPointerDown={(e: any) => {
            e.target.setPointerCapture(e.pointerId);
            if (card.current) {
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }
          }}
          onDoubleClick={() => setFlipped(!flipped)}
        >
          <CuboidCollider args={[1.2, 1.7, 0.01]} />
          <group rotation={[0, flipped ? Math.PI : 0, 0]}>
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[2.4, 3.4]} />
              <meshStandardMaterial
                map={frontTexture}
                map-anisotropy={16}
                roughness={0.6}
                side={THREE.FrontSide}
              />
            </mesh>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[2.4, 3.4]} />
              <meshStandardMaterial
                map={backTexture}
                map-anisotropy={16}
                roughness={0.6}
                side={THREE.BackSide}
              />
            </mesh>
            <mesh>
              <boxGeometry args={[2.5, 3.5, 0.02]} />
              <meshStandardMaterial
                color="#0096FF"
                roughness={0.5}
                transparent
                opacity={0.2}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-expect-error  ref is not defined*/}
        <meshLineGeometry />
        {/* @ts-expect-error  ref is not defined*/}
        <meshLineMaterial
          color="#0096FF"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}

export default function IDCard3D() {
  return (
    <div className="h-[600px] w-full bg-[#FAFAFA] dark:bg-[#000000]">
      <Canvas camera={{ position: [0, 0, 15], fov: 25 }}>
        <ambientLight intensity={0.8} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment background={false}>
          <color attach="background" args={["#FAFAFA"]} />
          <Lightformer
            intensity={0.1}
            color="#FFFFFF"
            position={[0, 5, 5]}
            rotation={[0, 0, 0]}
            scale={[5, 5, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
