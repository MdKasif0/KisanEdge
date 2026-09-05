"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CropCard } from "@/components/features/crop-card";
import { MOCK_HOME_INSIGHTS, MOCK_PLANTS } from "@/lib/mock-data";
import { ArrowRight, AlertTriangle, ScanLine, Droplet, Sun, Flower, Search, CloudSun, Thermometer, Leaf, MapPin, Bell } from "lucide-react";
import { useUser } from "@/lib/store/user-store";
import { useTranslation } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { FARM_CROPS, HOME_PLANTS } from "@/lib/onboarding-data";
import { DEMO_DIAGNOSIS } from "@/lib/demo-state";

export function HomeGrowerDashboard() {
  const { name, crops } = useUser();
  const { t } = useTranslation();
  
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
    <div className="flex flex-col gap-5 sm:gap-6 p-3.5 sm:p-4 pb-24">
      {/* Top Header */}
      <header className="flex items-center justify-between pt-safe pb-2">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#14532D] tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-[#16A34A] rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            KisanEdge
          </h1>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="text-[13px] text-[#64748b] font-medium">Pune, MH</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/alerts">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6 text-[#14532D]" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#F59E0B] rounded-full border-2 border-[#F8FAF9]" />
            </button>
          </Link>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full bg-[#DCFCE7] border border-[#16A34A]/20 flex items-center justify-center cursor-pointer shadow-sm">
              <span className="text-[#14532D] font-bold text-lg">K</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
        <h2 className="text-[22px] sm:text-[26px] font-bold text-[#0e3b1c] tracking-tight">{t("dashboard.greeting")}, {name}</h2>
        <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium mt-1">Let's check on your plants today.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex gap-2 overflow-x-auto hide-scrollbar -mx-1 px-1">
        <Link href="/scan" className="flex-1">
          <div className="bg-[#16a34a] text-white rounded-2xl p-3.5 flex items-center gap-2.5 shadow-md haptic-press min-w-[140px]">
            <ScanLine className="w-5 h-5 shrink-0" />
            <span className="font-bold text-[14px]">Scan Plant</span>
          </div>
        </Link>
        <Link href="/alerts" className="flex-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-3.5 flex items-center gap-2.5 shadow-sm haptic-press min-w-[140px]">
            <Bell className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-[14px] text-[#0e3b1c]">Alerts</span>
              <span className="text-[11px] text-red-500 font-semibold">3 new</span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Plant Health Hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0e3b1c]">Overall Health</h2>
          <span className="text-[#16a34a] font-bold text-[28px] tracking-tight">91<span className="text-gray-400 text-lg">/100</span></span>
        </div>
        <div className="flex gap-2">
          <div className="h-2 rounded-full bg-[#16a34a] flex-1" />
          <div className="h-2 rounded-full bg-[#16a34a] flex-1" />
          <div className="h-2 rounded-full bg-[#16a34a] flex-[0.5]" />
          <div className="h-2 rounded-full bg-gray-100 flex-[0.2]" />
        </div>
        <Link href="/scan" className="mt-2">
          <Button className="w-full h-12 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md font-semibold text-[15px]">
            <ScanLine className="w-5 h-5 mr-2" /> Scan My Plant
          </Button>
        </Link>
      </motion.div>

      {/* Plant Environment Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-br from-[#14532D] to-[#0e3b1c] rounded-[24px] p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <CloudSun className="w-4 h-4 text-amber-300" />
              <h2 className="text-[16px] font-bold text-white/90">Plant Environment</h2>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.8)]" />
              <span className="text-[12px] text-white/70 font-medium">Sensor Connected</span>
            </div>
          </div>
          <Link href="/environment">
            <Button variant="ghost" size="sm" className="h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-[12px] font-semibold border border-white/10">
              Details <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-3 flex flex-col border border-white/5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Droplet className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-[11px] font-medium text-white/70">Pot Moisture</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] font-bold">31%</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-sm font-semibold">Low</span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-3 flex flex-col border border-white/5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Thermometer className="w-3.5 h-3.5 text-orange-300" />
              <span className="text-[11px] font-medium text-white/70">Soil Temp</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] font-bold">28°</span>
              <span className="text-[10px] bg-[#16A34A]/20 text-[#DCFCE7] px-1.5 py-0.5 rounded-sm font-semibold">Good</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured: Community Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
        <Link href="/community" className="block relative overflow-hidden bg-gradient-to-br from-[#14532D] to-[#0e3b1c] rounded-[24px] p-5 text-white shadow-lg group">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
          <div className="flex justify-between items-start relative z-10">
            <div className="flex flex-col">
              <h2 className="text-[18px] font-bold text-white/90">KisanEdge Community</h2>
              <p className="text-[13px] text-white/70 mt-1 max-w-[200px]">Connect with growers, ask questions, and share expertise.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Recent Diagnosis Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.19 }}>
        <Link href="/results" className="block">
          <div className="bg-white rounded-[20px] p-4 shadow-sm border border-orange-200 flex gap-3.5 haptic-press">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[15px] text-[#0e3b1c] leading-tight">Early Blight Detected</h3>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">94% AI</span>
              </div>
              <p className="text-[13px] text-gray-500 mt-1">Tomato • Moderate severity</p>
              <p className="text-[12px] text-[#16a34a] font-semibold mt-1.5 flex items-center gap-1">
                View full diagnosis <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
      {/* My Plants */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[19px] font-bold text-[#0e3b1c]">My Plants</h2>
          <Link href="/plants" className="text-[#16a34a] text-sm font-semibold flex items-center gap-1">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x hide-scrollbar">
          {userPlants.map((plant, idx) => (
            <Link key={plant.id} href={`/plants/${plant.id}`} className="snap-start shrink-0 w-[240px]">
              <CropCard plant={plant} />
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Care Cards Grid */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-[19px] font-bold text-[#0e3b1c] mb-3">Quick Care</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col gap-2">
            <Droplet className="w-6 h-6 text-blue-500" />
            <span className="font-semibold text-[#0e3b1c] text-[15px]">Watering</span>
            <span className="text-xs text-gray-500">2 plants need water</span>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex flex-col gap-2">
            <Sun className="w-6 h-6 text-amber-500" />
            <span className="font-semibold text-[#0e3b1c] text-[15px]">Sunlight</span>
            <span className="text-xs text-gray-500">All good</span>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-2">
            <Flower className="w-6 h-6 text-emerald-500" />
            <span className="font-semibold text-[#0e3b1c] text-[15px]">Fertilizer</span>
            <span className="text-xs text-gray-500">Scheduled for Sun</span>
          </div>
          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex flex-col gap-2">
            <Search className="w-6 h-6 text-red-500" />
            <span className="font-semibold text-[#0e3b1c] text-[15px]">Disease Watch</span>
            <span className="text-xs text-gray-500">No issues found</span>
          </div>
        </div>
      </motion.section>

      {/* Smart Insights Today */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-[19px] font-bold text-[#0e3b1c] mb-3">Smart Insights Today</h2>
        <div className="flex flex-col gap-3">
          {MOCK_HOME_INSIGHTS.map(insight => (
            <div key={insight.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <div className="shrink-0 mt-0.5">
                {insight.icon === 'warning' && <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-orange-500" /></div>}
                {insight.icon === 'droplet' && <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><Droplet className="w-5 h-5 text-blue-500" /></div>}
                {insight.icon === 'sun' && <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center"><Sun className="w-5 h-5 text-amber-500" /></div>}
                {insight.icon === 'cloud' && <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center"><CloudSun className="w-5 h-5 text-indigo-500" /></div>}
              </div>
              <div>
                <h4 className="font-semibold text-[#0e3b1c] text-[15px]">{insight.title}</h4>
                <p className="text-gray-500 text-[14px] mt-1 leading-snug">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
