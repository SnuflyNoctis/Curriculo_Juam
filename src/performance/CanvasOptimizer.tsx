// src/performance/CanvasOptimizer.tsx
import React, { useState, useEffect, useRef } from "react";

interface CanvasOptimizerProps {
  children: React.ReactNode;
}

export const CanvasOptimizer: React.FC<CanvasOptimizerProps> = ({
  children,
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "100px", // Carrega um pouco antes de entrar na tela
        threshold: 0.01,
      },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      {/* Aqui acontece o Unmount Real: 
          Se isInView for false, o React remove o componente 'children' 
          e o Three.js limpa o contexto do Canvas.
      */}
      {isInView ? children : null}
    </div>
  );
};
