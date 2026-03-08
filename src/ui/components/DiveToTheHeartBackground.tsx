import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export const DiveToTheHeartBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <Sparkles count={40} scale={12} size={3} speed={0.4} opacity={0.6} color="#4ea6ff" />
        <Sparkles count={30} scale={10} size={2} speed={0.3} opacity={0.5} color="#ff6ec7" />
        <Sparkles count={20} scale={10} size={2.5} speed={0.5} opacity={0.8} color="#ffd700" />
        <Sparkles count={40} scale={15} size={1.5} speed={0.2} opacity={0.4} color="#ffffff" />
      </Canvas>
    </div>
  )
}