import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

// IMPORTANDO AS NOSSAS FERRAMENTAS DE PERFORMANCE
import { GraphicsConfig } from "../../performance/GraphicsConfig";
import { CanvasOptimizer } from "../../performance/CanvasOptimizer";

const ParticleField = () => {
  const groupRef = useRef<THREE.Group>(null);

  // A Rotação Contínua (Lifestream Flow)
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Aplicando o GraphicsConfig no 'count' para aliviar os celulares */}
      <Sparkles
        count={GraphicsConfig.particles.FinalFantasy.lightCyan}
        scale={20}
        size={3}
        speed={0.2}
        opacity={0.8}
        color="#00aaff"
      />
      <Sparkles
        count={GraphicsConfig.particles.FinalFantasy.lightCyan}
        scale={20}
        size={3}
        speed={0.2}
        opacity={0.8}
        color="#e0ffff"
      />
      <Sparkles
        count={GraphicsConfig.particles.FinalFantasy.blue}
        scale={12}
        size={1}
        speed={0.5}
        opacity={0.3}
        color="#0055ff"
      />
    </group>
  );
};

export const LifestreamBackground = () => {
  if (!GraphicsConfig.enable3D) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* O ESCUDO DE RAM: Só renderiza o <Canvas> quando estiver visível na tela */}
      <CanvasOptimizer>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={GraphicsConfig.dpr as number}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <ParticleField />
        </Canvas>
      </CanvasOptimizer>
    </div>
  );
};
