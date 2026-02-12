import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Center,
  Html,
  Environment,
  Text,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

interface Case3DProps {
  skills: any[];
  onSelectSkill: (skill: any) => void;
}

// --- CONFIGURAÇÕES ---
const CELL_SIZE = 1.1;
const COLS = 6;
const ROWS = 4;
const GRID_WIDTH = COLS * CELL_SIZE;
const GRID_HEIGHT = ROWS * CELL_SIZE;

// --- ITEM DA SKILL (Híbrido: Dark + Digital Blue) ---
const SkillItem = ({
  skill,
  index,
  onSelect,
}: {
  skill: any;
  index: number;
  onSelect: (s: any) => void;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const texture = useLoader(THREE.TextureLoader, skill.image);

  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const x = col * CELL_SIZE - GRID_WIDTH / 2 + CELL_SIZE / 2;
  const y = -(row * CELL_SIZE) + GRID_HEIGHT / 2 - CELL_SIZE / 2;

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.1 : 0.95;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.15),
    );
    meshRef.current.position.z =
      0.05 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.02;
  });

  return (
    <group
      ref={meshRef}
      position={[x, y, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(skill);
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        setHover(false);
      }}
    >
      {/* O ITEM FLUTUANTE */}
      <RoundedBox args={[CELL_SIZE * 0.9, CELL_SIZE * 0.9, 0.05]} radius={0.05}>
        <meshPhysicalMaterial
          map={texture}
          // Base escura, mas brilha azul/branco no hover
          color={hovered ? "#ffffff" : "#808090"}
          roughness={0.3}
          metalness={0.7}
          // Emite luz CIANO no hover
          emissive={hovered ? "#00ffff" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* MOLDURA DE SELEÇÃO (Volta o Ciano Digital) */}
      {hovered && (
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[CELL_SIZE, CELL_SIZE]} />
          <meshBasicMaterial
            color="#00ffff" // Ciano Néon
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* LABEL DIGITAL (Estilo Tech Azul) */}
      {hovered && (
        <Html position={[0, 0.7, 0]} center style={{ pointerEvents: "none" }}>
          <div className="backdrop-blur-md bg-[#0a0a15]/80 border-l-2 border-cyan-500 px-3 py-1 text-cyan-100 font-mono text-[10px] tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            {skill.name}
          </div>
        </Html>
      )}
    </group>
  );
};

// --- A MALETA "VILLAGE DIGITAL" ---
const DigitalCase = ({ skills, onSelectSkill }: Case3DProps) => {
  const caseW = GRID_WIDTH + 0.5;
  const caseH = GRID_HEIGHT + 0.5;
  const depth = 0.2;

  // VIDRO FUMÊ AZULADO (Estilo RE Village + Tech)
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#1a2a2e", // Azul noturno muito escuro
    roughness: 0.2, // Mais liso para reflexos nítidos
    metalness: 0.1,
    transmission: 0.5, // Bem translúcido
    thickness: 1.0, // Vidro grosso
    clearcoat: 1, // Camada de verniz
    clearcoatRoughness: 0.1,
    ior: 1.5, // Índice de refração de vidro real
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.04} floatIntensity={0.08}>
        {/* 1. O PAINEL DE VIDRO */}
        <RoundedBox
          args={[caseW, caseH, depth]}
          radius={0.1}
          material={glassMaterial}
        />

        {/* 2. O GRID HOLOGRÁFICO (Ciano sutil) */}
        <group position={[0, 0, depth / 2 + 0.01]}>
          {Array.from({ length: COLS + 1 }).map((_, i) => (
            <mesh
              key={`v-${i}`}
              position={[i * CELL_SIZE - GRID_WIDTH / 2, 0, 0]}
            >
              <planeGeometry args={[0.005, GRID_HEIGHT]} />
              <meshBasicMaterial color="#00ffff" opacity={0.08} transparent />
            </mesh>
          ))}
          {Array.from({ length: ROWS + 1 }).map((_, i) => (
            <mesh
              key={`h-${i}`}
              position={[0, i * CELL_SIZE - GRID_HEIGHT / 2, 0]}
            >
              <planeGeometry args={[GRID_WIDTH, 0.005]} />
              <meshBasicMaterial color="#00ffff" opacity={0.08} transparent />
            </mesh>
          ))}
        </group>

        {/* 3. MOLDURA DE LUZ (Ciano) */}
        <group position={[0, 0, 0]}>
          <RoundedBox
            args={[caseW + 0.1, caseH + 0.1, depth - 0.05]}
            radius={0.15}
          >
            <meshStandardMaterial
              color="#151520"
              roughness={0.1}
              metalness={0.9}
            />
          </RoundedBox>
          {/* Luzes de canto (LEDs) - Ciano Brilhante */}
          {[
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
          ].map((pos, i) => (
            <mesh
              key={i}
              position={[pos[0] * (caseW / 2), pos[1] * (caseH / 2), depth / 2]}
            >
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color="#00ffff" toneMapped={false} />
            </mesh>
          ))}
        </group>

        {/* 4. OS ITENS */}
        <group position={[0, 0, depth / 2 + 0.05]}>
          {skills.map((skill, index) => (
            <SkillItem
              key={skill.id}
              index={index}
              skill={skill}
              onSelect={onSelectSkill}
            />
          ))}
        </group>

        {/* 5. INTERFACE UI */}
        <group position={[0, caseH / 2 + 0.3, 0]}>
          <Text
            fontSize={0.15}
            color="#00ffff" // Texto Ciano
            font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
            letterSpacing={0.2}
            fillOpacity={0.7}
          >
            DIGITAL INVENTORY // SYSTEM.VILLAGE
          </Text>
        </group>
      </Float>
    </group>
  );
};

// --- CENA ---
export const Case3D = ({ skills, onSelectSkill }: Case3DProps) => {
  return (
    <div className="w-full h-[600px] cursor-pointer bg-transparent">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Environment preset="city" blur={0.8} background={false} />

          <pointLight
            position={[10, 5, -10]}
            color="#002080"
            intensity={2}
            distance={30}
          />
          <pointLight
            position={[10, -5, 5]}
            color="#00ffff"
            intensity={1}
            distance={20}
          />
          <pointLight position={[0, 2, 5]} color="#ffffff" intensity={3.0} />

          <ambientLight intensity={0.5} />

          <Center>
            <DigitalCase skills={skills} onSelectSkill={onSelectSkill} />
          </Center>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
