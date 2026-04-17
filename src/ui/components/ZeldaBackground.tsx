import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { GraphicsConfig } from "../../performance/GraphicsConfig";
import { CanvasOptimizer } from "../../performance/CanvasOptimizer";

export const ZeldaBackground = () => {
  return (
    <CanvasOptimizer>
      <Canvas
        gl={{ antialias: false, alpha: true }}
        dpr={GraphicsConfig.dpr as number}
        camera={{ position: [0, 0, 5] }}
      >
        <Sparkles
          count={GraphicsConfig.particles.zelda.blue}
          scale={12}
          size={2}
          speed={0.2}
          opacity={0.6}
          color="#00f7ff"
        />
        <Sparkles
          count={GraphicsConfig.particles.zelda.gold}
          scale={10}
          size={1.5}
          speed={0.4}
          opacity={0.8}
          color="#ffd700"
        />
      </Canvas>
    </CanvasOptimizer>
  );
};
