"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  type: "octahedron" | "torus" | "icosahedron";
  speed: number;
}

function Shape({ position, color, type, speed }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  const initialX = position[0];

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (!meshRef.current || !coreRef.current || !groupRef.current) return;

    // Slow continuous rotation
    meshRef.current.rotation.x = elapsed * 0.15 * speed;
    meshRef.current.rotation.y = elapsed * 0.2 * speed;
    
    coreRef.current.rotation.x = -elapsed * 0.1 * speed;
    coreRef.current.rotation.y = -elapsed * 0.15 * speed;

    // Gentle floating translation (up and down)
    const floatY = Math.sin(elapsed * 0.8 * speed) * 0.25;

    // Direct magnetic/parallax attraction to cursor
    // state.pointer.x and state.pointer.y are normalized coordinates (-1 to 1)
    const targetX = initialX + state.pointer.x * 0.8;
    const targetY = initialY + floatY + state.pointer.y * 0.8;
    const targetZ = position[2] + Math.abs(state.pointer.x) * 0.4; // pull forward slightly when mouse moves away from center

    // Smooth lerp attraction
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.06;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.06;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.06;

    // Tilt based on mouse pointer
    groupRef.current.rotation.z = (state.pointer.x * Math.PI) / 10;
    groupRef.current.rotation.x = (-state.pointer.y * Math.PI) / 10;
  });

  return (
    <group ref={groupRef}>
      {/* Outer glass physical material */}
      <mesh ref={meshRef}>
        {type === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {type === "torus" && <torusGeometry args={[0.7, 0.22, 16, 64]} />}
        {type === "icosahedron" && <icosahedronGeometry args={[0.9, 1]} />}
        
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.85}
          thickness={1.5}
          ior={1.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner neon wireframe core */}
      <mesh ref={coreRef} scale={[0.82, 0.82, 0.82]}>
        {type === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {type === "torus" && <torusGeometry args={[0.7, 0.22, 8, 32]} />}
        {type === "icosahedron" && <icosahedronGeometry args={[0.9, 1]} />}
        
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 opacity-70 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#bd00ff" />
        
        {/* Floating elements */}
        <Shape position={[-2.2, 1.2, -1]} color="#00f0ff" type="octahedron" speed={0.8} />
        <Shape position={[2.4, -1.0, 0]} color="#bd00ff" type="torus" speed={1.2} />
        <Shape position={[-2.0, -1.5, -2]} color="#ff007f" type="icosahedron" speed={0.9} />
        <Shape position={[2.0, 1.4, -1]} color="#00ffff" type="octahedron" speed={0.7} />

        {/* Dynamic lights following the shapes */}
        <pointLight position={[0, 0, 2]} intensity={0.5} color="#00f0ff" />
      </Canvas>
    </div>
  );
}
