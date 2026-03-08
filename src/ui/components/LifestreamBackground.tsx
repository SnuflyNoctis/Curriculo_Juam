import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

const ParticleField = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Sparkles count={50} scale={20} size={3} speed={0.2} opacity={0.8} color="#00aaff" />

      <Sparkles count={50} scale={20} size={3} speed={0.2} opacity={0.8} color="#e0ffff" />

      <Sparkles count={100} scale={12} size={1} speed={0.5} opacity={0.3} color="#0055ff" />
    </group>
  );
};

export const LifestreamBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
};