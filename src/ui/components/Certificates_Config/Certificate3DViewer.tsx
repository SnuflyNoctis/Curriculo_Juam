import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Grid,
  Sparkles,
  Environment,
  Text, // 👇 Trocamos o useTexture pelo Text
} from "@react-three/drei";
import * as THREE from "three";
import { Certificate } from "../../../data/certificatesData";

// Função para pegar a cor da partícula baseada no Tipo
const getTypeParticlesColor = (type: string | undefined): string => {
  switch (type?.toUpperCase()) {
    case "CLOUD":
      return "#4ea6ff"; // Azul claro/ciano (já existente e bom para CLOUD)
    case "FRONT-END":
      return "#22c55e"; // Verde Esmeralda (Rayquaza / Front-End Green)
    case "BACK-END":
      return "#dc2626"; // Vermelho Rubi (Groudon / Back-End Fire)
    default:
      return "#ffffff"; // Branco por padrão
  }
};

// O Grid que se move no fundo
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

// 👇 AQUI ESTÁ O COMPONENTE QUE FALTAVA 👇
// Ele renderiza o texto puramente em 3D, com qualidade infinita!
const ProceduralCertificateMesh = ({
  activeCert,
}: {
  activeCert: Certificate;
}) => {
  const accentColor = activeCert.color || "#4ea6ff";

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={[0, 0, 0]} rotation={[0.1, -0.2, 0]}>
        
        <planeGeometry args={[4, 2.8]} />
        <meshStandardMaterial
          color="#1a1a2e"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.9}
        />
        <Text
          position={[-1.8, 1.1, 0.05]}
          fontSize={0.25}
          color={accentColor}
          anchorX="left"
          anchorY="top"
          maxWidth={3.6}
        >
          {activeCert.title}
        </Text>

        <Text
          position={[1.8, -1.1, 0.05]}
          fontSize={0.16}
          color="#a1a1aa"
          anchorX="right"
          anchorY="bottom"
        >
          Nível: {activeCert.level} / Carga: {activeCert.duration || "N/A"}
        </Text>

        {/* Descrição em "Código" */}
        <Text
          position={[-1.8, -0.2, 0.05]}
          fontSize={0.12}
          color="#e4e4e7"
          anchorX="left"
          anchorY="middle"
          maxWidth={3.6}
          lineHeight={1.5}
          textAlign="left"
        >
          {">"} status: ACTIVE{"\n"}
          {">"} data_entry: {new Date().toLocaleDateString()}
          {"\n"}
          {">"} registry_id: {activeCert.id}
          {"\n"}
          {">"} info: {activeCert.description}
        </Text>
      </mesh>
    </Float>
  );
};

interface Certificate3DViewerProps {
  activeCert: Certificate;
}

export const Certificate3DViewer: React.FC<Certificate3DViewerProps> = ({
  activeCert,
}) => {
  const typeParticleColor = getTypeParticlesColor(activeCert.type);

  return (
    <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />

        <Sparkles
          count={150}
          scale={15}
          size={2.5}
          speed={0.4}
          opacity={0.3}
          color="#ffffff"
        />

        <Sparkles
          count={80}
          scale={12}
          size={5}
          speed={0.8}
          opacity={0.6}
          color={typeParticleColor}
        />

        <MovingGrid />

        <Suspense fallback={null}>
          <ProceduralCertificateMesh activeCert={activeCert} />
        </Suspense>
      </Canvas>
    </div>
  );
};
