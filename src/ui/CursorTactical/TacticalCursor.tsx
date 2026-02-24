import React, { useState, useEffect, useRef } from 'react';

export const TacticalCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = `translate3d(${clientX - 16}px, ${clientY - 16}px, 0)`;
      }

      const target = e.target as HTMLElement;
      const isPointer =
        window.getComputedStyle(target).cursor === 'pointer' ||
        document.body.style.cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a';

      setIsHovering(isPointer);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[9999] transition-colors duration-200 ${isHovering ? 'bg-red-500 shadow-[0_0_8px_#ff0000]' : 'bg-cyan-400 shadow-[0_0_8px_#00ffff]'
          }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center ${isHovering ? 'scale-125 rotate-45' : 'scale-100 rotate-0'
          }`}
        style={{ transform: `translate3d(-100px, -100px, 0)` }}
      >
        <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-200 ${isHovering ? 'border-red-500' : 'border-cyan-500/70'}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-200 ${isHovering ? 'border-red-500' : 'border-cyan-500/70'}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-200 ${isHovering ? 'border-red-500' : 'border-cyan-500/70'}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-200 ${isHovering ? 'border-red-500' : 'border-cyan-500/70'}`} />

        <div className={`absolute inset-0 transition-opacity duration-200 ${isHovering ? 'bg-red-500/10' : 'bg-transparent'}`} />
      </div>
    </>
  );
};