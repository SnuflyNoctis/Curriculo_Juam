import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// A Matemática para desenhar o Coração Clássico
const createHeartGeometry = () => {
  const shape = new THREE.Shape();
  const x = 0,
    y = 0;
  shape.moveTo(x + 5, y + 5);
  shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 2, // ⚡ Reduzido de 3 para 2 (menos polígonos, visualmente igual)
    steps: 1, // ⚡ Reduzido de 2 para 1
    bevelSize: 1,
    bevelThickness: 1,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  geometry.rotateZ(Math.PI);
  return geometry;
};

// Componente de um Coração Individual
const Heart = ({ position, color, scale, speed, offset }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Cria a geometria apenas uma vez para salvar RAM
  const geometry = useMemo(() => createHeartGeometry(), []);

  // Animação super leve que substitui o <Float>
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subida contínua
      meshRef.current.position.y += speed * delta;

      // Rotação suave no próprio eixo
      meshRef.current.rotation.y += speed * 0.2 * delta;
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime + offset) * 0.1; // Balanço natural

      // Se subir demais, volta lá pra baixo
      if (meshRef.current.position.y > 15) {
        meshRef.current.position.y = -15;
      }
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} scale={scale}>
        {/* ⚡ Trocado para meshStandardMaterial: Efeito neon brilhante, mas 10x mais leve que o Physical */}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2} // Aumentamos a intensidade para compensar a falta do physical
          transparent={true}
          opacity={0.8}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
};

// O Enxame de Corações
export const FloatingHearts = () => {
  // Configuração dos nossos corações
  const heartsData = useMemo(() => {
    const colors = ["#ff6ec7", "#4ea6ff", "#ffd700"];
    return Array.from({ length: 15 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * -10,
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.03 + 0.02,
      speed: Math.random() * 1.5 + 0.5,
      offset: Math.random() * 10, // ⚡ Offset aleatório para que eles não balancem todos sincronizados
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
