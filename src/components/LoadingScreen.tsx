"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFading, setIsFading] = useState(false);

  const logsList = [
    "BOOTING SYSTEM PLATFORM...",
    "ESTABLISHING SECURE CONNECTION SHELL...",
    "FETCHING WEBPACK COMPILE MAPS...",
    "MOUNTING CYBERNETIC GRID CANVAS...",
    "INITIALIZING WEBGL 3D VERTEX MATRIX...",
    "RENDERING ROTATING GEOMETRIC NODE CLOUDS...",
    "SYNCHRONIZING AUDIOLESS CINEMATIC PARADIGMS...",
    "DECRYPTING UI STYLING PARSING PROTOCOLS...",
    "ESTABLISHING CHATBOT COMMUNICATIONS BRIDGE...",
    "TELEMETRY CAPTURED: SUCCESS",
  ];

  useEffect(() => {
    // Add logs dynamically as counter increments
    let logIdx = 0;
    const addLogInterval = setInterval(() => {
      if (logIdx < logsList.length) {
        setLogs((prev) => [...prev, logsList[logIdx]]);
        logIdx++;
      } else {
        clearInterval(addLogInterval);
      }
    }, 180);

    // Count from 0 to 100
    const duration = 1800; // 1.8 seconds
    const intervalTime = 18;
    const increment = 100 / (duration / intervalTime);
    
    const countInterval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(countInterval);
          // Trigger fade out
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete();
            }, 600); // Wait for transition
          }, 300);
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => {
      clearInterval(addLogInterval);
      clearInterval(countInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020208] text-white px-6 transition-all duration-700 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Cyber Grid pattern */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      {/* Center content box */}
      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        
        {/* Glowing Logo Icon */}
        <div className="relative mb-8 animate-pulse">
          <img
            src="/logo.png"
            alt="GajaVakraTech Logo"
            className="w-28 h-auto object-contain"
          />
          <div className="absolute inset-0 bg-neon-blue/15 blur-xl rounded-full -z-10" />
        </div>

        {/* Counter Percent */}
        <div className="font-orbitron font-extrabold text-5xl md:text-6xl text-white mb-6 text-glow-blue select-none">
          {percent}%
        </div>

        {/* Cyber telemetry bar */}
        <div className="w-full h-[3px] bg-slate-900 border border-slate-800 rounded-full mb-8 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Log feed */}
        <div className="w-full h-[140px] rounded-xl border border-slate-900 bg-slate-950/40 p-4 font-mono text-[9px] text-slate-500 overflow-y-auto flex flex-col gap-1.5 scrollbar-none select-none">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2 items-start animate-fade-in">
              <span className="text-neon-cyan">[SYS]</span>
              <span className={i === logs.length - 1 ? "text-slate-300 font-semibold" : "text-slate-500"}>
                {log}
              </span>
            </div>
          ))}
        </div>

        <span className="font-orbitron text-[10px] text-slate-600 uppercase tracking-widest mt-8">
          GAJVAKRATECH CORE INFRASTRUCTURE V4.2
        </span>

      </div>
    </div>
  );
}
