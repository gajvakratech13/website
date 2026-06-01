"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Zap } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Detect scroll to adjust styling
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize theme from system preference or default
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme === "light") {
      setTheme("light");
      root.classList.add("light-theme");
    } else {
      setTheme("dark");
      root.classList.remove("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme === "dark") {
      setTheme("light");
      root.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      root.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Technologies", href: "#technologies" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/40 backdrop-blur-md border-b border-[var(--card-border)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Futuristic Glowing Logo */}
        <a href="#" className="flex items-center gap-2 group select-none">
          <img
            src="/logo.png"
            alt="GajaVakraTech Logo"
            className="h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 py-2 group font-outfit"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-350 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-[var(--card-border)] bg-slate-900/40 text-slate-300 hover:text-neon-blue hover:border-neon-blue transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Glowing CTA Button */}
          <a
            href="#contact"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-white rounded-xl group bg-gradient-to-br from-neon-blue to-neon-purple group-hover:from-neon-blue group-hover:to-neon-purple hover:text-white focus:ring-2 focus:outline-none focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-950 rounded-xl group-hover:bg-opacity-0">
              Start Project
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple blur-md opacity-30 group-hover:opacity-75 -z-10 transition-opacity" />
          </a>
        </div>

        {/* Mobile menu toggle & Theme switcher */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-[var(--card-border)] bg-slate-900/40 text-slate-300"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl border border-[var(--card-border)] bg-slate-900/40 text-slate-300 hover:text-white hover:border-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-0 top-[72px] bottom-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-[var(--card-border)] transition-transform duration-300 md:hidden flex flex-col justify-between p-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 pt-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-slate-300 hover:text-neon-blue border-b border-slate-900 pb-3"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="pb-12">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-bold text-white block shadow-lg hover:shadow-cyan-500/20 transition-shadow"
          >
            Start Project
          </a>
        </div>
      </div>
    </nav>
  );
}
