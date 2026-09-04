"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/lib/store/user-store";
import { 
  ArrowLeft, Droplet, Thermometer, Wind, CloudSun, 
  Wifi, Cpu, Search, Activity, Sprout, AlertTriangle, 
  CloudRain, ShieldAlert, Waves, Flame, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ConnectionState = "disconnected" | "scanning" | "connected";

const FORECAST = [
  { day: "Mon", temp: 32, icon: CloudSun, prob: 10 },
  { day: "Tue", temp: 34, icon: Sun, prob: 0 },
  { day: "Wed", temp: 33, icon: CloudSun, prob: 20 },
  { day: "Thu", temp: 28, icon: CloudRain, prob: 80 },
  { day: "Fri", temp: 27, icon: CloudRain, prob: 60 },
  { day: "Sat", temp: 29, icon: CloudSun, prob: 30 },
  { day: "Sun", temp: 31, icon: Sun, prob: 10 },
];

function Sun(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export default function EnvironmentPage() {
  const { role } = useUser();
  const [connState, setConnState] = useState<ConnectionState>("disconnected");
  
  const isFarmer = role === "farmer";
  
  const handleConnect = () => {
    setConnState("scanning");
    setTimeout(() => {
      setConnState("connected");
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8FAF9]">
      {/* Botanical Background SVG */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50,100 C50,100 0,60 0,30 C0,13.431 13.431,0 30,0 C38.284,0 45.784,3.358 50,8.783 C54.216,3.358 61.716,0 70,0 C86.569,0 100,13.431 100,30 C100,60 50,100 50,100 Z\' fill=\'%2316A34A\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: '100%' }} />

      <div className="flex flex-col relative z-10 w-full max-w-md mx-auto pb-24">
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#F8FAF9]/90 backdrop-blur-md px-5 pt-safe pb-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#16A34A] rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <h1 className="text-[20px] font-bold text-[#14532D] tracking-tight">
              {isFarmer ? "Field Sensor" : "Plant Environment"}
            </h1>
          </div>
          <div className={cn(
            "w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]",
            connState === "connected" ? "bg-[#16A34A] shadow-[#16A34A]/50" : "bg-gray-400"
          )} />
        </header>

        <motion.div 
          className="p-5 flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* HARDWARE CONNECTION CARD */}
          <motion.div variants={itemVariants} className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E7EB] relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-[16px] border border-gray-100 flex items-center justify-center relative shadow-inner">
                  <Cpu className="w-6 h-6 text-[#14532D]" />
                  {connState === "connected" && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#16A34A] border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-[#14532D] text-[16px]">KisanEdge Node</h3>
                  <p className="text-[#64748b] text-[13px] font-medium">
                    {connState === "disconnected" && "Not connected"}
                    {connState === "scanning" && "Scanning..."}
                    {connState === "connected" && "Connected • 92% Battery"}
                  </p>
                </div>
              </div>
              {connState === "connected" && (
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-[#94A3B8] font-bold uppercase tracking-wider">Sync</span>
                  <span className="text-[#16A34A] text-[13px] font-bold">2m ago</span>
                </div>
              )}
            </div>

            {connState === "disconnected" && (
              <Button onClick={handleConnect} className="w-full bg-[#14532D] hover:bg-[#16A34A] text-white rounded-[14px] h-11 font-semibold transition-all">
                <Wifi className="w-4 h-4 mr-2" /> Connect Sensor
              </Button>
            )}

            {connState === "scanning" && (
              <div className="h-11 flex items-center justify-center gap-2 bg-[#F0FDF4] rounded-[14px] text-[#16A34A] font-semibold">
                <Search className="w-4 h-4 animate-pulse" /> Scanning for devices...
              </div>
            )}
          </motion.div>

          {/* SENSOR DATA GRID */}
          <AnimatePresence>
            {connState === "connected" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex flex-col gap-6"
              >
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Soil Moisture */}
                  <div className="bg-white p-4 rounded-[20px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden group hover:border-[#16A34A]/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
                    <div className="flex items-center gap-2 mb-3 mt-1">
                      <Droplet className="w-5 h-5 text-blue-500" />
                      <span className="text-[13px] font-semibold text-[#64748b]">{isFarmer ? "Soil Moisture" : "Pot Moisture"}</span>
                    </div>
                    <span className="text-[32px] font-bold text-[#14532D] tracking-tight leading-none mb-1">31<span className="text-[16px] text-[#94A3B8]">%</span></span>
                    <span className="text-[12px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md inline-block w-max mt-1">Attention</span>
                  </div>

                  {/* Soil Temp */}
                  <div className="bg-white p-4 rounded-[20px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden group hover:border-[#16A34A]/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#16A34A]" />
                    <div className="flex items-center gap-2 mb-3 mt-1">
                      <Thermometer className="w-5 h-5 text-orange-500" />
                      <span className="text-[13px] font-semibold text-[#64748b]">Soil Temp</span>
                    </div>
                    <span className="text-[32px] font-bold text-[#14532D] tracking-tight leading-none mb-1">28<span className="text-[16px] text-[#94A3B8]">°</span></span>
                    <span className="text-[12px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-md inline-block w-max mt-1">Good</span>
                  </div>

                  {/* Air Temp */}
                  <div className="bg-white p-4 rounded-[20px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden group hover:border-[#16A34A]/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
                    <div className="flex items-center gap-2 mb-3 mt-1">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span className="text-[13px] font-semibold text-[#64748b]">Air Temp</span>
                    </div>
                    <span className="text-[32px] font-bold text-[#14532D] tracking-tight leading-none mb-1">33<span className="text-[16px] text-[#94A3B8]">°</span></span>
                    <span className="text-[12px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md inline-block w-max mt-1">Monitor</span>
                  </div>

                  {/* Humidity */}
                  <div className="bg-white p-4 rounded-[20px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden group hover:border-[#16A34A]/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#16A34A]" />
                    <div className="flex items-center gap-2 mb-3 mt-1">
                      <CloudSun className="w-5 h-5 text-gray-400" />
                      <span className="text-[13px] font-semibold text-[#64748b]">Humidity</span>
                    </div>
                    <span className="text-[32px] font-bold text-[#14532D] tracking-tight leading-none mb-1">76<span className="text-[16px] text-[#94A3B8]">%</span></span>
                    <span className="text-[12px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-md inline-block w-max mt-1">Good</span>
                  </div>
                </div>

                {/* SMART IRRIGATION ENGINE */}
                <div className="bg-gradient-to-br from-[#14532D] to-[#0e3b1c] rounded-[24px] p-5 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                  
                  <div className="flex items-center gap-2 text-white/80 font-semibold text-[14px] mb-3">
                    <Sparkles className="w-4 h-4 text-amber-300" /> AI Irrigation Status
                  </div>
                  
                  <h3 className="text-[28px] font-bold leading-tight mb-2">Irrigate Now</h3>
                  <p className="text-[13px] text-white/70 leading-relaxed font-medium">
                    Low soil moisture (31%) + high air temperature (33°C) + no significant rainfall expected today.
                  </p>
                  
                  <div className="mt-5 flex gap-3">
                    <Button className="bg-white text-[#14532D] hover:bg-gray-100 rounded-[12px] font-bold shadow-sm h-10 flex-1">
                      {isFarmer ? "Start Pump" : "Water Now"}
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-[12px] font-bold h-10 flex-1">
                      Remind me
                    </Button>
                  </div>
                </div>

                {/* WEATHER FORECAST */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E7EB]">
                  <h3 className="text-[18px] font-bold text-[#14532D] mb-4">7-Day Forecast</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar">
                    {FORECAST.map((day, idx) => (
                      <div key={idx} className="flex flex-col items-center min-w-[56px] shrink-0">
                        <span className="text-[13px] font-semibold text-[#64748b] mb-2">{day.day}</span>
                        <day.icon className={cn("w-6 h-6 mb-2", day.temp > 30 ? "text-yellow-500" : "text-gray-400")} />
                        <span className="text-[15px] font-bold text-[#14532D] mb-1">{day.temp}°</span>
                        <span className="text-[10px] font-bold text-blue-500 flex items-center gap-0.5">
                          <CloudRain className="w-3 h-3" /> {day.prob}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI RISK ENGINE */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[20px] font-bold text-[#14532D] flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-[#ef4444]" /> Risk Engine
                    </h2>
                  </div>

                  {/* Engine Diagram */}
                  <div className="bg-[#F0FDF4] rounded-[16px] p-4 mb-4 border border-[#16A34A]/20 flex items-center justify-between text-[11px] font-bold text-[#14532D] uppercase tracking-wider text-center">
                    <div className="flex flex-col gap-1 items-center">
                      <Cpu className="w-4 h-4 text-[#16A34A]" /> Data
                    </div>
                    <div className="w-4 h-px bg-[#16A34A]/30" />
                    <div className="flex flex-col gap-1 items-center">
                      <Sparkles className="w-4 h-4 text-amber-500" /> AI Model
                    </div>
                    <div className="w-4 h-px bg-[#16A34A]/30" />
                    <div className="flex flex-col gap-1 items-center">
                      <ShieldAlert className="w-4 h-4 text-[#ef4444]" /> Alert
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-medium text-[#64748b]">Disease Risk</span>
                        <span className="text-[14px] font-bold text-red-500">HIGH</span>
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                        <Sprout className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-medium text-[#64748b]">Water Stress</span>
                        <span className="text-[14px] font-bold text-amber-500">MODERATE</span>
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <Waves className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-medium text-[#64748b]">Flood Risk</span>
                        <span className="text-[14px] font-bold text-blue-500">LOW</span>
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <Flame className="w-5 h-5 text-orange-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-medium text-[#64748b]">Heat Stress</span>
                        <span className="text-[14px] font-bold text-orange-500">MODERATE</span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
