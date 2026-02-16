import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Center,
  Html,
  Environment,
  Text,
  Sparkles
} from "@react-three/drei";
import * as THREE from "three";

interface Case3DProps {
  skills: any[];
  onSelectSkill: (skill: any) => void;
}

// --- CONFIGURAÇÕES ---
const CELL_SIZE = 2.0;
const COLS = 3;
const ROWS = 2;

// --- ITEM DA SKILL (CORRIGIDO PARA BRILHAR SEMPRE) ---
const SkillItem = ({ skill, index, onSelect }: { skill: any, index: number, onSelect: (s: any) => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  // UseLoader funciona com URLs externas normalmente
  const texture = useLoader(THREE.TextureLoader, skill.image);
  const [active, setActive] = useState(false);

  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const x = (col - (COLS - 1) / 2) * CELL_SIZE;
  const y = -(row - (ROWS - 1) / 2) * CELL_SIZE;

  useEffect(() => {
    const timer = setTimeout(() => { setActive(true); }, 100 + (index * 50));
    return () => clearTimeout(timer);
  }, [index]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetZ = hovered ? 0.25 : 0.1; // Mantém sempre um pouco a frente do fundo
    const targetScale = hovered ? 1.1 : 0.95;

    if (active) {
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
    }
  });

  return (
    <group
      ref={groupRef}
      position={[x, y, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect(skill); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; setHover(true); }}
      onPointerOut={() => { document.body.style.cursor = "auto"; setHover(false); }}
    >
      {/* BASE DO BOTÃO */}
      <RoundedBox args={[CELL_SIZE * 0.85, CELL_SIZE * 0.85, 0.08]} radius={0.05}>
        <meshStandardMaterial color="#101015" roughness={0.5} metalness={0.8} />
      </RoundedBox>

      {/* O ÍCONE (COM LUZ PRÓPRIA) */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[CELL_SIZE * 0.65, CELL_SIZE * 0.65]} />
        <meshStandardMaterial
          map={texture}
          transparent={true}
          emissive={hovered ? "#00ffff" : "#444444"}
          emissiveIntensity={hovered ? 0.5 : 0}
          toneMapped={false}
        />
      </mesh>

      {hovered && active && (
        <Html position={[0, -0.8, 0.2]} center style={{ pointerEvents: 'none' }}>
          <div className="bg-black/90 border-l-4 border-cyan-500 px-3 py-1 text-cyan-50 font-mono text-[10px] uppercase shadow-[0_0_15px_rgba(0,255,255,0.3)] whitespace-nowrap tracking-widest">
            {skill.name}
          </div>
        </Html>
      )}
    </group>
  );
};

// --- COMPONENTES AUXILIARES ---
const TacticalHandle = ({ width, position }: { width: number, position: [number, number, number] }) => {
  const material = new THREE.MeshStandardMaterial({ color: "#111", roughness: 0.5, metalness: 0.8 });
  return (
    <group position={position}>
      <RoundedBox args={[0.4, 0.6, 0.3]} position={[-width / 2 + 0.5, 0, 0]} radius={0.1} material={material} />
      <RoundedBox args={[0.4, 0.6, 0.3]} position={[width / 2 - 0.5, 0, 0]} radius={0.1} material={material} />
      <RoundedBox args={[width - 1.2, 0.25, 0.2]} position={[0, 0.1, 0]} radius={0.1} material={material} />
      <RoundedBox args={[width - 1.8, 0.3, 0.25]} position={[0, 0.1, 0]} radius={0.05}>
        <meshStandardMaterial color="#050505" roughness={1} />
      </RoundedBox>
    </group>
  )
}

const TacticalLatch = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <RoundedBox args={[0.2, 0.8, 0.4]} radius={0.05}>
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
      </RoundedBox>
      <mesh position={[0.12, 0, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    </group>
  )
}

// --- MALETA PRINCIPAL ---
const DigitalCase = ({ skills, onSelectSkill }: Case3DProps) => {
  const totalW = (COLS * CELL_SIZE) + 1.2;
  const totalH = (ROWS * CELL_SIZE) + 1.2;
  const depth = 0.8;

  const groupRef = useRef<THREE.Group>(null);

  const bodyMaterial = new THREE.MeshStandardMaterial({ color: "#151518", roughness: 0.6, metalness: 0.6 });
  const bumperMaterial = new THREE.MeshStandardMaterial({ color: "#080808", roughness: 0.9, metalness: 0.2 });

  // VIDRO AJUSTADO: Mais transparente para deixar a luz sair
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#aaddff",
    roughness: 0,
    metalness: 0.1,
    transmission: 0.99, // Deixa passar quase toda luz
    thickness: 0.5,     // Mais fino para distorcer menos
    clearcoat: 1,
    transparent: true,
    opacity: 0.1,       // Opacidade baixa
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.03;
  });

  return (
    <group ref={groupRef}>

      {/* CORPO */}
      <RoundedBox args={[totalW, totalH, depth]} radius={0.2} material={bodyMaterial} position={[0, 0, 0]}>
        <mesh position={[0, 0, -depth / 2 - 0.01]}>
          <boxGeometry args={[totalW - 0.5, totalH - 0.5, 0.05]} />
          <meshStandardMaterial color="#101010" />
        </mesh>
      </RoundedBox>

      {/* CANTONEIRAS */}
      {[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([x, y], i) => (
        <group key={i} position={[x * (totalW / 2), y * (totalH / 2), 0]}>
          <RoundedBox args={[0.6, 0.6, depth + 0.05]} radius={0.1} material={bumperMaterial} />
          <mesh position={[0, 0, depth / 2 + 0.03]}>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 6]} />
            <meshStandardMaterial color="#444" metalness={1} />
          </mesh>
        </group>
      ))}

      {/* ALÇA */}
      <TacticalHandle width={totalW * 0.5} position={[0, totalH / 2 + 0.3, 0]} />

      {/* FECHOS */}
      <TacticalLatch position={[totalW / 2 + 0.1, 0, 0]} />
      <TacticalLatch position={[-totalW / 2 - 0.1, 0, 0]} />

      {/* INTERIOR (BACKPLATE) */}
      <mesh position={[0, 0, depth / 2 - 0.1]}>
        <planeGeometry args={[totalW - 0.6, totalH - 0.6]} />
        <meshStandardMaterial color="#050505" roughness={0.2} />
      </mesh>

      {/* GRID DECORATIVO */}
      <group position={[0, 0, depth / 2 - 0.05]}>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(totalW - 0.8, totalH - 0.8, COLS, ROWS)]} />
          <lineBasicMaterial color="#00ffff" opacity={0.1} transparent />
        </lineSegments>
      </group>

      {/* ÍCONES */}
      <group position={[0, 0, depth / 2]}>
        {skills.map((skill, index) => (
          <SkillItem key={skill.id} index={index} skill={skill} onSelect={onSelectSkill} />
        ))}
      </group>

      {/* HUD NO VIDRO */}
      <group position={[0, 0, depth / 2 + 0.1]}>
        <Text position={[0, totalH / 2 - 0.4, 0]} fontSize={0.12} color="#556677" letterSpacing={0.1}>
          SECURE CASE // BIO-OS
        </Text>

        {[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([mx, my], i) => (
          <group key={i} position={[mx * (totalW / 2 - 0.6), my * (totalH / 2 - 0.6), 0]}>
            <mesh>
              <planeGeometry args={[0.3, 0.02]} />
              <meshBasicMaterial color="#00ffff" opacity={0.6} />
            </mesh>
            <mesh>
              <planeGeometry args={[0.02, 0.3]} />
              <meshBasicMaterial color="#00ffff" opacity={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* VIDRO FRONTAL (Mais transparente agora) */}
      <RoundedBox args={[totalW - 0.4, totalH - 0.4, 0.05]} radius={0.1} material={glassMaterial} position={[0, 0, depth / 2 + 0.15]} />

    </group>
  );
};

// --- CENA ---
export const Case3D = ({ skills, onSelectSkill }: Case3DProps) => {
  return (
    <div className="w-full h-[600px] cursor-pointer bg-transparent">
      <Canvas camera={{ position: [0, 0, 11], fov: 35 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <Environment preset="city" blur={1} />

          <Sparkles count={40} scale={12} size={3} speed={0.2} opacity={0.4} color="#aaddff" />

          {/* Luzes reforçadas para garantir visibilidade */}
          <ambientLight intensity={0.6} />
          <pointLight position={[-5, 5, 5]} color="#00ffff" intensity={2} />
          <pointLight position={[5, -5, 5]} color="#ff0055" intensity={1} />
          <pointLight position={[0, 0, 8]} color="#ffffff" intensity={1.5} />

          <Center top position={[0, -2.5, 0]}>
            <DigitalCase skills={skills} onSelectSkill={onSelectSkill} />
          </Center>

          <OrbitControls
            enableZoom={false} enablePan={false}
            minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5}
            minAzimuthAngle={-Math.PI / 3} maxAzimuthAngle={Math.PI / 3}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};