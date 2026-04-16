import { useState, useEffect, useRef, FC, ReactNode } from "react";

interface CanvasOptimizerProps {
  children: ReactNode;
}

export const CanvasOptimizer: FC<CanvasOptimizerProps> = ({
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
        rootMargin: "200px",
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
        {/* CHILDREN (CANVAS) SO RENDERIZA SE ESTIVER VISIVEL (LOGICA DE C++ EM THREE) */}
      {isInView && children}
    </div>
  );
};
