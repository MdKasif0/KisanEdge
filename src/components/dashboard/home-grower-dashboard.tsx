"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CropCard } from "@/components/features/crop-card";
import { MOCK_HOME_INSIGHTS, MOCK_PLANTS } from "@/lib/mock-data";
import { 
  ArrowRight, AlertTriangle, ScanLine, Droplet, Sun, Flower, Search, 
  CloudSun, Thermometer, MapPin, Bell, ChevronRight, Activity, Sprout 
} from "lucide-react";
import { useUser } from "@/lib/store/user-store";
import { motion } from "framer-motion";
import { FARM_CROPS, HOME_PLANTS } from "@/lib/onboarding-data";
import { useEffect, useState } from "react";

export function HomeGrowerDashboard() {
  const { name, crops, location } = useUser();
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

  const displayName = name || "Kasif";
  const displayLocation = location || "Pune, MH";

  const allPlants = [...FARM_CROPS, ...HOME_PLANTS];
  const userPlants = crops.length > 0 
    ? crops.map(id => {
        const p = allPlants.find(x => x.id === id);
        return p ? {
          id: p.id,
          name: p.name,
          type: "Indoor",
          status: "healthy" as const,
          healthScore: 88 + Math.floor(Math.random() * 10),
          lastWatered: "Today",
          image: p.emoji
        } : null;
      }).filter(Boolean) as typeof MOCK_PLANTS
    : MOCK_PLANTS.slice(0, 3);

  return (
    <div className="flex flex-col relative w-full overflow-x-hidden bg-[#F8FAF9] min-h-[100dvh]">
      <div className="flex flex-col relative z-10 w-full max-w-md mx-auto pb-32">
        {/* Sticky Top Header */}
        <header 
          className="sticky top-0 z-40 bg-[#F8FAF9]/95 backdrop-blur-md px-4 sm:px-5 pb-3 border-b border-gray-100/80 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
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

        <div className="px-4 sm:px-5 flex flex-col gap-6 mt-3">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-1">
            <h2 className="text-[26px] sm:text-[28px] font-bold text-[#14532D] tracking-tight leading-tight">
              {greeting}, {displayName}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#64748B] font-normal mt-1">
              Let's check on your plants today.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex gap-2.5 overflow-x-auto hide-scrollbar -mx-1 px-1">
            <Link href="/scan" className="flex-1 min-w-[160px]">
              <div className="bg-[#16A34A] hover:bg-[#15803D] text-white rounded-[20px] p-3.5 flex items-center justify-between shadow-[0_4px_14px_rgba(22,163,74,0.3)] transition-transform active:scale-[0.98]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <ScanLine className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px] leading-tight">Scan Plant</span>
                    <span className="text-[11px] text-white/80 font-medium mt-0.5">Diagnose health with AI</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-1">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </Link>

            <Link href="/alerts" className="shrink-0 min-w-[125px]">
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
          </motion.div>

          {/* Plant Health Hero */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E7EB] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[20px] font-bold text-[#14532D] leading-tight">Overall Health</h2>
                  <span className="text-[13px] text-[#64748B] font-medium">Indoor plants monitoring</span>
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-[#16A34A] font-extrabold text-[32px] leading-none tracking-tight">
                  91
                </span>
                <span className="text-[#94A3B8] text-[18px] font-bold">/100</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mb-5">
              <div className="flex gap-1.5 h-3.5 w-full">
                <div className="flex-1 bg-[#16A34A] rounded-l-full rounded-r-sm shadow-sm" />
                <div className="flex-1 bg-[#16A34A] rounded-sm shadow-sm" />
                <div className="flex-1 bg-[#16A34A] rounded-sm shadow-sm" />
                <div className="flex-1 bg-[#16A34A] rounded-sm shadow-sm" />
                <div className="flex-1 bg-gray-200 rounded-r-full rounded-l-sm" />
              </div>
            </div>

            <Link href="/scan">
              <Button className="w-full h-12 rounded-[16px] bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[0_4px_12px_rgba(22,163,74,0.25)] font-bold text-[15px] transition-transform active:scale-[0.98]">
                <ScanLine className="w-5 h-5 mr-2" /> Scan My Plant
              </Button>
            </Link>
          </motion.div>

          {/* Plant Environment Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-br from-[#14532D] to-[#0E3B1C] rounded-[24px] p-5 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <CloudSun className="w-4 h-4 text-amber-300" />
                  <h2 className="text-[17px] font-bold text-white tracking-tight">Plant Environment</h2>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.9)] animate-pulse" />
                  <span className="text-[12px] text-white/80 font-medium">Sensor Connected</span>
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
                  <span className="text-[12px] font-medium text-white/75">Pot Moisture</span>
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

          {/* Featured: Community Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <Link href="/community" className="block relative overflow-hidden bg-gradient-to-br from-[#14532D] to-[#0D381E] rounded-[24px] p-5 text-white shadow-md border border-[#16A34A]/20 group transition-transform active:scale-[0.99]">
              <div className="flex justify-between items-center relative z-10">
                <div className="flex flex-col">
                  <h3 className="text-[17px] font-bold text-white tracking-tight">KisanEdge Community</h3>
                  <p className="text-[13px] text-white/75 mt-0.5 leading-snug">Connect with growers, ask questions, and share expertise.</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center gap-1 transition-colors shrink-0 ml-2 border border-white/10">
                  <span className="text-[12px] font-semibold text-white">Join Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Recent Diagnosis Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.19 }}>
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
                  <p className="text-[13px] text-[#64748B] font-medium mt-1">Tomato • Moderate severity</p>
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

          {/* My Plants */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-[20px] font-bold text-[#14532D] tracking-tight">My Plants</h2>
              <Link href="/plants" className="text-[#16A34A] text-[14px] font-semibold flex items-center gap-1 hover:opacity-80">
                See all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-3.5 overflow-x-auto pb-4 -mx-4 px-4 snap-x hide-scrollbar">
              {userPlants.map((plant) => (
                <Link key={plant.id} href={`/plants/${plant.id}`} className="snap-start shrink-0 w-[240px]">
                  <CropCard plant={plant} />
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Care Cards Grid */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-[20px] font-bold text-[#14532D] mb-3.5 tracking-tight">Quick Care</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col gap-2">
                <Droplet className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-[#14532D] text-[15px]">Watering</span>
                <span className="text-xs text-[#64748B]">2 plants need water</span>
              </div>
              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex flex-col gap-2">
                <Sun className="w-6 h-6 text-amber-500" />
                <span className="font-bold text-[#14532D] text-[15px]">Sunlight</span>
                <span className="text-xs text-[#64748B]">All good</span>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-2">
                <Flower className="w-6 h-6 text-[#16A34A]" />
                <span className="font-bold text-[#14532D] text-[15px]">Fertilizer</span>
                <span className="text-xs text-[#64748B]">Scheduled for Sun</span>
              </div>
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex flex-col gap-2">
                <Search className="w-6 h-6 text-red-500" />
                <span className="font-bold text-[#14532D] text-[15px]">Disease Watch</span>
                <span className="text-xs text-[#64748B]">No issues found</span>
              </div>
            </div>
          </motion.section>

          {/* Smart Insights Today */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-4">
            <h2 className="text-[20px] font-bold text-[#14532D] mb-3.5 tracking-tight">Smart Insights Today</h2>
            <div className="flex flex-col gap-3">
              {MOCK_HOME_INSIGHTS.map(insight => (
                <div key={insight.id} className="bg-white border border-[#E5E7EB] p-4 rounded-[20px] flex gap-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <div className="shrink-0 mt-0.5">
                    {insight.icon === 'warning' && <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500"><AlertTriangle className="w-5 h-5" /></div>}
                    {insight.icon === 'droplet' && <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500"><Droplet className="w-5 h-5" /></div>}
                    {insight.icon === 'sun' && <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500"><Sun className="w-5 h-5" /></div>}
                    {insight.icon === 'cloud' && <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500"><CloudSun className="w-5 h-5" /></div>}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#14532D] text-[15px]">{insight.title}</h4>
                    <p className="text-[#64748B] text-[13px] mt-1 leading-snug">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
