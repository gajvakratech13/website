"use client";

import { Mail, Phone, Zap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--card-border)] bg-slate-950/80 backdrop-blur-md pt-20 pb-10 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-purple/5 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-blue/5 blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <a href="#" className="flex items-center gap-2 select-none">
              <img
                src="/logo.png"
                alt="GajaVakraTech Logo"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed font-outfit">
              We design and construct premium cybernetic software, mobile applications, and immersive websites for startups and leading enterprises globally.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                  href: "#",
                },
                {
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                  href: "#",
                },
                {
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  href: "#",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--card-border)] bg-slate-900/50 text-slate-400 hover:text-neon-blue hover:border-neon-blue hover:scale-105 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron font-bold text-sm text-white tracking-widest uppercase mb-6">
              Solutions
            </h3>
            <div className="flex flex-col gap-3 font-outfit text-sm">
              {[
                { name: "App Development", href: "#services" },
                { name: "Website Development", href: "#services" },
                { name: "UI/UX Architecture", href: "#services" },
                { name: "Custom Enterprise", href: "#services" },
                { name: "E-commerce Architectures", href: "#services" },
              ].map((link, i) => (
                <a key={i} href={link.href} className="text-slate-400 hover:text-neon-blue transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-orbitron font-bold text-sm text-white tracking-widest uppercase mb-6">
              Connect
            </h3>
            <div className="flex flex-col gap-4 font-outfit text-sm text-slate-400">
              <a href="mailto:gajvakratech13@gmail.com" className="flex items-center gap-3 hover:text-neon-blue transition-colors">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-neon-blue">
                  <Mail className="w-4 h-4" />
                </div>
                <span>gajvakratech13@gmail.com</span>
              </a>
              <a href="tel:+917498995659" className="flex items-center gap-3 hover:text-neon-blue transition-colors">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-neon-blue">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 74989 95659</span>
              </a>
              <a href="tel:+919284055051" className="flex items-center gap-3 hover:text-neon-blue transition-colors">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-neon-blue">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 92840 55051</span>
              </a>
            </div>
          </div>
        </div>

        {/* Lower Banner */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-outfit text-xs text-slate-500">
          <div>
            &copy; {currentYear} GajvakraTech. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neon-blue transition-colors">Privacy Grid</a>
            <a href="#" className="hover:text-neon-blue transition-colors">System Protocols</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Operational Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
