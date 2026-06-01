"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import React from "react";
import { Smartphone, Monitor, Shield, Layout, ShoppingCart, Cpu } from "lucide-react";

// Dynamically import the GlobeScene with SSR disabled to prevent server-side Canvas hydration errors.
const GlobeScene = dynamic(() => import("../3d/GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="w-8 h-8 rounded-full border-2 border-t-neon-blue border-r-transparent animate-spin" />
        <span className="text-[10px] text-slate-500 font-orbitron tracking-widest uppercase">SYNCING GRID...</span>
      </div>
    </div>
  ),
});

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  gradient: string;
  glow: string;
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      icon: <Smartphone className="w-6 h-6 text-neon-blue" />,
      title: "Mobile App Development",
      desc: "Cross-platform iOS and Android deployments using React Native and Flutter for fast, native performance.",
      gradient: "from-cyan-500/10 to-blue-500/5",
      glow: "var(--glow-color)",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-neon-purple" />,
      title: "Android App Development",
      desc: "Highly optimized native Android architectures utilizing Kotlin, tailored for robust system integration.",
      gradient: "from-purple-500/10 to-indigo-500/5",
      glow: "var(--glow-color-purple)",
    },
    {
      icon: <Monitor className="w-6 h-6 text-neon-blue" />,
      title: "Website Development",
      desc: "Blazing fast web ecosystems constructed on Next.js, optimized for responsiveness, speed, and ranking.",
      gradient: "from-blue-500/10 to-cyan-500/5",
      glow: "var(--glow-color)",
    },
    {
      icon: <Layout className="w-6 h-6 text-neon-pink" />,
      title: "UI/UX Architecture",
      desc: "Immersive layout engineering, wireframing, and custom interfaces designed to drive retention.",
      gradient: "from-pink-500/10 to-purple-500/5",
      glow: "rgba(255, 0, 127, 0.2)",
    },
    {
      icon: <Cpu className="w-6 h-6 text-neon-cyan" />,
      title: "Custom Software Solutions",
      desc: "Secure backend microservices, robust API development, and specialized automated architectures.",
      gradient: "from-cyan-500/10 to-emerald-500/5",
      glow: "var(--glow-color)",
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-neon-purple" />,
      title: "E-commerce Development",
      desc: "Highly scalable online stores integrated with secure checkout protocols and custom analytics dashboards.",
      gradient: "from-indigo-500/10 to-pink-500/5",
      glow: "var(--glow-color-purple)",
    },
  ];

  // Client-side 3D card tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Set dynamic custom properties for tracking
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const rotateX = -(y - box.height / 2) / 12;
    const rotateY = (x - box.width / 2) / 12;
    
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.setProperty("--mouse-x", `0px`);
    card.style.setProperty("--mouse-y", `0px`);
  };

  return (
    <section id="services" className="relative py-28 px-6 bg-slate-950/40">
      {/* Background Grids */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Title & 3D Globe */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="font-orbitron text-xs font-bold text-neon-blue tracking-widest uppercase">
              // ENGINEERING CAPABILITIES
            </span>
            <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-white leading-tight">
              Enterprise Services <br />
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Optimized for Scale
              </span>
            </h2>
            <p className="text-slate-400 font-outfit text-base md:text-lg leading-relaxed">
              We design and construct high-performance digital platforms. From responsive cross-platform mobile apps to scalable cloud integrations, our solutions are engineered to outperform the competition.
            </p>

            {/* Embedded 3D Globe */}
            <div className="relative w-full h-[350px] mt-6">
              <GlobeScene />
            </div>
          </div>

          {/* Right Column: Interactive Service Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative rounded-2xl border border-[var(--card-border)] bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-6 backdrop-blur-md cursor-pointer transition-all duration-300 ease-out hover:border-neon-blue/40"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glowing flashlight spotlight tracking mouse */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none -z-10 blur-xl"
                  style={{
                    background: `radial-gradient(circle 180px at var(--mouse-x, 0px) var(--mouse-y, 0px), ${service.glow}, transparent 80%)`,
                  }}
                />

                {/* Service Icon with hover scaling */}
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:border-neon-blue transition-colors duration-300">
                  {service.icon}
                </div>

                <h3 className="font-orbitron font-bold text-lg text-white mb-3 group-hover:text-neon-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 font-outfit text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
