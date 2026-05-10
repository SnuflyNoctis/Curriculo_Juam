import React, { useRef } from "react";
import { Canvas,  useFrame } from "@react-three/fiber";
import { Float, Grid, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Certificate } from "../../../data/certificatesData";

const MovingGrid = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 2;
    }
  });

  return (
    <group ref={gridRef}>
      <Grid
        position={[0, -2.5, -10]}
        args={[30, 30]}
        cellSize={0.5}
        cellThickness={1}
        cellColor="#4ea6ff"
        sectionSize={2}
        sectionThickness={1.5}
        sectionColor="#ffffff"
        fadeDistance={15}
      />
    </group>
  );
};

interface Certificate3DViewerProps {
  activeCert: Certificate;
}

export const Certificate3DViewer: React.FC<Certificate3DViewerProps> = ({
  activeCert,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />

        <Sparkles
          count={100}
          scale={12}
          size={2}
          speed={0.4}
          opacity={0.3}
          color="#ffffff"
        />
        <Sparkles
          count={50}
          scale={10}
          size={4}
          speed={0.8}
          opacity={0.6}
          color="#4ea6ff"
        />

        <MovingGrid />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[0, 0, 0]} rotation={[0.1, -0.2, 0]}>
            <boxGeometry args={[4, 2.8, 0.05]} />

            <meshStandardMaterial
              color="#111111"
              emissive={activeCert.color || "#4ea6ff"}
              emissiveIntensity={0.5}
              wireframe={true}
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
};
