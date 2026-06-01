"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/3d/ParticleBackground";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Technologies from "@/components/sections/Technologies";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import AIChatbot from "@/components/sections/AIChatbot";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading Telemetry screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main futuristic landing site */}
      {!isLoading && (
        <div className="relative min-h-screen flex flex-col overflow-hidden animate-in fade-in duration-1000">
          
          {/* Custom Interactive Follower Cursor */}
          <CustomCursor />

          {/* Canvas particle system behind all page sections */}
          <ParticleBackground />

          {/* Glowing Translucent Navigation */}
          <Navbar />

          <main className="flex-grow">
            {/* Hero (contains FloatingShapes 3D background) */}
            <Hero />
            
            {/* Services (contains GlobeScene 3D globe) */}
            <Services />
            
            {/* Technologies Grid */}
            <Technologies />
            
            {/* About (Company Details & Counters) */}
            <About />
            
            {/* Contact Forms & WhatsApp Sync */}
            <Contact />
          </main>

          {/* Operational Footer */}
          <Footer />

          {/* Hovering AI Assistant Chatbot */}
          <AIChatbot />
        </div>
      )}
    </>
  );
}
