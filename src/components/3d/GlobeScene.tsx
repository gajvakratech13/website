"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function TechGlobe() {
  const pointsRef = useRef<THREE.Points>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const sphereWireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate points on a sphere (globe vertices)
  const [positions, colors] = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const radius = 2.2;
    const colorBlue = new THREE.Color("#00f0ff");
    const colorPurple = new THREE.Color("#bd00ff");

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on a sphere
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Blend colors based on position
      const mixedColor = colorBlue.clone().lerp(colorPurple, (y + radius) / (2 * radius));
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }

    return [pos, cols];
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Rotate the globe
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.12;
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.05) * 0.1;
    }

    // Spin internal wireframe core at a offset speed
    if (sphereWireRef.current) {
      sphereWireRef.current.rotation.y = -elapsed * 0.08;
      sphereWireRef.current.rotation.x = Math.cos(elapsed * 0.05) * 0.08;
    }

    // Spin orbiting rings
    if (ringRef1.current) {
      ringRef1.current.rotation.z = elapsed * 0.4;
      ringRef1.current.rotation.x = elapsed * 0.2;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = -elapsed * 0.3;
      ringRef2.current.rotation.y = elapsed * 0.15;
    }

    // Dynamic rotation based on mouse hover coordinates (parallax attraction)
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.06;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Point Cloud Sphere */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* Internal holographic wireframe mesh globe */}
      <mesh ref={sphereWireRef}>
        <sphereGeometry args={[2.18, 24, 24]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Orbiting Tech Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.7, 0.015, 8, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Orbiting Tech Ring 2 */}
      <mesh ref={ringRef2} rotation={[Math.PI / -6, Math.PI / 4, 0]}>
        <torusGeometry args={[2.9, 0.008, 6, 80]} />
        <meshBasicMaterial color="#bd00ff" transparent opacity={0.25} wireframe />
      </mesh>

      {/* Glowing core light */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function StarField() {
  const starsRef = useRef<THREE.Points>(null);
  const [positions] = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread stars around a wide sphere
      const r = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return [pos];
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.y = -elapsed * 0.02;
      starsRef.current.rotation.x = Math.sin(elapsed * 0.01) * 0.05;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function GlobeScene() {
  return (
    <div className="w-full h-full relative flex items-center justify-center min-h-[300px] md:min-h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <TechGlobe />
        <StarField />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
      
      {/* Futuristic glowing backdrops */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-neon-blue/10 blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-neon-purple/10 blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}
