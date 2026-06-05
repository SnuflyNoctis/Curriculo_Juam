import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCard3DProps {
  imageUrl: string;
}

const CardInner = ({ url }: { url: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);


  useFrame((state) => {
    if (!groupRef.current) return;

    const { x, y } = state.mouse;
    const targetRotationX = -y * 0.2;
    const targetRotationY = x * 0.2;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
        <Image
          url={url}
          transparent
          opacity={hovered ? 1 : 0.85}
          scale={[3, 1, 0]}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
            setHover(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
            setHover(false);
          }}
          toneMapped={false}
        />
      </Float>
    </group>
  );
};

// Componente Wrapper
export const ProjectCard3D = ({ imageUrl }: ProjectCard3DProps) => {
  // Vamos usar um fallback se a URL vier vazia
  const safeImageUrl = imageUrl || "https://picsum.photos/800/600";

  return (
    <div className="w-100 h-full relative rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,150,255,0.15)] border border-blue-500/20 group hover:shadow-[0_0_40px_rgba(0,200,255,0.3)] transition-all duration-500">

      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] to-black z-0" />

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} color="#4444ff" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#aaddff" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#ff00ff" />
        <Environment preset="city" />

        <Suspense fallback={
          <Html center>
            <div className="text-blue-500 font-mono text-xs animate-pulse">LOADING_DATA...</div>
          </Html>
        }>
          <CardInner url={safeImageUrl} />
        </Suspense>

      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-white/0 to-white/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
    </div>
  );
};