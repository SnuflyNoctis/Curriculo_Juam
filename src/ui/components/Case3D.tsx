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
const CELL_SIZE = 1.1;
const COLS = 6;
const ROWS = 5;
const GRID_WIDTH = COLS * CELL_SIZE;
const GRID_HEIGHT = ROWS * CELL_SIZE;

// --- ITEM DA SKILL ---
const SkillItem = ({ skill, index, onSelect }: { skill: any, index: number, onSelect: (s: any) => void }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const texture = useLoader(THREE.TextureLoader, skill.image);
  const [active, setActive] = useState(false);

  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const x = col * CELL_SIZE - GRID_WIDTH / 2 + CELL_SIZE / 2;
  const y = -(row * CELL_SIZE) + GRID_HEIGHT / 2 - CELL_SIZE / 2;

  useEffect(() => {
    const timer = setTimeout(() => { setActive(true); }, 1200 + (index * 60));
    return () => clearTimeout(timer);
  }, [index]);

  useFrame((state) => {
    if (!meshRef.current) return;
    if (active) {
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.1);
      const targetScale = hovered ? 1.15 : 0.95;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    } else {
      meshRef.current.position.z = -0.5;
      meshRef.current.scale.setScalar(0);
    }
  });

  return (
    <group
      ref={meshRef}
      position={[x, y, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect(skill); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; setHover(true); }}
      onPointerOut={() => { document.body.style.cursor = "auto"; setHover(false); }}
    >
      <RoundedBox args={[CELL_SIZE * 0.9, CELL_SIZE * 0.9, 0.05]} radius={0.05}>
        <meshPhysicalMaterial
          map={texture}
          color={hovered ? "#ffffff" : "#d0d0e0"}
          roughness={0.2}
          metalness={0.2} // Reduzi metalness aqui também para o ícone não refletir demais
          emissive={hovered ? "#00ffff" : "#000000"}
          emissiveIntensity={hovered ? 2.0 : 0}
          transparent
          opacity={active ? 1 : 0}
        />
      </RoundedBox>
      {hovered && active && (
        <Html position={[0, 0.8, 0]} center style={{ pointerEvents: 'none' }}>
          <div className="backdrop-blur-md bg-[#0a0a15]/90 border border-cyan-500 px-2 py-1 text-cyan-50 font-mono text-[10px] tracking-widest uppercase shadow-[0_0_20px_rgba(0,255,255,0.6)] whitespace-nowrap text-shadow-glow">
            {skill.name}
          </div>
        </Html>
      )}
    </group>
  );
};

// --- A MALETA DIGITAL (ANTI-GLARE) ---
const DigitalCase = ({ skills, onSelectSkill }: Case3DProps) => {
  const caseW = GRID_WIDTH + 0.2;
  const caseH = GRID_HEIGHT + 0.2;
  const glassDepth = 0.02;
  const frameDepth = 0.04;
  const detailZ = frameDepth / 2 + 0.015;

  const groupRef = useRef<THREE.Group>(null);
  const scanlineRef = useRef<THREE.Mesh>(null);

  // 1. VIDRO "ANTI-REFLEXO"
  // O segredo é baixar o metalness e o envMapIntensity
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#111115",
    roughness: 0.2,
    metalness: 0.1,
    transmission: 0.05,
    thickness: 1,
    clearcoat: 0.1,
    ior: 1.2,
    side: THREE.DoubleSide,
    opacity: 0.9,
    transparent: true,
    envMapIntensity: 0.5
  });

  // 2. MOLDURA "TITÂNIO" (Mantida clara)
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: "#505050",
    roughness: 0.3,
    metalness: 0.9,
    envMapIntensity: 1.0
  });

  useFrame((state) => {
    if (!groupRef.current || !scanlineRef.current) return;
    const time = state.clock.elapsedTime;

    let scaleX = 1; let scaleY = 1; let scanlineOpacity = 0;
    if (time < 0.2) {
      scaleX = time * 5; scaleY = 0.01; scanlineOpacity = 1;
    } else if (time < 0.8) {
      scaleX = 1;
      const progress = (time - 0.2) / 0.6;
      scaleY = 1 - Math.pow(2, -10 * progress);
      scanlineOpacity = 1 - progress;
    }
    groupRef.current.scale.set(scaleX, scaleY, 1);

    const material = scanlineRef.current.material;
    if (material && !Array.isArray(material) && 'opacity' in material) {
      material.opacity = scanlineOpacity;
      material.transparent = true;
    }
    scanlineRef.current.visible = scanlineOpacity > 0.01;

    if (time > 1) {
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.02;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>

      {/* MOLDURA CLARA */}
      <RoundedBox
        args={[caseW + 0.2, caseH + 0.2, frameDepth]}
        radius={0.05} smoothness={4} material={frameMaterial}
        position={[0, 0, -frameDepth / 2]}
      >
        <group position={[-caseW / 2 + 0.8, caseH / 2 + 0.1, detailZ]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[1.2, 0.08]} />
            <meshBasicMaterial color="#00ff99" transparent opacity={0.8} />
          </mesh>
        </group>

        <group position={[caseW / 2 - 0.8, caseH / 2 + 0.1, detailZ]}>
          <Text position={[0, 0, 0.01]} fontSize={0.09} color="#ffffff" font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" anchorX="center" anchorY="middle">
            SYS.INTEGRITY // 100%
          </Text>
        </group>

        {[-1, 1].map((side, i) => (
          <mesh key={i} position={[side * (caseW / 2 + 0.08), caseH / 2 + 0.08, detailZ]}>
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        ))}
      </RoundedBox>

      {/* VIDRO ESCURO E TRANSPARENTE */}
      <RoundedBox args={[caseW, caseH, glassDepth]} radius={0.02} material={glassMaterial} position={[0, 0, 0]} />

      {/* SCANLINE & GRID */}
      <mesh ref={scanlineRef} position={[0, 0, glassDepth / 2 + 0.05]}>
        <planeGeometry args={[caseW, 0.05]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={1} />
      </mesh>

      <group position={[0, 0, glassDepth / 2 + 0.01]}>
        {Array.from({ length: COLS + 1 }).map((_, i) => (
          <mesh key={`v-${i}`} position={[(i * CELL_SIZE) - (GRID_WIDTH / 2), 0, 0]}>
            <planeGeometry args={[0.008, GRID_HEIGHT]} />
            <meshBasicMaterial color="#00ffff" opacity={0.3} transparent />
          </mesh>
        ))}
        {Array.from({ length: ROWS + 1 }).map((_, i) => (
          <mesh key={`h-${i}`} position={[0, (i * CELL_SIZE) - (GRID_HEIGHT / 2), 0]}>
            <planeGeometry args={[GRID_WIDTH, 0.008]} />
            <meshBasicMaterial color="#00ffff" opacity={0.3} transparent />
          </mesh>
        ))}
      </group>

      {/* ITENS */}
      <group position={[0, 0, glassDepth / 2 + 0.05]}>
        {skills.map((skill, index) => (
          <SkillItem key={skill.id} index={index} skill={skill} onSelect={onSelectSkill} />
        ))}
      </group>
    </group>
  );
};

// --- CENA PRINCIPAL ---
export const Case3D = ({ skills, onSelectSkill }: Case3DProps) => {
  return (
    <div className="w-full h-[600px] cursor-pointer bg-transparent">

      <Canvas camera={{ position: [0, 0.5, 14], fov: 30 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <Suspense fallback={null}>

          {/* AMBIENTE */}
          <Environment preset="studio" blur={1} background={false} environmentRotation={[0, Math.PI / 2, 0]} />

          <Sparkles count={80} scale={12} size={3} speed={0.4} opacity={0.6} color="#00ffff" />

          <ambientLight intensity={1.5} />

          <pointLight position={[-5, -5, -5]} color="#0040ff" intensity={5} distance={30} />
          <pointLight position={[10, 5, 5]} color="#00ffff" intensity={3} />
          <pointLight position={[0, 2, 8]} color="#ffffff" intensity={2} />

          <Center top position={[0, -3.0, -0.95]}>
                <DigitalCase skills={skills} onSelectSkill={onSelectSkill} />
            </Center>

          <OrbitControls
            enableZoom={false} enablePan={false}
            minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};