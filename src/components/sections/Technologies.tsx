"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Layers } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  svg: React.ReactNode;
  metric: string;
  status: string;
  color: string;
}

export default function Technologies() {
  const technologies: TechItem[] = [
    {
      name: "React",
      category: "Frontend Architecture",
      metric: "RENDER TIME: 0.8ms",
      status: "OPTIMIZED: 100%",
      color: "var(--tech-react)",
      svg: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
          alt="React Logo"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Next.js",
      category: "Fullstack System",
      metric: "EDGE TIME: 14ms",
      status: "SSR CACHING: ENABLED",
      color: "var(--tech-next)",
      svg: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
          alt="Next.js Logo"
          className="w-12 h-12 object-contain invert"
        />
      ),
    },
    {
      name: "Node.js",
      category: "Backend Microservices",
      metric: "CONCURRENT QPS: 84K",
      status: "ASYNC EVENT LOOP: OK",
      color: "var(--tech-node)",
      svg: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
          alt="Node.js Logo"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Flutter",
      category: "Mobile Engine",
      metric: "SKIA CANVAS RATE: 120HZ",
      status: "AOT COMPILE: COMPLETED",
      color: "var(--tech-flutter)",
      svg: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
          alt="Flutter Logo"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Firebase",
      category: "Serverless Mesh",
      metric: "SYNC DELAY: 2ms",
      status: "AUTHENTICATION: REALTIME",
      color: "var(--tech-firebase)",
      svg: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
          alt="Firebase Logo"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "MongoDB",
      category: "Database Clusters",
      metric: "INDEX HITS: 99.9%",
      status: "SHARDING: ONLINE",
      color: "var(--tech-mongodb)",
      svg: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
          alt="MongoDB Logo"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      name: "Python",
      category: "AI & Data Engine",
      metric: "PYTORCH INSTANCE: ACTIVE",
      status: "MODEL ACCURACY: 99.1%",
      color: "var(--tech-python)",
      svg: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
          alt="Python Logo"
          className="w-12 h-12 object-contain"
        />
      ),
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
 
    const rotateX = -(y - box.height / 2) / 14;
    const rotateY = (x - box.width / 2) / 14;
    
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.setProperty("--mouse-x", `0px`);
    card.style.setProperty("--mouse-y", `0px`);
  };

  return (
    <section id="technologies" className="relative py-28 px-6 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-cyan/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-purple/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span className="font-orbitron text-xs font-bold text-neon-cyan tracking-widest uppercase flex items-center gap-2 select-none">
            <Cpu className="w-4 h-4 text-neon-cyan animate-pulse" />
            <span>[ SYSTEM TECH STACK ]</span>
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-white">
            High-Performance Technologies
          </h2>
          <p className="max-w-2xl text-slate-400 font-outfit text-base md:text-lg leading-relaxed">
            We utilize robust frameworks and databases, optimizing compile frequencies, latency rates, and storage matrices.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden group select-none cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Flashlight spotlight tracking mouse */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none -z-10 blur-xl"
                style={{
                  background: `radial-gradient(circle 120px at var(--mouse-x, 0px) var(--mouse-y, 0px), color-mix(in srgb, ${tech.color} 20%, transparent), transparent 80%)`,
                }}
              />

              {/* Scanline holographic bar */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hologram-line" />

              {/* Upper Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Category label */}
                  <span className="font-orbitron text-[10px] text-slate-500 uppercase tracking-wider">
                    {tech.category}
                  </span>
                  
                  {/* Terminal dot status */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" style={{ backgroundColor: tech.color }} />
                    <span className="font-mono text-[8px] text-slate-500">LIVE</span>
                  </div>
                </div>

                {/* SVG Icon Center */}
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-slate-900/30 rounded-2xl border border-slate-800/40 mb-6 group-hover:scale-105 group-hover:border-neon-cyan/20 transition-all duration-300">
                  {tech.svg}
                </div>

                {/* Name */}
                <h3 className="font-orbitron font-bold text-xl text-white text-center mb-1 group-hover:text-neon-cyan transition-colors">
                  {tech.name}
                </h3>
              </div>

              {/* Lower Section (System Telemetry Spec box) */}
              <div className="mt-8 pt-4 border-t border-slate-900 font-mono text-[9px] text-slate-500 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-slate-500" />
                    <span>METRIC:</span>
                  </span>
                  <span className="text-slate-400 font-semibold">{tech.metric}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-slate-500" />
                    <span>STATUS:</span>
                  </span>
                  <span className="text-neon-cyan font-bold" style={{ color: tech.color }}>
                    {tech.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
