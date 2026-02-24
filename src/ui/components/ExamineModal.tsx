import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Center, Float, OrbitControls, Sparkles, Ring } from "@react-three/drei";

const TEST_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png";

interface Skill {
  id: string;
  name: string;
  image?: string;
  category: string;
  examineText: string;
}

const HologramItem = ({ texture, color }: { texture: THREE.Texture, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const opacity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
        meshRef.current.material.opacity = opacity;
      }
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.01;
    }
  });

  return (
    <group>
      {/* 1. O ÍCONE */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[0, -0.4, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
            color={color}
          />
        </mesh>
      </Float>

      {/* A BASE DO PROJETOR */}
      <group position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]} ref={ringRef}>
        <Ring args={[1, 1.1, 32]} material-color={color} material-transparent material-opacity={0.5} />
        <Ring args={[1.3, 1.35, 32]} material-color={color} material-transparent material-opacity={0.3} />
        <Sparkles count={30} scale={3} size={4} speed={0.4} opacity={0.5} color={color} />
      </group>

      <pointLight position={[0, -1, 0]} color={color} intensity={5} distance={5} />
    </group>
  );
};

export const ExamineModal = ({ skill, onClose }: { skill: Skill, onClose: () => void }) => {
  const imageToLoad = skill.image || TEST_IMAGE_URL;

  const texture = useLoader(THREE.TextureLoader, imageToLoad);

  const themeColor = skill.category === 'frontend' ? "#00ffff" : skill.category === 'backend' ? "#00ff00" : "#007acc";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col md:flex-row items-center justify-center p-4 md:p-10"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-50 flex items-center gap-2 uppercase tracking-widest text-xs font-mono"
      >
        [ Close ] <span className="border border-white/20 p-1">ESC</span>
      </button>

      <div className="w-full h-[50vh] md:h-full md:w-2/3 relative cursor-grab active:cursor-grabbing">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />

        <Canvas camera={{ position: [0, 1, 7], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.5} />

          <Center>
            <HologramItem texture={texture} color={themeColor} />
          </Center>

          <OrbitControls
            enableZoom={true}
            minDistance={4}
            maxDistance={10}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cyan-500/50 text-[10px] uppercase tracking-[0.3em] font-mono animate-pulse pointer-events-none">
          Drag to Rotate Hologram
        </div>
      </div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full md:w-1/3 max-w-lg bg-[#0a0a10] border-l-2 p-6 md:p-8 relative"
        style={{ borderColor: themeColor }}
      >
        <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-wider italic" style={{ textShadow: `0 0 15px ${themeColor}` }}>
          {skill.name}
        </h3>
        <div className="h-px w-full bg-gradient-to-r from-gray-500 to-transparent mb-6 opacity-30" />

        <p className="font-mono text-sm md:text-base text-gray-300 leading-relaxed text-justify">
          <span className="font-bold mr-2" style={{ color: themeColor }}>LOG_ENTRY:</span>
          {skill.examineText || "Encrypted data. decryption key required."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">
          <div>
            Origin: <span className="text-gray-300">Open Source</span>
          </div>
          <div>
            Status: <span className="text-green-500 animate-pulse">Active</span>
          </div>
        </div>

        <div className="absolute top-2 right-2 text-[8px] text-gray-600 font-mono">
          ID: {skill.id.toUpperCase()}_HOL
        </div>
      </motion.div>
    </motion.div>
  );
};