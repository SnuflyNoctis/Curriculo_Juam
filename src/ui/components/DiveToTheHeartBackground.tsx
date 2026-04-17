import { Canvas } from "@react-three/fiber";

// 1. Importa suas ferramentas de performance
import { GraphicsConfig } from "../../performance/GraphicsConfig";
import { CanvasOptimizer } from "../../performance/CanvasOptimizer";

export const DiveToTheHeartBackground = () => {
  // Otimização 1: Regra Global
  if (!GraphicsConfig.enable3D) return null;

  return (

    <CanvasOptimizer>
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
        {/* O Canvas pesado fica protegido aqui dentro */}
        <Canvas
          frameloop="demand"
          dpr={GraphicsConfig.dpr as number}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
          }}
        >

        </Canvas>
      </div>
    </CanvasOptimizer>
  );
};
