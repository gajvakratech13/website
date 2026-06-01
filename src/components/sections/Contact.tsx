"use client";

import React, { useState } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Shield } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "Website Development",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const mailtoFallback = () => {
      const subject = encodeURIComponent(`Project Inquiry: ${formState.service}`);
      const body = encodeURIComponent(
        `Hi GajvakraTech Team,\n\nI would like to discuss a project with you.\n\nProject Details:\n- Name: ${formState.name}\n- Email: ${formState.email}\n- Target Service: ${formState.service}\n- Description:\n${formState.message}\n\nRegards,\n${formState.name}`
      );
      window.location.href = `mailto:gajvakratech13@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setFormState({ name: "", email: "", service: "Website Development", message: "" });
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          service: formState.service,
          message: formState.message,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("success");
        setFormState({ name: "", email: "", service: "Website Development", message: "" });
      } else {
        console.warn("SMTP API submission failed. Falling back to mailto client.", data.error || data);
        mailtoFallback();
      }
    } catch (err) {
      console.error("Error submitting to API route. Falling back to mailto client.", err);
      mailtoFallback();
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = "917498995659";
    const text = encodeURIComponent(
      "Hello GajvakraTech Team, I would like to discuss a custom development project."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-blue/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-purple/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Grid telemetry info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="font-orbitron text-xs font-bold text-neon-blue tracking-widest uppercase flex items-center gap-2 select-none">
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              <span>// SYSTEM COMMUNICATIONS PORTAL</span>
            </span>
            <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl text-white leading-tight">
              Initialize Your <br />
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Project Matrix
              </span>
            </h2>
            <p className="text-slate-400 font-outfit text-base md:text-lg leading-relaxed">
              Have an application or web architecture to build? Submit your telemetry parameters below, or establish direct synchronization with our engineering core via WhatsApp.
            </p>

            <div className="flex flex-col gap-6 mt-8">
              {/* WhatsApp direct sync */}
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 font-orbitron font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-emerald-500/10 cursor-pointer select-none"
              >
                <MessageSquare className="w-5 h-5 fill-emerald-500/20 text-emerald-400" />
                <span>Instant WhatsApp Sync</span>
              </button>

              <div className="flex flex-col gap-4 pt-6 border-t border-slate-900 font-outfit text-sm text-slate-400">
                <a href="mailto:gajvakratech13@gmail.com" className="flex items-center gap-3 hover:text-neon-blue transition-colors">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-neon-blue">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>gajvakratech13@gmail.com</span>
                </a>
                <a href="tel:+917498995659" className="flex items-center gap-3 hover:text-neon-blue transition-colors">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-neon-blue">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+91 74989 95659</span>
                </a>
                <a href="tel:+919284055051" className="flex items-center gap-3 hover:text-neon-blue transition-colors">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-neon-blue">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+91 92840 55051</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Form */}
          <div className="lg:col-span-7 w-full">
            <div className="glass-panel p-8 sm:p-10 border-slate-900 bg-slate-950/50 backdrop-blur-lg">
              
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-neon-blue/10 border border-neon-blue flex items-center justify-center text-neon-blue mb-6 animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl text-white mb-2 uppercase tracking-wide">
                    Transmission Complete
                  </h3>
                  <p className="text-slate-400 font-outfit text-sm max-w-sm mb-6 leading-relaxed">
                    Form packet decrypted and synced with GajvakraTech's databases. Our operational coordinators will contact you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 rounded-lg border border-[var(--card-border)] bg-slate-900 text-slate-300 font-orbitron font-bold text-xs uppercase tracking-widest hover:text-white hover:border-neon-blue transition-colors"
                  >
                    Resend Parameters
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest">
                      Sender Name //
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      disabled={status === "sending"}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:border-neon-blue/60 focus:bg-slate-950 transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest">
                      Secure Email Address //
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. name@server.com"
                      disabled={status === "sending"}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:border-neon-blue/60 focus:bg-slate-950 transition-colors"
                    />
                  </div>

                  {/* Dropdown service choice */}
                  <div className="flex flex-col gap-2">
                    <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest">
                      Target Solution Matrix //
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      disabled={status === "sending"}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:border-neon-blue/60 focus:bg-slate-950 transition-colors"
                    >
                      <option className="bg-slate-950 text-white">Mobile App Development</option>
                      <option className="bg-slate-950 text-white">Android App Development</option>
                      <option className="bg-slate-950 text-white">Website Development</option>
                      <option className="bg-slate-950 text-white">UI/UX Design</option>
                      <option className="bg-slate-950 text-white">Custom Software Solutions</option>
                      <option className="bg-slate-950 text-white">E-commerce Development</option>
                    </select>
                  </div>

                  {/* Description field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest">
                      Project Telemetry Description //
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Detail your requirements, project scope, and timelines..."
                      disabled={status === "sending"}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:border-neon-blue/60 focus:bg-slate-950 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative inline-flex items-center justify-center p-0.5 mt-2 overflow-hidden text-sm font-bold text-white rounded-xl group bg-gradient-to-br from-neon-blue to-neon-purple shadow-lg hover:shadow-cyan-500/10 cursor-pointer select-none"
                  >
                    <span className="relative w-full px-8 py-4 transition-all ease-in duration-75 bg-slate-950 rounded-xl group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                      {status === "sending" ? (
                        <>
                          <span className="w-4 h-4 rounded-full border border-t-neon-blue border-r-transparent animate-spin mr-2" />
                          <span>ENCRYPTING DEPLOYMENT PACKETS...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Parameters</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Cyber disclaimer */}
                  <div className="flex items-center gap-2 justify-center text-[9px] text-slate-600 font-mono select-none">
                    <Shield className="w-3.5 h-3.5" />
                    <span>256-BIT SECURE END-TO-END DEPLOYMENT SYNCED</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
