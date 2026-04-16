import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

// 1. Importa suas ferramentas de performance
import { GraphicsConfig } from "../../performance/GraphicsConfig"; 
import { CanvasOptimizer } from "../../performance/CanvasOptimizer"; 

export const DiveToTheHeartBackground = () => {
  // Otimização 1: Regra Global
  if (!GraphicsConfig.enable3D) return null;

  return (
    // Otimização 2: O Envelope de Visibilidade
    <CanvasOptimizer>
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
        
        {/* O Canvas pesado fica protegido aqui dentro */}
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }} dpr={GraphicsConfig.dpr as number}>
          <Sparkles count={GraphicsConfig.particles.kingdomHearts.blue} scale={12} size={3} speed={0.4} opacity={0.6} color="#4ea6ff" />
          <Sparkles count={GraphicsConfig.particles.kingdomHearts.pink} scale={10} size={2} speed={0.3} opacity={0.5} color="#ff6ec7" />
          <Sparkles count={GraphicsConfig.particles.kingdomHearts.gold} scale={10} size={2.5} speed={0.5} opacity={0.8} color="#ffd700" />
          <Sparkles count={GraphicsConfig.particles.kingdomHearts.stars} scale={15} size={1.5} speed={0.2} opacity={0.4} color="#ffffff" />
        </Canvas>

      </div>
    </CanvasOptimizer>
  );
};