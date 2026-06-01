"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Monitor, Smartphone, Code, Activity, Cpu, Wifi, RefreshCw, Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const FloatingShapes = dynamic(() => import("../3d/FloatingShapes"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full -z-10 bg-slate-950/20" />,
});

interface LogItem {
  id: string;
  time: string;
  text: string;
  type: "info" | "success" | "warning" | "error";
}

const logTemplates = [
  { text: "Establishing secure SSL connection to GajvakraNet...", type: "info" },
  { text: "SSL handshake complete. TLS 1.3 active.", type: "success" },
  { text: "Mapping server cluster nodes [US-EAST-1] to edge gateway...", type: "info" },
  { text: "Synchronizing global database replication latency: 12ms", type: "success" },
  { text: "Neural weight matrix initialized. Efficiency: 99.85%", type: "success" },
  { text: "Optimizing UI layout system parameters...", type: "info" },
  { text: "Compiling client-side interactive telemetry assets...", type: "info" },
  { text: "WebGL Render Loop status: 60fps stable.", type: "success" },
  { text: "Garbage collection complete. Released 42MB heap size.", type: "info" }
];

const overclockTemplates = [
  { text: "OVERCLOCK: Core clock multiplier bumped to x58 (5.8 GHz).", type: "warning" },
  { text: "OVERCLOCK: Cooling system fan speed set to max (4500 RPM).", type: "info" },
  { text: "ALERT: Volumetric 3D render thread operating at 95% capacity.", type: "warning" },
  { text: "OVERCLOCK: Cache prefetching bandwidth saturated.", type: "info" },
  { text: "CRITICAL: Temperature spike at Core 4: 74°C. Adjusting voltage.", type: "error" },
  { text: "OVERCLOCK: Throughput increased by 142%. Latency decreased to 8ms.", type: "success" }
];

const diagnosticTemplates = [
  { text: "DIAGNOSTIC: Running App Router hydration checks...", type: "info" },
  { text: "DIAGNOSTIC: CSS custom properties resolution: OK", type: "success" },
  { text: "DIAGNOSTIC: WebGL floating shapes draw calls: 142/142 PASS", type: "success" },
  { text: "DIAGNOSTIC: Cursor position lag listener state: ACTIVE", type: "info" },
  { text: "DIAGNOSTIC: Device viewport checklist: MOBILE, TABLET, DESKTOP - ALL OK", type: "success" },
  { text: "DIAGNOSTIC: Dynamic spotlight card gradient cache: VERIFIED", type: "success" }
];

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  // State for Interactive Diagnostics HUD
  const [logs, setLogs] = useState<LogItem[]>([
    { id: "1", time: "00:00:01", text: "System Booting: GAJVAKRA-OS kernel v3.2.0", type: "info" },
    { id: "2", time: "00:00:02", text: "Loading interactive WebGL canvas matrices...", type: "info" },
    { id: "3", time: "00:00:03", text: "Node cluster sync: OK [Latency 14ms]", type: "success" },
    { id: "4", time: "00:00:04", text: "Secure handshake with GajvakraAI...", type: "info" },
    { id: "5", time: "00:00:05", text: "AI agent node online (99.8% confidence)", type: "success" }
  ]);

  const [latency, setLatency] = useState<number[]>([15, 18, 14, 25, 20, 15, 18, 17, 24, 22, 28, 20, 18, 25, 19]);
  const [cpuLoad, setCpuLoad] = useState<number>(38.4);
  const [netSync, setNetSync] = useState<number>(99.98);
  const [hudMode, setHudMode] = useState<"normal" | "overclock" | "diagnostics">("normal");
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const terminalRef = useRef<HTMLDivElement>(null);

  // Initialize times on client mount to match real time
  useEffect(() => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs(prev => prev.map((log, idx) => ({
      ...log,
      time: new Date(now.getTime() - (5 - idx) * 1000).toTimeString().split(" ")[0]
    })));
  }, []);

  // Scroll terminal logs internally to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // CPU and NetSync oscillations
  useEffect(() => {
    const interval = setInterval(() => {
      if (isScanning) {
        setCpuLoad(prev => {
          const next = prev + (Math.random() - 0.5) * 18;
          return Math.max(10, Math.min(99.9, next));
        });
        setNetSync(prev => {
          const next = prev + (Math.random() - 0.5) * 4;
          return Math.max(80, Math.min(100, next));
        });
      } else if (hudMode === "overclock") {
        setCpuLoad(prev => {
          const target = 92.5;
          const diff = target - prev;
          return prev + diff * 0.15 + (Math.random() - 0.5) * 3;
        });
        setNetSync(prev => {
          const target = 94.15;
          const diff = target - prev;
          return prev + diff * 0.1 + (Math.random() - 0.5) * 0.6;
        });
      } else {
        setCpuLoad(prev => {
          const target = 38.4;
          const diff = target - prev;
          return prev + diff * 0.1 + (Math.random() - 0.5) * 1.5;
        });
        setNetSync(prev => {
          const target = 99.98;
          const diff = target - prev;
          return prev + diff * 0.1 + (Math.random() - 0.5) * 0.04;
        });
      }
    }, 400);

    return () => clearInterval(interval);
  }, [hudMode, isScanning]);

  // Latency updates
  useEffect(() => {
    const updateLatency = () => {
      setLatency(prev => {
        let baseMin = 12;
        let baseMax = 25;
        if (hudMode === "overclock") {
          baseMin = 6;
          baseMax = 12;
        } else if (isScanning) {
          baseMin = 15;
          baseMax = 45;
        }

        const spike = Math.random() > 0.95 ? 15 : 0;
        const newVal = Math.floor(Math.random() * (baseMax - baseMin) + baseMin + spike);
        return [...prev.slice(1), newVal];
      });
    };

    const intervalVal = hudMode === "overclock" ? 500 : 900;
    const interval = setInterval(updateLatency, intervalVal);
    return () => clearInterval(interval);
  }, [hudMode, isScanning]);

  const addLog = (text: string, type: "info" | "success" | "warning" | "error") => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs(prev => {
      const next = [...prev, { id: Math.random().toString(), time: timeStr, text, type }];
      return next.length > 20 ? next.slice(next.length - 20) : next;
    });
  };

  // Logs stream
  useEffect(() => {
    const streamLog = () => {
      if (isScanning) {
        const randomTpl = diagnosticTemplates[Math.floor(Math.random() * diagnosticTemplates.length)];
        addLog(randomTpl.text, randomTpl.type as any);
      } else if (hudMode === "overclock") {
        const randomTpl = overclockTemplates[Math.floor(Math.random() * overclockTemplates.length)];
        addLog(randomTpl.text, randomTpl.type as any);
      } else {
        const randomTpl = logTemplates[Math.floor(Math.random() * logTemplates.length)];
        addLog(randomTpl.text, randomTpl.type as any);
      }
    };

    let logDelay = 3500;
    if (isScanning) {
      logDelay = 500;
    } else if (hudMode === "overclock") {
      logDelay = 1500;
    }

    const interval = setInterval(streamLog, logDelay);
    return () => clearInterval(interval);
  }, [hudMode, isScanning]);

  const handleModeChange = (mode: "normal" | "overclock" | "diagnostics") => {
    if (mode === hudMode) return;
    setHudMode(mode);

    if (mode === "normal") {
      addLog("System telemetry switched to STABLE mode.", "info");
      setIsScanning(false);
    } else if (mode === "overclock") {
      addLog("WARNING: System overclock initiated. Engaging cooling subsystems...", "warning");
      setIsScanning(false);
    } else if (mode === "diagnostics") {
      addLog("DIAGNOSTICS SEQUENCE STARTED. Initiating scan...", "info");
      setIsScanning(true);
      
      // Auto complete diagnostics scan after 4.5 seconds
      setTimeout(() => {
        setIsScanning(false);
        setHudMode("normal");
        addLog("DIAGNOSTICS INTEGRITY CHECKS COMPLETED: 100% HEALTHY.", "success");
      }, 4500);
    }
  };

  // SVG Latency points calculator
  const points = latency.map((val, idx) => {
    const x = (idx / (latency.length - 1)) * 340; // width 340
    const y = 60 - (val / 50) * 50; // height 60, baseline padding
    return `${x},${y}`;
  }).join(" ");

  // 3D Card Tilt effects for the Diagnostics Console card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const rotateX = -(y - box.height / 2) / 20;
    const rotateY = (x - box.width / 2) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.setProperty("--mouse-x", `0px`);
    card.style.setProperty("--mouse-y", `0px`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* 3D Shapes Overlay */}
      <FloatingShapes />

      {/* Futuristic Background Accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-neon-blue to-neon-purple rounded-full blur-[130px] opacity-15 -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full blur-[130px] opacity-10 -z-10" />

      {/* Main Hero Container split into 2 columns on lg */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Headlines & Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Cybernetic telemetry pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-blue/30 bg-slate-900/60 backdrop-blur-md text-[10px] md:text-xs text-neon-blue tracking-widest uppercase mb-8 hologram-line shadow-lg select-none self-center lg:self-start"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-ping" />
            <span>OPERATIONAL STATUS: NEXT-GEN ACTIVE</span>
          </motion.div>

          {/* Heading with gradients */}
          <motion.h1
            variants={itemVariants}
            className="font-orbitron font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.1] tracking-tight text-white mb-6"
          >
            Building the Future with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple bg-clip-text text-transparent text-glow-blue select-none">
              Apps & Websites
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl lg:max-w-xl text-slate-300 font-outfit text-base md:text-lg lg:text-xl leading-relaxed mb-10"
          >
            GajvakraTech engineered solutions connect luxury design paradigms with state-of-the-art software systems, transforming ambitious ideas into digital masterpieces.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            {/* Primary Action (Start Project) */}
            <a
              href="#contact"
              className="relative w-full sm:w-auto inline-flex items-center justify-center p-[1px] overflow-hidden text-sm font-bold text-white rounded-xl group bg-gradient-to-br from-neon-blue to-neon-purple shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <span className="relative w-full sm:w-auto px-8 py-4 transition-all ease-in duration-75 bg-slate-950 rounded-xl group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                Start Project
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>

            {/* Secondary Action (View Services) */}
            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[var(--card-border)] bg-slate-900/40 hover:bg-slate-900/80 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:border-neon-purple hover:text-neon-cyan flex items-center justify-center gap-2 backdrop-blur-md"
            >
              View Services
            </a>
          </motion.div>

          {/* Micro elements (Floating Icons) */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-10 mt-16 text-slate-500 text-xs tracking-wider uppercase font-orbitron select-none opacity-40"
          >
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>Full Web Scale</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span>Mobile Platforms</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Core Engineering</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Diagnostics HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-5 w-full flex justify-center items-center relative"
        >
          {/* Decorative glowing backdrops */}
          <div className="absolute inset-0 bg-neon-blue/5 rounded-2xl filter blur-3xl pointer-events-none -z-10" />

          {/* 3D Tilting Diagnostics Console Card */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full max-w-md rounded-2xl border border-[var(--card-border)] bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-5 backdrop-blur-xl transition-all duration-300 ease-out hover:border-neon-blue/40 shadow-2xl flex flex-col gap-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Custom Mouse Spotlight Shadow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none -z-10 blur-xl"
              style={{
                background: `radial-gradient(circle 200px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 240, 255, 0.15), transparent 80%)`,
              }}
            />

            {/* Window Topbar Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="text-[10px] uppercase tracking-widest font-orbitron font-semibold text-slate-400 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-ping'}`} />
                {isScanning ? "DIAGNOSTIC_RUNNING..." : "GAJVAKRA_CONSOLE.SH"}
              </div>
              <div className="text-[9px] font-mono text-neon-blue/80 bg-neon-blue/10 px-1.5 py-0.5 rounded border border-neon-blue/20">
                v3.2
              </div>
            </div>

            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50 flex flex-col gap-0.5">
                <span className="text-[8px] uppercase tracking-wider font-orbitron text-slate-500 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 text-neon-blue" />
                  Latency
                </span>
                <span className="text-xs font-mono font-bold text-white text-glow-blue">
                  {latency[latency.length - 1]} ms
                </span>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50 flex flex-col gap-0.5">
                <span className="text-[8px] uppercase tracking-wider font-orbitron text-slate-500 flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-neon-purple" />
                  Neural Core
                </span>
                <span className="text-xs font-mono font-bold text-white text-glow-purple">
                  {cpuLoad.toFixed(1)}%
                </span>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50 flex flex-col gap-0.5">
                <span className="text-[8px] uppercase tracking-wider font-orbitron text-slate-500 flex items-center gap-1">
                  <Wifi className="w-2.5 h-2.5 text-neon-cyan" />
                  Sync Rate
                </span>
                <span className="text-xs font-mono font-bold text-white text-glow-cyan">
                  {netSync.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Latency Real-Time SVG Graph */}
            <div className="relative bg-slate-950/60 rounded-lg p-2 border border-slate-800/80 overflow-hidden h-20">
              <div className="absolute top-1 right-2 text-[8px] font-mono text-slate-500 z-10 flex items-center gap-1 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue inline-block animate-pulse" />
                Live Node Ping
              </div>
              <svg viewBox="0 0 340 60" className="w-full h-full text-neon-blue">
                {/* Horizontal grid lines */}
                <line x1="0" y1="15" x2="340" y2="15" stroke="rgba(0, 240, 255, 0.05)" strokeDasharray="2,2" />
                <line x1="0" y1="30" x2="340" y2="30" stroke="rgba(0, 240, 255, 0.05)" strokeDasharray="2,2" />
                <line x1="0" y1="45" x2="340" y2="45" stroke="rgba(0, 240, 255, 0.05)" strokeDasharray="2,2" />
                
                {/* Area under curve */}
                <path
                  d={`M 0,60 L ${points} L 340,60 Z`}
                  fill="url(#latency-gradient-hero)"
                  opacity="0.12"
                  className="transition-all duration-300 ease-out"
                />
                
                {/* Path line */}
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  points={points}
                  className="transition-all duration-300 ease-out"
                />
                
                {/* Glowing cursor point at the end */}
                {latency.length > 0 && (
                  <circle
                    cx={340}
                    cy={60 - (latency[latency.length - 1] / 50) * 50}
                    r="3.5"
                    className="fill-neon-blue animate-ping"
                  />
                )}
                
                <defs>
                  <linearGradient id="latency-gradient-hero" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Stdout Console Terminal */}
            <div ref={terminalRef} className="flex flex-col gap-1 bg-slate-950/80 rounded-lg p-3 border border-slate-800/80 font-mono text-[9px] sm:text-[10px] h-32 overflow-y-auto scrollbar-thin select-none">
              {logs.map((log) => {
                let colorClass = "text-slate-300";
                let prefix = "[INFO]";
                if (log.type === "success") {
                  colorClass = "text-emerald-400";
                  prefix = "[SUCCESS]";
                } else if (log.type === "warning") {
                  colorClass = "text-amber-400";
                  prefix = "[WARN]";
                } else if (log.type === "error") {
                  colorClass = "text-red-400";
                  prefix = "[ERR]";
                }
                return (
                  <div key={log.id} className={`flex items-start gap-1 ${colorClass}`}>
                    <span className="text-slate-600 shrink-0">[{log.time}]</span>
                    <span className="font-bold shrink-0">{prefix}</span>
                    <span className="break-all">{log.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Diagnostics Bars (Load Metrics) */}
            <div className="flex flex-col gap-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
              <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono">
                <span className="text-slate-400 flex items-center gap-1 uppercase">
                  <Cpu className="w-3 h-3 text-neon-blue" /> Core computational engine
                </span>
                <span className="text-neon-cyan font-bold">{Math.round(cpuLoad)}% LOAD</span>
              </div>
              <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-300"
                  style={{ width: `${cpuLoad}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono mt-1">
                <span className="text-slate-400 flex items-center gap-1 uppercase">
                  <Terminal className="w-3 h-3 text-neon-purple" /> WebGL Thread Budget
                </span>
                <span className="text-neon-purple font-bold">
                  {hudMode === "overclock" ? "4.8ms" : isScanning ? "11.2ms" : "16.6ms"} / 60FPS
                </span>
              </div>
              <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full transition-all duration-300"
                  style={{ width: `${isScanning ? (cpuLoad + 12) % 100 : hudMode === "overclock" ? 92 : 42}%` }}
                />
              </div>
            </div>

            {/* Mode Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleModeChange("normal")}
                disabled={isScanning}
                className={`flex-1 py-1.5 px-2 rounded-lg font-orbitron text-[9px] font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                  isScanning ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  hudMode === "normal" && !isScanning
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/5"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                Stable
              </button>
              <button
                onClick={() => handleModeChange("overclock")}
                disabled={isScanning}
                className={`flex-1 py-1.5 px-2 rounded-lg font-orbitron text-[9px] font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                  isScanning ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  hudMode === "overclock" && !isScanning
                    ? "bg-red-500/10 border-red-500/40 text-red-400 shadow-md shadow-red-500/5 animate-pulse"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                Overclock
              </button>
              <button
                onClick={() => handleModeChange("diagnostics")}
                disabled={isScanning}
                className={`flex-1 py-1.5 px-2 rounded-lg font-orbitron text-[9px] font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer flex items-center justify-center gap-1 ${
                  isScanning
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-md shadow-amber-500/5"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    Scanning
                  </>
                ) : (
                  "Diagnose"
                )}
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Cyber overlay line */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}
