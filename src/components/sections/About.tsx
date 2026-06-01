"use client";

import { Zap, Globe } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/5 blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6">
          
          <span className="font-orbitron text-xs font-bold text-neon-purple tracking-widest uppercase flex items-center gap-2 select-none">
            <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
            <span>// SYSTEM CORE INFO</span>
          </span>
          
          <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-white leading-tight">
            Transforming Ideas Into <br />
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              High-Fidelity Code
            </span>
          </h2>
          
          <p className="text-slate-400 font-outfit text-base md:text-lg leading-relaxed max-w-2xl">
            At GajvakraTech, we believe that software should be beautiful, scalable, and secure. We operate on a digital transformation paradigm that combines high-end visual design with rigorous backend engineering.
          </p>
          
          <p className="text-slate-400 font-outfit text-sm md:text-base leading-relaxed max-w-2xl">
            Whether building an Android application from scratch, scaling an e-commerce grid, or designing a high-performance custom SaaS interface, we deliver premium performance and visual beauty.
          </p>

          {/* Micro value items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 w-full max-w-xl text-left">
            {[
              { 
                icon: <Zap className="w-5 h-5 text-neon-blue" />, 
                name: "High Velocity", 
                text: "Optimized execution loops." 
              },
              { 
                icon: <Globe className="w-5 h-5 text-neon-cyan" />, 
                name: "Edge Deployed", 
                text: "Global multi-cluster scale." 
              },
            ].map((val, i) => (
              <div 
                key={i} 
                className="flex gap-4 p-4 rounded-xl border border-slate-900/60 bg-slate-950/20 backdrop-blur-sm hover:border-neon-purple/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {val.icon}
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
                    {val.name}
                  </h4>
                  <p className="text-slate-500 font-outfit text-xs mt-1">
                    {val.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
