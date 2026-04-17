import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// A Matemática para desenhar o Coração Clássico
const createHeartGeometry = () => {
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  shape.moveTo(x + 5, y + 5);
  shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  // Extrude transforma o desenho 2D num objeto 3D "gordinho"
  const extrudeSettings = {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  // Centraliza e inverte a geometria para ela ficar na posição certa
  geometry.center();
  geometry.rotateZ(Math.PI);
  return geometry;
};

// Componente de um Coração Individual
const Heart = ({ position, color, scale, speed }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Cria a geometria apenas uma vez para salvar RAM
  const geometry = useMemo(() => createHeartGeometry(), []);

  // Animação de subida infinita
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y += speed * delta;
      meshRef.current.rotation.y += (speed * 0.2) * delta;

      // Se subir demais, volta lá pra baixo
      if (meshRef.current.position.y > 15) {
        meshRef.current.position.y = -15;
      }
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} geometry={geometry} scale={scale}>
          <meshPhysicalMaterial
            color={color}

            transmission={0.99}
            opacity={1}

            metalness={0.1}
            roughness={0.1}

            ior={1.5}

            emissive={color}
            emissiveIntensity={1.5}

            thickness={5}
            transparent={true}
          />
        </mesh>
      </Float>
    </group>
  );
};

// O Enxame de Corações
export const FloatingHearts = () => {
  // Configuração dos nossos corações (Posições aleatórias na tela)
  const heartsData = useMemo(() => {
    const colors = ["#ff6ec7", "#4ea6ff", "#ffd700"]; // Rosa KH, Ciano, Dourado
    return Array.from({ length: 15 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20, // X
        (Math.random() - 0.5) * 30, // Y inicial
        (Math.random() - 0.5) * -10 // Z (profundidade)
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: (Math.random() * 0.03) + 0.02, // Tamanho
      speed: (Math.random() * 1.5) + 0.5, // Velocidade de subida
    }));
  }, []);

  return (
    <>
      {heartsData.map((data, index) => (
        <Heart key={index} {...data} />
      ))}
    </>
  );
};