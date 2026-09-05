"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, AlertTriangle, ScanLine, Sprout, CloudSun, Droplet,
  MapPin, Bell, Sun, Thermometer, Wind, Leaf, Sparkles, Activity, Check,
  CloudRain, ChevronRight, Users
} from "lucide-react";
import { useUser } from "@/lib/store/user-store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FORECAST_DATA = [
  { day: "Mon", temp: 28, icon: "sun" },
  { day: "Tue", temp: 29, icon: "cloud-sun" },
  { day: "Wed", temp: 24, icon: "cloud-rain" },
  { day: "Thu", temp: 26, icon: "cloud-sun" },
  { day: "Fri", temp: 27, icon: "sun" },
];

export function FarmerDashboard() {
  const { name, location, role } = useUser();
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const isFarmer = role !== "home";
  const displayName = name || "Kasif";
  const displayLocation = location || "Pune, MH";

  // Framer Motion container variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 320, damping: 26 } 
    }
  };

  return (
    <div className="flex flex-col relative w-full overflow-x-hidden bg-[#F8FAF9] min-h-[100dvh]">
      {/* Top Farm Sunrise Landscape Background (behind header & greeting) */}
      <div 
        className="absolute top-0 right-0 left-0 h-[300px] pointer-events-none overflow-hidden z-0"
      >
        <div 
          className="absolute -top-4 -right-12 w-[380px] sm:w-[440px] h-[300px] bg-cover bg-center pointer-events-none opacity-45"
          style={{ 
            backgroundImage: 'url("/farm-landscape.png")',
            maskImage: 'radial-gradient(ellipse at 75% 35%, black 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 75% 35%, black 25%, transparent 75%)'
          }} 
        />
      </div>

      <div className="flex flex-col relative z-10 w-full max-w-md mx-auto pb-32">
        
        {/* Sticky Top Header */}
        <header 
          className="sticky top-0 z-40 bg-[#F8FAF9]/90 backdrop-blur-md px-4 sm:px-5 pb-3 border-b border-gray-100/80 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          style={{ paddingTop: 'calc(var(--safe-top, 0px) + 20px)' }}
        >
          <div className="flex items-center gap-3">
            <img 
              src="/icon-512x512.png" 
              alt="KisanEdge" 
              className="w-[42px] h-[42px] rounded-[14px] object-cover shadow-sm border border-black/5" 
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-[22px] font-bold text-[#14532D] leading-none tracking-tight">
                KisanEdge
              </h1>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="text-[13px] text-[#64748b] font-medium">{displayLocation}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/alerts">
              <button 
                aria-label="View alerts"
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-[#14532D]" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#F8FAF9]" />
              </button>
            </Link>
            <Link href="/profile">
              <div 
                aria-label="Open profile"
                className="w-10 h-10 rounded-full bg-[#DCFCE7] border border-[#16A34A]/30 flex items-center justify-center cursor-pointer shadow-sm hover:ring-2 hover:ring-[#16A34A]/20 transition-all"
              >
                <span className="text-[#14532D] font-bold text-base">K</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="px-4 sm:px-5 flex flex-col gap-6 mt-3"
        >
          {/* Greeting Section */}
          <motion.div variants={item} className="pt-1 relative z-10">
            <h2 className="text-[26px] sm:text-[28px] font-bold text-[#14532D] tracking-tight leading-tight">
              {greeting}, {displayName}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#64748B] font-normal mt-1">
              {isFarmer ? "Here is your farm overview today." : "Here is your plant overview today."}
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={item} className="flex gap-2.5 overflow-x-auto hide-scrollbar -mx-1 px-1 relative z-10">
            {/* Primary Action: Scan Crop */}
            <Link href="/scan" className="shrink-0 min-w-[175px]">
              <div className="bg-[#16A34A] hover:bg-[#15803D] text-white rounded-[20px] p-3.5 flex items-center justify-between shadow-[0_4px_14px_rgba(22,163,74,0.3)] transition-transform active:scale-[0.98]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <ScanLine className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[15px] leading-tight whitespace-nowrap">Scan Crop</span>
                    <span className="text-[11px] text-white/85 font-medium mt-0.5 truncate max-w-[95px]">Identify health</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-1">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
            </Link>

            {/* Secondary Action: Alerts */}
            <Link href="/alerts" className="shrink-0 min-w-[130px]">
              <div className="bg-white hover:bg-gray-50/80 border border-[#E5E7EB] rounded-[20px] p-3.5 flex items-center justify-between shadow-sm transition-transform active:scale-[0.98]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[14px] text-[#14532D]">Alerts</span>
                    <span className="text-[11px] text-[#EF4444] bg-red-50 px-1.5 py-0.2 rounded font-semibold w-fit">3 new</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </div>
            </Link>

            {/* Tertiary Action: My Farm */}
            <Link href={isFarmer ? "/farm" : "/plants"} className="shrink-0 min-w-[135px]">
              <div className="bg-white hover:bg-gray-50/80 border border-[#E5E7EB] rounded-[20px] p-3.5 flex items-center justify-between shadow-sm transition-transform active:scale-[0.98]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
                    <Sprout className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[14px] text-[#14532D]">{isFarmer ? "My Farm" : "My Plants"}</span>
                    <span className="text-[11px] text-[#64748B] font-medium">Manage crops</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </div>
            </Link>
          </motion.div>

          {/* Weather Intelligence Hero Card */}
          <motion.div 
            variants={item} 
            className="w-full rounded-[26px] bg-gradient-to-br from-[#16A34A] via-[#15803D] to-[#14532D] shadow-[0_12px_28px_rgba(20,83,45,0.22)] p-5 text-white relative overflow-hidden"
          >
            {/* Provided Farm Landscape positioned on the right half of the card */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-[65%] pointer-events-none bg-cover bg-center sm:bg-right-center z-0"
              style={{ 
                backgroundImage: 'url("/farm-landscape.png")',
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 50%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 50%)',
                opacity: 0.9
              }} 
            />

            {/* Subtle gradient overlay at bottom for maximum contrast on metrics & forecast */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#14532D]/90 via-[#14532D]/35 to-transparent pointer-events-none z-0"
            />

            <div className="relative z-10">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <CloudSun className="w-5 h-5 text-amber-300" />
                  <span className="text-[15px] font-semibold text-white tracking-tight drop-shadow-sm">Weather Intelligence</span>
                </div>
                <Link href="/environment">
                  <div className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20 shadow-sm">
                    <span className="text-[12px] font-semibold text-white">View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </div>

              {/* Temp & Condition */}
              <div className="flex flex-col gap-1 my-2">
                <span className="text-[44px] font-extrabold leading-none tracking-tight text-white drop-shadow-md">
                  28°C
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[18px] font-semibold text-white drop-shadow-sm">Sunny</span>
                  <div className="flex items-center gap-1 bg-white/25 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[12px] font-semibold border border-white/20 shadow-sm">
                    <Leaf className="w-3 h-3 text-[#DCFCE7]" />
                    <span>Good for farming</span>
                  </div>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-3 bg-black/25 rounded-[18px] p-3 mt-4 backdrop-blur-md border border-white/15 divide-x divide-white/15 shadow-inner">
                <div className="flex items-center justify-center gap-2.5 px-2">
                  <Droplet className="w-5 h-5 text-blue-200 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">65%</span>
                    <span className="text-[11px] text-white/85 font-medium">Humidity</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2.5 px-2">
                  <CloudRain className="w-5 h-5 text-blue-200 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">10%</span>
                    <span className="text-[11px] text-white/85 font-medium">Rain Prob.</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2.5 px-2">
                  <Wind className="w-5 h-5 text-emerald-200 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-white leading-tight">12 km/h</span>
                    <span className="text-[11px] text-white/85 font-medium">Wind</span>
                  </div>
                </div>
              </div>

              {/* 7-Day Forecast */}
              <div className="mt-4 border-t border-white/15 pt-3.5">
                <h4 className="text-[12px] font-bold text-white/85 mb-2.5 uppercase tracking-wider">7-Day Forecast</h4>
                <div className="grid grid-cols-5 gap-2">
                  {FORECAST_DATA.map((f, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 bg-black/20 rounded-[14px] py-2 px-1 border border-white/15 backdrop-blur-sm shadow-sm">
                      <span className="text-[12px] font-medium text-white/90">{f.day}</span>
                      <div className="w-5 h-5 flex items-center justify-center">
                        {f.icon === "sun" && <Sun className="w-4 h-4 text-amber-300" />}
                        {f.icon === "cloud-sun" && <CloudSun className="w-4 h-4 text-amber-200" />}
                        {f.icon === "cloud-rain" && <CloudRain className="w-4 h-4 text-blue-300" />}
                      </div>
                      <span className="text-[13px] font-bold text-white">{f.temp}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* KisanEdge Community Card */}
          <motion.div variants={item}>
            <Link 
              href="/community" 
              className="block relative overflow-hidden bg-gradient-to-br from-[#14532D] to-[#0D381E] rounded-[24px] p-5 text-white shadow-md border border-[#16A34A]/20 group transition-transform active:scale-[0.99]"
            >
              <div 
                className="absolute right-0 top-0 bottom-0 w-36 opacity-10 pointer-events-none" 
                style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50,100 C50,100 0,60 0,30 C0,13.431 13.431,0 30,0 C38.284,0 45.784,3.358 50,8.783 C54.216,3.358 61.716,0 70,0 C86.569,0 100,13.431 100,30 C100,60 50,100 50,100 Z\' fill=\'%2316A34A\'/%3E%3C/svg%3E")', 
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'center right', 
                  backgroundSize: 'contain' 
                }} 
              />
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#16A34A]/25 border border-white/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#DCFCE7]" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[17px] font-bold text-white tracking-tight">KisanEdge Community</h3>
                    <p className="text-[13px] text-white/75 mt-0.5 leading-snug">Connect with farmers, ask questions, and share expertise.</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center gap-1 transition-colors shrink-0 ml-2 border border-white/10">
                  <span className="text-[12px] font-semibold text-white">Join Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Disease Alert Card (High Priority) */}
          <motion.div variants={item}>
            <Link href="/results" className="block">
              <div className="bg-white rounded-[22px] p-4.5 shadow-[0_4px_16px_rgba(245,158,11,0.08)] border border-amber-200/80 flex items-center gap-3.5 transition-transform active:scale-[0.99] hover:border-amber-300">
                <div className="w-12 h-12 rounded-[18px] bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-[16px] text-[#14532D] leading-tight truncate">Early Blight Detected</h3>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                      94% AI
                    </span>
                  </div>
                  <p className="text-[13px] text-[#64748B] font-medium mt-1">Tomato Field A • Moderate severity</p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">Yellowing leaves with dark spots detected.</p>
                  <div className="text-[13px] text-[#16A34A] font-semibold mt-1.5 flex items-center gap-1">
                    <span>View full diagnosis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 text-gray-400">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Crop Health Card */}
          <motion.div 
            variants={item} 
            className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E7EB] flex flex-col relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[20px] font-bold text-[#14532D] leading-tight">Crop Health</h2>
                  <span className="text-[13px] text-[#64748B] font-medium">Overall health across your crops</span>
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-[#F59E0B] font-extrabold text-[32px] leading-none tracking-tight">
                  76
                </span>
                <span className="text-[#94A3B8] text-[18px] font-bold">/100</span>
              </div>
            </div>

            {/* Segmented Meter */}
            <div className="flex flex-col gap-2.5 mb-5">
              <div className="flex gap-1.5 h-3.5 w-full">
                <div className="flex-1 bg-[#16A34A] rounded-l-full rounded-r-sm shadow-sm" />
                <div className="flex-1 bg-[#16A34A] rounded-sm shadow-sm" />
                <div className="flex-1 bg-[#16A34A] rounded-sm shadow-sm" />
                <div className="flex-1 bg-[#F59E0B] rounded-sm shadow-sm" />
                <div className="flex-1 bg-gray-200 rounded-r-full rounded-l-sm" />
              </div>
              <div className="flex items-center justify-between px-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                  <span className="text-[13px] font-medium text-[#64748B]">Healthy (3)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-[13px] font-medium text-[#64748B]">Attention (1)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link href="/scan" className="flex-[3]">
                <Button className="w-full h-12 rounded-[16px] bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[0_4px_12px_rgba(22,163,74,0.25)] font-bold text-[15px] transition-transform active:scale-[0.98]">
                  <ScanLine className="w-5 h-5 mr-2" /> Scan Crop
                </Button>
              </Link>
              <Link href="/environment" className="flex-[2]">
                <Button variant="outline" className="w-full h-12 rounded-[16px] border-[#E5E7EB] text-[#16A34A] font-bold text-[15px] hover:bg-[#F0FDF4] bg-white transition-transform active:scale-[0.98]">
                  <Sprout className="w-5 h-5 mr-2" /> Soil Analysis
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Soil & Environment Preview Card */}
          <motion.div 
            variants={item} 
            className="bg-gradient-to-br from-[#14532D] to-[#0E3B1C] rounded-[24px] p-5 text-white shadow-lg relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <CloudSun className="w-4 h-4 text-amber-300" />
                  <h2 className="text-[17px] font-bold text-white tracking-tight">Soil & Environment</h2>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.9)] animate-pulse" />
                  <span className="text-[12px] text-white/80 font-medium">Node Connected</span>
                </div>
              </div>
              <Link href="/environment">
                <div className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center gap-1 transition-colors cursor-pointer border border-white/10">
                  <span className="text-[12px] font-semibold text-white">Details</span>
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-[18px] p-3.5 flex flex-col border border-white/10">
                <div className="flex items-center gap-1.5 mb-2">
                  <Droplet className="w-4 h-4 text-blue-300" />
                  <span className="text-[12px] font-medium text-white/75">Soil Moisture</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[22px] font-extrabold tracking-tight">31%</span>
                  <span className="text-[11px] bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded-md font-semibold border border-amber-400/20">Low</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-[18px] p-3.5 flex flex-col border border-white/10">
                <div className="flex items-center gap-1.5 mb-2">
                  <Thermometer className="w-4 h-4 text-orange-300" />
                  <span className="text-[12px] font-medium text-white/75">Soil Temp</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[22px] font-extrabold tracking-tight">28°</span>
                  <span className="text-[11px] bg-[#16A34A]/25 text-[#DCFCE7] px-2 py-0.5 rounded-md font-semibold border border-[#16A34A]/30">Good</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Your Crops Section */}
          <motion.section variants={item}>
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-[20px] font-bold text-[#14532D] tracking-tight">Your Crops</h2>
              <Link href="/farm" className="text-[#16A34A] text-[14px] font-semibold flex items-center gap-1 hover:opacity-80">
                See all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-3.5 overflow-x-auto pb-2 -mx-4 px-4 snap-x hide-scrollbar">
              {/* Rice */}
              <Link href="/plants/rice" className="snap-start shrink-0 w-[240px]">
                <div className="bg-white p-3.5 rounded-[20px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5 hover:border-[#16A34A]/30 transition-colors">
                  <div className="w-14 h-14 rounded-[16px] bg-[#F0FDF4] p-1 border border-[#DCFCE7] flex items-center justify-center shrink-0 overflow-hidden">
                    <img src="/crops/rice.jpg" alt="Rice" className="w-full h-full object-cover rounded-[12px]" />
                  </div>
                  <div className="flex flex-col py-0.5 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#14532D] text-[16px] leading-tight truncate">Rice</h3>
                      <span className="text-[11px] text-[#94A3B8] font-medium ml-2">Today</span>
                    </div>
                    <p className="text-[12px] text-[#64748B] font-medium mb-1.5">Cereal crop</p>
                    <div className="flex items-center gap-1 bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded-md text-[11px] font-bold w-fit">
                      <Check className="w-3 h-3 stroke-[3]" /> 85% Health
                    </div>
                  </div>
                </div>
              </Link>

              {/* Wheat */}
              <Link href="/plants/wheat" className="snap-start shrink-0 w-[240px]">
                <div className="bg-white p-3.5 rounded-[20px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5 hover:border-[#16A34A]/30 transition-colors">
                  <div className="w-14 h-14 rounded-[16px] bg-[#F0FDF4] p-1 border border-[#DCFCE7] flex items-center justify-center shrink-0 overflow-hidden">
                    <img src="/crops/wheat.jpg" alt="Wheat" className="w-full h-full object-cover rounded-[12px]" />
                  </div>
                  <div className="flex flex-col py-0.5 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#14532D] text-[16px] leading-tight truncate">Wheat</h3>
                      <span className="text-[11px] text-[#94A3B8] font-medium ml-2">Today</span>
                    </div>
                    <p className="text-[12px] text-[#64748B] font-medium mb-1.5">Cereal crop</p>
                    <div className="flex items-center gap-1 bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded-md text-[11px] font-bold w-fit">
                      <Check className="w-3 h-3 stroke-[3]" /> 87% Health
                    </div>
                  </div>
                </div>
              </Link>

              {/* Tomato */}
              <Link href="/plants/tomato" className="snap-start shrink-0 w-[240px]">
                <div className="bg-white p-3.5 rounded-[20px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5 hover:border-amber-300 transition-colors">
                  <div className="w-14 h-14 rounded-[16px] bg-amber-50 p-1 border border-amber-100 flex items-center justify-center shrink-0 overflow-hidden">
                    <img src="/crops/tomato.jpg" alt="Tomato" className="w-full h-full object-cover rounded-[12px]" />
                  </div>
                  <div className="flex flex-col py-0.5 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#14532D] text-[16px] leading-tight truncate">Tomato</h3>
                      <span className="text-[11px] text-[#94A3B8] font-medium ml-2">Today</span>
                    </div>
                    <p className="text-[12px] text-[#64748B] font-medium mb-1.5">Vegetable</p>
                    <div className="flex items-center gap-1 bg-[#FEF3C7] text-[#D97706] px-2 py-0.5 rounded-md text-[11px] font-bold w-fit">
                      <AlertTriangle className="w-3 h-3" /> 68% Health
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.section>

          {/* Today's Insights Section */}
          <motion.section variants={item} className="mb-4">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-[20px] font-bold text-[#14532D] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#16A34A]" /> Today's Insights
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {/* Insight 1 */}
              <div className="bg-white border border-[#E5E7EB] p-4 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex gap-3.5 items-start">
                  <div className="w-11 h-11 rounded-[16px] bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-[#14532D] text-[15px] leading-tight truncate">High humidity today</h4>
                      <span className="shrink-0 bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#16A34A]/20">
                        <Sparkles className="w-3 h-3" /> AI Insight
                      </span>
                    </div>
                    <p className="text-[#64748B] text-[13px] leading-snug">Watch for fungal disease on your tomato crop.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 self-center shrink-0" />
                </div>
              </div>

              {/* Insight 2 */}
              <div className="bg-white border border-[#E5E7EB] p-4 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex gap-3.5 items-start">
                  <div className="w-11 h-11 rounded-[16px] bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-[#16A34A] mt-0.5">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-[#14532D] text-[15px] leading-tight truncate">Water your wheat tomorrow morning</h4>
                    </div>
                    <p className="text-[#64748B] text-[13px] leading-snug">Conditions are favorable for irrigation.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 self-center shrink-0" />
                </div>
              </div>

              {/* Insight 3 */}
              <div className="bg-white border border-[#E5E7EB] p-4 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex gap-3.5 items-start">
                  <div className="w-11 h-11 rounded-[16px] bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-[#14532D] text-[15px] leading-tight truncate">Sunny afternoon expected</h4>
                      <span className="shrink-0 bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#16A34A]/20">
                        <Sparkles className="w-3 h-3" /> AI Insight
                      </span>
                    </div>
                    <p className="text-[#64748B] text-[13px] leading-snug">Consider checking soil moisture.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 self-center shrink-0" />
                </div>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
