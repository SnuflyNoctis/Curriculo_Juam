import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Center,
  Html,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

interface Case3DProps {
  skills: any[];
  onSelectSkill: (skill: any) => void;
}

// --- CONFIGURAÇÕES ---
const CELL_SIZE = 1.0;
const COLS = 6;
const ROWS = 5;
const GRID_WIDTH = COLS * CELL_SIZE;
const GRID_HEIGHT = ROWS * CELL_SIZE;

// --- ITEM DA SKILL ---
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

  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.05 : 0.92;
    // Animação suave de escala
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.2),
    );
  });

  return (
    <group
      ref={meshRef}
      position={[x, y, 0.1]} // Item elevado
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
      {/* O BLOCO DO ITEM */}
      <RoundedBox
        args={[CELL_SIZE, CELL_SIZE, 0.1]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          map={texture}
          color={hovered ? "#ffffff" : "#d0d0d0"}
          roughness={0.4}
          metalness={0.1}
        />
      </RoundedBox>

      {/* SOMBRA FAKE (EVITA O PISCA-PISCA DO RENDERIZADOR) */}
      {/* Um plano preto transparente logo abaixo do item */}
      <mesh position={[0, -0.05, -0.06]}>
        <planeGeometry args={[CELL_SIZE * 0.9, CELL_SIZE * 0.9]} />
        <meshBasicMaterial color="#000" opacity={0.5} transparent />
      </mesh>

      {/* SELEÇÃO VERDE */}
      {hovered && (
        <mesh position={[0, 0, 0.06]}>
          <ringGeometry args={[CELL_SIZE / 2 - 0.05, CELL_SIZE / 2, 4, 1]} />
          <meshBasicMaterial color="#00ff00" toneMapped={false} />
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0, 0]} />
          </mesh>
        </mesh>
      )}

      {hovered && (
        <Html
          position={[0, 0.7, 0]}
          center
          zIndexRange={[100, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-black/90 text-[#00ff00] text-[9px] px-2 py-1 border border-[#00ff00] font-mono whitespace-nowrap shadow-[0_0_10px_#00ff00] uppercase tracking-widest">
            {skill.name}
          </div>
        </Html>
      )}
    </group>
  );
};

// --- A MALETA ---
const InventoryBoard = ({ skills, onSelectSkill }: Case3DProps) => {
  const padding = 0.2;
  const caseW = GRID_WIDTH + padding * 2;
  const caseH = GRID_HEIGHT + padding * 2;
  const depth = 0.6; // Um pouco mais profunda para dar peso
  const rimSize = 0.15;

  // MATERIAIS
  // 1. Plástico Polímero Duro (Corpo da maleta)
  const polymerMaterial = new THREE.MeshStandardMaterial({
    color: "#181818",
    roughness: 0.4, // Levemente brilhante
    metalness: 0.2,
  });

  // 2. Metal Escuro (Dobradiças e Alça)
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: "#2a2a2a",
    roughness: 0.2,
    metalness: 0.8, // Bem metálico
  });

  return (
    <group>
      {/* ================================================= */}
      {/* 1. INTERIOR (GRID E FUNDO) - MANTIDO IGUAL */}
      {/* ================================================= */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[GRID_WIDTH, GRID_HEIGHT]} />
        <meshStandardMaterial color="#404040" roughness={1} metalness={0} />
      </mesh>

      <group position={[0, 0, 0.02]}>
        {Array.from({ length: COLS + 1 }).map((_, i) => (
          <mesh
            key={`v-${i}`}
            position={[i * CELL_SIZE - GRID_WIDTH / 2, 0, 0]}
          >
            <planeGeometry args={[0.015, GRID_HEIGHT]} />
            <meshBasicMaterial color="#666666" />
          </mesh>
        ))}
        {Array.from({ length: ROWS + 1 }).map((_, i) => (
          <mesh
            key={`h-${i}`}
            position={[0, i * CELL_SIZE - GRID_HEIGHT / 2, 0]}
          >
            <planeGeometry args={[GRID_WIDTH, 0.015]} />
            <meshBasicMaterial color="#666666" />
          </mesh>
        ))}
      </group>

      {/* ================================================= */}
      {/* 2. ESTRUTURA EXTERNA (AQUI ESTÁ A MUDANÇA 3D) */}
      {/* ================================================= */}

      {/* MOLDURA INTERNA (Lábio de vedação) */}
      <group position={[0, 0, 0.05]}>
        {/* Usamos metalMaterial para destacar a borda interna */}
        <RoundedBox
          args={[caseW, rimSize, 0.15]}
          position={[0, caseH / 2 + rimSize / 2, 0]}
          radius={0.02}
          material={metalMaterial}
        />
        <RoundedBox
          args={[caseW, rimSize, 0.15]}
          position={[0, -caseH / 2 - rimSize / 2, 0]}
          radius={0.02}
          material={metalMaterial}
        />
        <RoundedBox
          args={[rimSize, caseH, 0.15]}
          position={[-caseW / 2 - rimSize / 2, 0, 0]}
          radius={0.02}
          material={metalMaterial}
        />
        <RoundedBox
          args={[rimSize, caseH, 0.15]}
          position={[caseW / 2 + rimSize / 2, 0, 0]}
          radius={0.02}
          material={metalMaterial}
        />
      </group>

      {/* CORPO PRINCIPAL (Shell) */}
      <group position={[0, 0, -depth / 2]}>
        {/* Caixa Base */}
        <RoundedBox
          args={[caseW + 0.3, caseH + 0.3, depth]}
          radius={0.1}
          smoothness={4}
          material={polymerMaterial}
        />

        {/* DETALHE: RANHURAS TRASEIRAS (RIBS) */}
        {/* Cria aquele visual de maleta reforçada militar */}
        <group position={[0, 0, -depth / 2 - 0.02]}>
          <RoundedBox
            args={[caseW * 0.8, caseH * 0.2, 0.05]}
            position={[0, caseH * 0.25, 0]}
            radius={0.05}
            material={polymerMaterial}
          />
          <RoundedBox
            args={[caseW * 0.8, caseH * 0.2, 0.05]}
            position={[0, -caseH * 0.25, 0]}
            radius={0.05}
            material={polymerMaterial}
          />
        </group>

        {/* DETALHE: CANTONEIRAS DE PROTEÇÃO (CORNER GUARDS) */}
        {/* Bolinhas/Reforços nos 4 cantos */}
        {[
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map((pos, i) => (
          <mesh
            key={i}
            position={[
              pos[0] * (caseW / 2 + 0.15),
              pos[1] * (caseH / 2 + 0.15),
              0,
            ]}
          >
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial
              color="#111"
              roughness={0.5}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* ================================================= */}
      {/* 3. ALÇA REALISTA (HANDLE) */}
      {/* ================================================= */}
      <group position={[0, -caseH / 2 - 0.35, 0]}>
        {/* SUPORTES DA ALÇA (Presos na maleta) */}
        {[-0.8, 0.8].map((xPos, i) => (
          <group key={i} position={[xPos, 0.15, 0]}>
            {/* Base do suporte */}
            <RoundedBox
              args={[0.4, 0.3, 0.3]}
              radius={0.05}
              material={metalMaterial}
            />
            {/* Pino/Parafuso simulado */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.16]}>
              <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
              <meshStandardMaterial
                color="#555"
                metalness={1}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}

        {/* A PEGA DA ALÇA (Grip) */}
        {/* Formato de U invertido conectando os suportes */}
        <group position={[0, -0.2, 0]}>
          {/* Barra Horizontal (Onde segura) */}
          <RoundedBox
            args={[1.6, 0.35, 0.35]}
            radius={0.15}
            material={polymerMaterial}
          />

          {/* Hastes laterais que conectam aos suportes */}
          <group position={[-0.8, 0.2, 0]}>
            <RoundedBox
              args={[0.15, 0.5, 0.15]}
              radius={0.05}
              material={metalMaterial}
            />
          </group>
          <group position={[0.8, 0.2, 0]}>
            <RoundedBox
              args={[0.15, 0.5, 0.15]}
              radius={0.05}
              material={metalMaterial}
            />
          </group>
        </group>
      </group>

      {/* ================================================= */}
      {/* 4. OS ITENS (SKILLS) - MANTIDO IGUAL */}
      {/* ================================================= */}
      <group>
        {skills.map((skill, index) => (
          <SkillItem
            key={skill.id}
            index={index}
            skill={skill}
            onSelect={onSelectSkill}
          />
        ))}
      </group>
    </group>
  );
};

// --- CENA PRINCIPAL ---
export const Case3D = ({ skills, onSelectSkill }: Case3DProps) => {
  return (
    <div className="w-full h-[550px] cursor-pointer bg-transparent">
      {/* shadows={false} DESATIVADO GLOBALMENTE */}
      <Canvas camera={{ position: [0, 0, 11], fov: 40 }}>
        <Suspense fallback={null}>
          <Environment preset="city" blur={1} />

          {/* LUZ SEM CASTSHADOW (O Culpado foi removido) */}
          <spotLight
            position={[0, 8, 12]}
            angle={0.35}
            penumbra={0.5}
            intensity={1}
            // castShadow -> REMOVIDO
          />

          <ambientLight intensity={0.2} />

          <Center>
            <group rotation={[0.1, 0, 0]}>
              <InventoryBoard skills={skills} onSelectSkill={onSelectSkill} />
            </group>
          </Center>

          {/* Sombra do chão - Longe e segura */}
          <ContactShadows
            position={[0, -4, 0]}
            opacity={0.6}
            scale={40}
            blur={2.5}
            far={0} // Aumentei o far pra garantir
            color="#000"
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI / 1.9}
            minAzimuthAngle={-Math.PI / 12}
            maxAzimuthAngle={Math.PI / 12}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
