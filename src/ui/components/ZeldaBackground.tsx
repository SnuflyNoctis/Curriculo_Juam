import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export const ZeldaBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <Sparkles count={80} scale={12} size={2} speed={0.2} opacity={0.6} color="#00f7ff" />

        <Sparkles count={40} scale={10} size={1.5} speed={0.4} opacity={0.8} color="#ffd700" />

        <Sparkles count={30} scale={15} size={3} speed={0.1} opacity={0.3} color="#ffffff" />
      </Canvas>
    </div>
  )
} 