"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Keep mouse coordinates in a Ref for high-performance animation updates
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseRef.current = { x: clientX, y: clientY };
      setPosition({ x: clientX, y: clientY });
      setHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Lag follow trail effect running in a SINGLE stable animation loop
  useEffect(() => {
    let animId: number;
    
    const updateTrail = () => {
      setTrail((prev) => {
        // Calculate distance between trail and current mouse position
        const dx = mouseRef.current.x - prev.x;
        const dy = mouseRef.current.y - prev.y;
        
        // Smooth interpolation (lerp)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animId = requestAnimationFrame(updateTrail);
    };
    
    animId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Hide custom cursor on touch/mobile devices
  useEffect(() => {
    const handleTouch = () => {
      setHidden(true);
    };
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-blue pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 select-none mix-blend-screen hidden md:block"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          borderColor: isHovered ? "#bd00ff" : "#00f0ff",
          boxShadow: isHovered 
            ? "0 0 10px rgba(189, 0, 255, 0.4)" 
            : "0 0 10px rgba(0, 240, 255, 0.2)",
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-neon-cyan pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 select-none mix-blend-screen hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: isHovered ? "#ff007f" : "#00ffff",
        }}
      />
    </>
  );
}
