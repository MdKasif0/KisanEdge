"use client";

import { Send, Bot, User, Mic, MapPin, CloudSun, Activity, Sprout, AlertTriangle, ShieldAlert, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/lib/store/user-store";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_SENSOR, DEMO_WEATHER, DEMO_DIAGNOSIS, getContextualResponse } from "@/lib/demo-state";

const SUGGESTIONS = [
  "Why are my tomato leaves turning yellow?",
  "Should I water my crop today?",
  "What could be causing these spots?",
  "How can I protect my plants after heavy rain?",
  "Why is my soil moisture low?"
];

export default function AssistantPage() {
  const { name, role, location, crops } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string | React.ReactNode}[]>([
    {
      role: 'ai',
      text: `Hello ${name}! I'm KisanEdge AI, your plant health assistant. I can see you're growing in ${location} — it's currently ${DEMO_WEATHER.temp}°C and ${DEMO_WEATHER.condition}. Your soil moisture is at ${DEMO_SENSOR.soilMoisture}%. How can I help you today?`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput("");
    setIsTyping(true);

    const response = getContextualResponse(text);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    }, response.delay);
  };

  const cropDisplay = crops.length > 0 ? crops.slice(0, 2).join(", ") : "Tomato, Wheat";
  const hasRecentDiagnosis = true; // Demo mode

  return (
    <div className="flex flex-col h-full bg-[#f8faf9] relative pb-24">
      {/* Header */}
      <div className="pt-safe pt-3 px-4 pb-3 bg-white sticky top-0 z-20 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 h-[42px]">
          <img src="/icon-512x512.png" alt="KisanEdge AI" className="w-[42px] h-[42px] rounded-[14px] object-cover shadow-sm" />
          <div className="flex flex-col justify-center">
            <h1 className="text-[20px] font-bold text-[#14532D] leading-tight tracking-tight flex items-center gap-1.5">
              KisanEdge AI <Sparkles className="w-4 h-4 text-[#16A34A]" />
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5 font-medium tracking-tight">Your plant health assistant</p>
          </div>
        </div>
        
        {/* Context Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mt-3 pb-1">
          <ContextPill icon={MapPin} text={location} color="blue" />
          <ContextPill icon={CloudSun} text={`${DEMO_WEATHER.temp}° ${DEMO_WEATHER.condition}`} color="amber" />
          <ContextPill icon={Sprout} text={cropDisplay} color="emerald" />
          <ContextPill icon={Activity} text={`Moisture: ${DEMO_SENSOR.soilMoisture}%`} color="indigo" />
          {hasRecentDiagnosis && (
            <ContextPill icon={ShieldAlert} text="Early Blight detected" color="red" />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-5 p-4 pb-32">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}
            >
              {msg.role === 'ai' ? (
                <div className="w-8 h-8 bg-gradient-to-br from-[#16a34a] to-[#14532D] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
              )}
              <div className={`p-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                msg.role === 'ai' 
                  ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' 
                  : 'bg-[#16a34a] text-white rounded-tr-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5 max-w-[88%]">
              <div className="w-8 h-8 bg-gradient-to-br from-[#16a34a] to-[#14532D] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-1.5 shadow-sm h-11">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[80px] sm:bottom-[88px] left-0 right-0 bg-gradient-to-t from-[#f8faf9] via-[#f8faf9] to-transparent pt-6 pb-2 px-4 z-30 pointer-events-none">
        
        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 pointer-events-auto">
            {SUGGESTIONS.map((s, i) => (
              <button 
                key={i}
                onClick={() => handleSend(s)}
                className="shrink-0 bg-white border border-gray-200 text-[#14532D] text-[13px] font-medium px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 active:scale-95 transition-transform"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 items-end pointer-events-auto max-w-[500px] mx-auto">
          <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-1.5 flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus-within:border-[#16a34a] focus-within:ring-2 focus-within:ring-[#16a34a]/20 transition-all">
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-[#16a34a] hover:bg-[#16a34a]/10 transition-colors shrink-0 haptic-press">
              <Mic className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask KisanEdge AI..."
              className="flex-1 bg-transparent border-transparent px-3 py-2 text-[15px] focus:outline-none placeholder:text-gray-400"
            />
            {input.trim() && (
              <button 
                onClick={() => handleSend(input)}
                className="w-10 h-10 rounded-full bg-[#16a34a] flex items-center justify-center text-white shadow-sm hover:bg-[#15803d] shrink-0 haptic-press"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextPill({ icon: Icon, text, color }: { icon: any, text: string, color: string }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
    red: "bg-red-50 text-red-700 border-red-100"
  };
  
  return (
    <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${colorMap[color]} text-[11px] font-semibold whitespace-nowrap`}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </div>
  );
}
