import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, Environment, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { GraphicsConfig } from "../../performance/GraphicsConfig";
import { CanvasOptimizer } from "../../performance/CanvasOptimizer";
import { FloatingHearts } from "../components/FloatingHearts/floatingHearts";

export const DiveToTheHeartBackground = () => {
  if (!GraphicsConfig.enable3D) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <CanvasOptimizer>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60, far: 300 }}
          gl={{ alpha: true, powerPreference: "high-performance" }}
          dpr={GraphicsConfig.dpr as number}
        >
          <fog attach="fog" args={["#000000", 2, 80]} />

          <ambientLight intensity={0.2} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            color="#ffffff"
          />

          <pointLight
            position={[-5, -5, 0]}
            intensity={4}
            color="#4ea6ff"
            distance={20}
          />
          <pointLight
            position={[5, -5, 0]}
            intensity={4}
            color="#ff6ec7"
            distance={20}
          />

          <Environment preset="city" resolution={256} />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={3}>
            <FloatingHearts />

            <Sparkles
              count={GraphicsConfig.particles.kingdomHearts.blue}
              scale={15}
              size={3}
              speed={0.4}
              opacity={0.6}
              color="#4ea6ff"
            />
            <Sparkles
              count={GraphicsConfig.particles.kingdomHearts.pink}
              scale={12}
              size={2}
              speed={0.3}
              opacity={0.5}
              color="#ff6ec7"
            />
            <Sparkles
              count={GraphicsConfig.particles.kingdomHearts.gold}
              scale={12}
              size={2.5}
              speed={0.5}
              opacity={0.8}
              color="#ffd700"
            />

            {!isMobile && (
              <Sparkles
                count={GraphicsConfig.particles.kingdomHearts.stars}
                scale={20}
                size={1.5}
                speed={0.2}
                opacity={0.4}
                color="#ffffff"
              />
            )}
          </Float>

          {GraphicsConfig.enablePostProcessing && (
            <EffectComposer multisampling={0}>
              <Bloom
                luminanceThreshold={0.2}
                mipmapBlur={!isMobile}
                intensity={1.2}
              />
            </EffectComposer>
          )}
        </Canvas>
      </div>
    </CanvasOptimizer>
  );
};
