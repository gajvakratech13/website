"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIndex: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color list matching our neon scheme
    const colors = ["#00f0ff", "#bd00ff", "#00ffff", "#ff007f"];
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 12000), 120);

    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        colorIndex,
        color: colors[colorIndex],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light-theme");
      const themeColors = isLight
        ? ["#1d4ed8", "#6d28d9", "#0f766e", "#be185d"]
        : ["#00f0ff", "#bd00ff", "#00ffff", "#ff007f"];

      // Draw particle network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.color = themeColors[p.colorIndex]; // dynamically adjust color based on active theme
        p.x += p.vx;
        p.y += p.vy;

        // Mouse attraction/magnetic pull
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 200) {
            // Draw connection line to mouse
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = isLight
              ? `rgba(29, 78, 216, ${0.22 * (1 - dist / 200)})`
              : `rgba(0, 240, 255, ${0.22 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Attract strongly towards the mouse
            const force = (200 - dist) / 200;
            p.vx += (dx / dist) * force * 0.28;
            p.vy += (dy / dist) * force * 0.28;
          }
        }

        // Apply friction to keep speeds controlled
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Restore baseline slow drift speed
        const targetVx = (Math.random() - 0.5) * 0.6;
        const targetVy = (Math.random() - 0.5) * 0.6;
        p.vx += (targetVx - p.vx) * 0.02;
        p.vy += (targetVy - p.vy) * 0.02;

        // Boundary wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = isLight ? 2 : 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset for lines

        // Draw lines to neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Gradient style lines based on particle colors
            ctx.strokeStyle = isLight
              ? `rgba(109, 40, 217, ${0.1 * (1 - dist / 120)})`
              : `rgba(189, 0, 255, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none opacity-80"
    />
  );
}
