import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import { GraphicsConfig } from "../../performance/GraphicsConfig";
import { CanvasOptimizer } from "../../performance/CanvasOptimizer";
import { FloatingHearts } from "../components/FloatingHearts/floatingHearts";

export const DiveToTheHeartBackground = () => {
  if (!GraphicsConfig.enable3D) return null;

  return (
    <CanvasOptimizer>
      {/* Retirei o mix-blend-screen daqui para os corações de vidro brilharem mais */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }} dpr={GraphicsConfig.dpr as number}>
          {/* Luzes para os corações de cristal reagirem */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <Environment preset="city" />

          {/* O Seu novo Efeito de Corações! */}
          <FloatingHearts />

          {/* As suas partículas (Sparkles) que já existiam continuam aqui */}
          <Sparkles count={GraphicsConfig.particles.kingdomHearts.blue} scale={15} size={3} speed={0.4} opacity={0.6} color="#4ea6ff" />
          <Sparkles count={GraphicsConfig.particles.kingdomHearts.pink} scale={12} size={2} speed={0.3} opacity={0.5} color="#ff6ec7" />
          <Sparkles count={GraphicsConfig.particles.kingdomHearts.gold} scale={12} size={2.5} speed={0.5} opacity={0.8} color="#ffd700" />
          <Sparkles count={GraphicsConfig.particles.kingdomHearts.stars} scale={20} size={1.5} speed={0.2} opacity={0.4} color="#ffffff" />
        </Canvas>

      </div>
    </CanvasOptimizer>
  );
};