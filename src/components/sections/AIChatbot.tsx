"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  sender: "ai" | "user";
  text: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Sync complete. I am GajvakraAI. Select a query option or input project parameters to synchronize with our system coordinator.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "What services do you offer?",
    "How do I start a project?",
    "What is your tech stack?",
  ];

  const presetAnswers: Record<string, string> = {
    "What services do you offer?":
      "GajvakraTech offers Mobile App Development, Native Android Development, High-Performance Website Development (Next.js), UI/UX Design, custom backend databases, and robust E-commerce platforms.",
    "How do I start a project?":
      "You can start a project by filling out the Contact Form at the bottom of the page, clicking 'Start Project' to trigger our telemetry port, or sending a direct message via WhatsApp.",
    "What is your tech stack?":
      "Our core engineering stack includes React, Next.js, Node.js, Flutter, Firebase, MongoDB, and Python for automated workflows and data/AI modeling.",
  };

  // Scroll to bottom of chat container when messages or typing state changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "Understood. Parameter logged. Our core engineers will review your request.";
      const cleanText = text.trim();
      
      if (presetAnswers[cleanText]) {
        response = presetAnswers[cleanText];
      }

      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-outfit">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center relative cursor-pointer group bg-gradient-to-tr from-neon-blue to-neon-purple shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
        aria-label="Toggle AI Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple blur-md opacity-45 -z-10 group-hover:opacity-85 transition-opacity" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-neon-cyan animate-pulse border-2 border-slate-950" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[320px] sm:w-[360px] h-[450px] rounded-2xl border border-[var(--card-border)] bg-slate-950/90 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-900 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center text-white">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1">
                  <span>GajvakraAI</span>
                  <Sparkles className="w-3.5 h-3.5 text-neon-blue animate-pulse" />
                </h3>
                <span className="text-[9px] text-neon-cyan font-mono tracking-widest uppercase">
                  ONLINE // TELEMETRY SYNC
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Conversation history area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border text-xs select-none ${
                    msg.sender === "user"
                      ? "border-neon-purple bg-neon-purple/10 text-white"
                      : "border-slate-800 bg-slate-900 text-neon-blue"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-neon-purple/20 to-slate-950 text-slate-200 border border-neon-purple/20 rounded-tr-none"
                      : "bg-slate-900/50 text-slate-300 border border-slate-900 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 mr-auto max-w-[85%]">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border border-slate-800 bg-slate-900 text-neon-blue">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-xl bg-slate-900/50 text-slate-500 border border-slate-900 rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick preset questions */}
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {presetQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
                className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 rounded-full px-2.5 py-1 text-left hover:text-neon-blue hover:border-neon-blue hover:bg-slate-900/60 transition-colors cursor-pointer select-none"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <div className="p-4 border-t border-slate-900 bg-slate-950/60 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
              placeholder="Query parameters..."
              disabled={isTyping}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-neon-blue/60 focus:bg-slate-950 transition-colors"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={isTyping || !inputText.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
