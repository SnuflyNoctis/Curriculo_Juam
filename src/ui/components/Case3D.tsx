import * as React from "react";
import { useRef, useState, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Center,
  Html,
  Environment,
  Sparkles,
  AdaptiveDpr,
  AdaptiveEvents,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

import { CanvasOptimizer } from "../../performance/CanvasOptimizer";
import { GraphicsConfig } from "../../performance/GraphicsConfig";

interface Skill {
  id: string | number;
  name: string;
  image: string;
}

interface Case3DProps {
  skills: Skill[];
  onSelectSkill: (skill: Skill) => void;
}

//  CONFIGURAÇÕES //
const CELL_SIZE = 1.9;
const COLS = 3;
const ROWS = 2;
const ITEMS_PER_PAGE = COLS * ROWS;

const materials = {
  caseBody: new THREE.MeshStandardMaterial({
    color: "#151518",
    roughness: 0.6,
    metalness: 0.6,
  }),
  caseInner: new THREE.MeshStandardMaterial({ color: "#101010" }),
  corner: new THREE.MeshStandardMaterial({
    color: "#080808",
    roughness: 0.9,
    metalness: 0.2,
  }),
  metalAccents: new THREE.MeshStandardMaterial({ color: "#444", metalness: 1 }),
  handleBase: new THREE.MeshStandardMaterial({
    color: "#111",
    roughness: 0.5,
    metalness: 0.8,
  }),
  handleGrip: new THREE.MeshStandardMaterial({
    color: "#050505",
    roughness: 1,
  }),
  latchBody: new THREE.MeshStandardMaterial({
    color: "#333",
    metalness: 0.9,
    roughness: 0.2,
  }),
  latchRed: new THREE.MeshBasicMaterial({ color: "#ff0000" }),
  skillBase: new THREE.MeshStandardMaterial({
    color: "#101015",
    roughness: 0.5,
    metalness: 0.8,
  }),
  gridLine: new THREE.LineBasicMaterial({
    color: "#00ffff",
    opacity: 0.1,
    transparent: true,
  }),
  hudCorner: new THREE.MeshBasicMaterial({ color: "#00ffff", opacity: 0.6 }),
  glass: new THREE.MeshStandardMaterial({
    color: "#aaddff",
    roughness: 0.1,
    metalness: 0.8,
    transparent: true,
    opacity: 0.15,
  }),
};

//  HUD HTML //
const HUDLayer = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => (
  <div className="absolute inset-0 pointer-events-none font-mono text-[10px] text-cyan-900/40 uppercase tracking-[0.2em] p-8 flex flex-col justify-between z-10">
    <div className="flex justify-between">
      <span>LAT: 36.6341 / LONG: -116.3210</span>
      <span>STATUS: ENCRYPTED // LINK_STABLE</span>
    </div>
    <div className="flex justify-between items-end">
      <div className="border-l border-cyan-500/20 pl-2">BIO_OS_PRO_V4.0</div>
      <div className="text-right">
        PAGE: {page + 1} / {totalPages} <br />
        SECURE STORAGE DEVICE
      </div>
    </div>
  </div>
);

//  ITEM DA SKILL //
const SkillItem = React.memo(
  ({
    skill,
    index,
    onSelect,
  }: {
    skill: Skill;
    index: number;
    onSelect: (s: Skill) => void;
  }) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);
    const texture = useLoader(THREE.TextureLoader, skill.image);
    const [active, setActive] = useState(false);

    const position = useMemo(() => {
      const col = index % COLS;
      const row = Math.floor(index / COLS);
      const x = (col - (COLS - 1) / 2) * CELL_SIZE;
      const y = -(row - (ROWS - 1) / 2) * CELL_SIZE;
      return [x, y, 0] as [number, number, number];
    }, [index]);

    useEffect(() => {
      setActive(false);
      const timer = setTimeout(
        () => {
          setActive(true);
        },
        100 + index * 50,
      );
      return () => clearTimeout(timer);
    }, [index, skill.id]);

    useFrame(() => {
      if (!groupRef.current) return;
      const targetZ = hovered ? 0.25 : 0.1;
      const targetScale = hovered ? 1.1 : 0.95;

      if (active) {
        groupRef.current.position.z = THREE.MathUtils.lerp(
          groupRef.current.position.z,
          targetZ,
          0.1,
        );
        groupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1),
        );
      } else {
        groupRef.current.scale.setScalar(0);
      }
    });

    return (
      <group
        ref={groupRef}
        position={position}
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
        <RoundedBox
          args={[CELL_SIZE * 0.85, CELL_SIZE * 0.85, 0.08]}
          radius={0.05}
          smoothness={2}
          material={materials.skillBase}
        />

        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[CELL_SIZE * 0.65, CELL_SIZE * 0.65]} />
          <meshStandardMaterial
            map={texture}
            transparent={true}
            emissive={hovered ? "#00ffff" : "#444444"}
            emissiveIntensity={hovered ? 0.8 : 0}
            toneMapped={false}
          />
        </mesh>

        {hovered && active && (
          <Html
            position={[0, -0.8, 0.2]}
            center
            zIndexRange={[100, 0]}
            style={{ pointerEvents: "none" }}
          >
            <div className="bg-black/90 border-l-4 border-cyan-500 px-3 py-1 text-cyan-50 font-mono text-[10px] uppercase shadow-[0_0_15px_rgba(0,255,255,0.3)] whitespace-nowrap tracking-widest">
              {skill.name}
            </div>
          </Html>
        )}
      </group>
    );
  },
);

//  COMPONENTES AUXILIARES //
const TacticalHandle = React.memo(
  ({
    width,
    position,
  }: {
    width: number;
    position: [number, number, number];
  }) => {
    return (
      <group position={position}>
        <RoundedBox
          args={[0.4, 0.6, 0.3]}
          position={[-width / 2 + 0.5, 0, 0]}
          radius={0.1}
          smoothness={2}
          material={materials.handleBase}
        />
        <RoundedBox
          args={[0.4, 0.6, 0.3]}
          position={[width / 2 - 0.5, 0, 0]}
          radius={0.1}
          smoothness={2}
          material={materials.handleBase}
        />
        <RoundedBox
          args={[width - 1.2, 0.25, 0.2]}
          position={[0, 0.1, 0]}
          radius={0.1}
          smoothness={2}
          material={materials.handleBase}
        />
        <RoundedBox
          args={[width - 1.8, 0.3, 0.25]}
          position={[0, 0.1, 0]}
          radius={0.05}
          smoothness={2}
          material={materials.handleGrip}
        />
      </group>
    );
  },
);

const TacticalLatch = React.memo(
  ({ position }: { position: [number, number, number] }) => {
    return (
      <group position={position}>
        <RoundedBox
          args={[0.2, 0.8, 0.4]}
          radius={0.05}
          smoothness={2}
          material={materials.latchBody}
        />
        <mesh position={[0.12, 0, 0]} material={materials.latchRed}>
          <boxGeometry args={[0.05, 0.4, 0.1]} />
        </mesh>
      </group>
    );
  },
);

const PageButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => {
  const [hovered, setHover] = useState(false);
  const color = disabled ? "#222" : hovered ? "#00ffff" : "#445566";
  const xPos = direction === "left" ? -3.8 : 3.8;

  return (
    <group
      position={[xPos, 0, 0.2]}
      onClick={(e) => {
        if (!disabled) {
          e.stopPropagation();
          onClick();
        }
      }}
      onPointerOver={() => !disabled && setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <RoundedBox args={[0.5, 1, 0.2]} radius={0.1}>
        <meshStandardMaterial
          color={disabled ? "#111" : "#222"}
          metalness={0.8}
        />
      </RoundedBox>
      <mesh
        rotation={[0, 0, direction === "left" ? Math.PI / 2 : -Math.PI / 2]}
        position={[0, 0, 0.11]}
      >
        <coneGeometry args={[0.15, 0.3, 3]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

//  MALETA INTELIGENTE //
const DigitalCase = ({
  skills,
  onSelectSkill,
  page,
  setPage,
  totalPages,
}: {
  skills: Skill[];
  onSelectSkill: (skill: Skill) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) => {
  const totalW = COLS * CELL_SIZE + 1.2;
  const totalH = ROWS * CELL_SIZE + 1.2;
  const depth = 0.8;

  const groupRef = useRef<THREE.Group>(null);

  const currentSkills = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return skills.slice(start, end);
  }, [skills, page]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.03;
  });

  const gridGeo = useMemo(
    () =>
      new THREE.EdgesGeometry(
        new THREE.PlaneGeometry(totalW - 0.8, totalH - 0.8, COLS, ROWS),
      ),
    [totalW, totalH],
  );

  return (
    <group ref={groupRef}>
      {/* BODY */}
      <RoundedBox
        args={[totalW, totalH, depth]}
        radius={0.2}
        smoothness={4}
        position={[0, 0, 0]}
        material={materials.caseBody}
      >
        <mesh
          position={[0, 0, -depth / 2 - 0.01]}
          material={materials.caseInner}
        >
          <boxGeometry args={[totalW - 0.5, totalH - 0.5, 0.05]} />
        </mesh>
      </RoundedBox>

      {/* Botões */}
      <PageButton
        direction="left"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      />
      <PageButton
        direction="right"
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages - 1}
      />

      {/* CANTONEIRAS */}
      {[
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, -1],
      ].map(([x, y], i) => (
        <group key={i} position={[x * (totalW / 2), y * (totalH / 2), 0]}>
          <RoundedBox
            args={[0.6, 0.6, depth + 0.05]}
            radius={0.1}
            smoothness={2}
            material={materials.corner}
          />
          <mesh
            position={[0, 0, depth / 2 + 0.03]}
            material={materials.metalAccents}
          >
            <cylinderGeometry args={[0.1, 0.1, 0.05, 8]} />
          </mesh>
        </group>
      ))}

      <TacticalHandle
        width={totalW * 0.5}
        position={[0, totalH / 2 + 0.3, 0]}
      />
      <TacticalLatch position={[totalW / 2 + 0.1, 0, 0]} />
      <TacticalLatch position={[-totalW / 2 - 0.1, 0, 0]} />

      {/* BACKPLATE */}
      <mesh position={[0, 0, depth / 2 - 0.1]} material={materials.caseInner}>
        <planeGeometry args={[totalW - 0.6, totalH - 0.6]} />
      </mesh>

      {/* GRID DECORATIVO */}
      <group position={[0, 0, depth / 2 - 0.05]}>
        <lineSegments geometry={gridGeo} material={materials.gridLine} />
      </group>

      {/* ÍCONES */}
      <group position={[0, 0, depth / 2]}>
        {currentSkills.map((skill: Skill, index: number) => (
          <SkillItem
            key={skill.id}
            index={index}
            skill={skill}
            onSelect={onSelectSkill}
          />
        ))}
      </group>

      {/* HUD WINDOW */}
      <group position={[0, 0, depth / 2 + 0.1]}>
        {[
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
        ].map(([mx, my], i) => (
          <group
            key={i}
            position={[mx * (totalW / 2 - 0.6), my * (totalH / 2 - 0.6), 0]}
          >
            <mesh material={materials.hudCorner}>
              <planeGeometry args={[0.3, 0.02]} />
            </mesh>
            <mesh material={materials.hudCorner}>
              <planeGeometry args={[0.02, 0.3]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* VIDRO FRONTAL */}
      <RoundedBox
        args={[totalW - 0.4, totalH - 0.4, 0.05]}
        radius={0.1}
        position={[0, 0, depth / 2 + 0.15]}
        material={materials.glass}
      />
    </group>
  );
};

//  SCENE //
export const Case3D = ({ skills, onSelectSkill }: Case3DProps) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(skills.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full h-[600px] relative bg-transparent">
      <HUDLayer page={page} totalPages={totalPages} />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      <CanvasOptimizer>
        <Canvas
          dpr={GraphicsConfig.dpr as number}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 10], fov: 45 }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          <Suspense fallback={null}>
            <Environment preset="city" blur={1} />
            <Sparkles
              count={15}
              scale={12}
              size={3}
              speed={0.2}
              opacity={0.4}
              color="#aaddff"
            />

            <ambientLight intensity={0.6} />
            <pointLight position={[-5, 5, 5]} color="#00ffff" intensity={2} />
            <pointLight position={[5, -5, 5]} color="#ff0055" intensity={1} />
            <pointLight position={[0, 0, 8]} color="#ffffff" intensity={1.5} />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
              <Center top position={[0, -2.5, 0]}>
                <DigitalCase
                  skills={skills}
                  onSelectSkill={onSelectSkill}
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </Center>
            </Float>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
              minAzimuthAngle={-Math.PI / 3}
              maxAzimuthAngle={Math.PI / 3}
              rotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </CanvasOptimizer>
    </div>
  );
};
