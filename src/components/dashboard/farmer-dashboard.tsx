"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WeatherCard } from "@/components/features/weather-card";
import { CropCard } from "@/components/features/crop-card";
import { MOCK_WEATHER, MOCK_ALERTS, MOCK_FARMER_INSIGHTS, MOCK_PLANTS } from "@/lib/mock-data";
import { ArrowRight, AlertTriangle, ScanLine, Sprout, CloudSun, Droplet, Clock } from "lucide-react";
import { useUser } from "@/lib/store/user-store";
import { motion } from "framer-motion";
import { FARM_CROPS, HOME_PLANTS } from "@/lib/onboarding-data";

export function FarmerDashboard() {
  const { name, crops } = useUser();
  const recentAlerts = MOCK_ALERTS.slice(0, 2);
  
  const allPlants = [...FARM_CROPS, ...HOME_PLANTS];
  const userCrops = crops.length > 0 
    ? crops.map(id => {
        const p = allPlants.find(x => x.id === id);
        return p ? {
          id: p.id,
          name: p.name,
          type: "Crop",
          status: "healthy" as const,
          healthScore: 85 + Math.floor(Math.random() * 10),
          lastWatered: "Today",
          image: p.emoji
        } : null;
      }).filter(Boolean) as typeof MOCK_PLANTS
    : MOCK_PLANTS.slice(0, 3);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
        <h1 className="text-[26px] font-bold text-[#0e3b1c] tracking-tight">Good morning, {name}</h1>
        <p className="text-gray-500 font-medium mt-1">Here is your farm overview today.</p>
      </motion.div>

      {/* Weather */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <WeatherCard {...MOCK_WEATHER} />
      </motion.div>

      {/* Crop Health Hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0e3b1c]">Crop Health</h2>
          <span className="text-[#16a34a] font-bold text-[28px] tracking-tight">82<span className="text-gray-400 text-lg">/100</span></span>
        </div>
        <div className="flex gap-2">
          <div className="h-2 rounded-full bg-[#16a34a] flex-1" />
          <div className="h-2 rounded-full bg-[#16a34a] flex-[0.8]" />
          <div className="h-2 rounded-full bg-amber-400 flex-[0.3]" />
          <div className="h-2 rounded-full bg-gray-100 flex-[0.2]" />
        </div>
        <div className="flex items-center justify-between text-sm font-medium mt-1">
          <div className="flex items-center gap-1.5 text-gray-500"><div className="w-2 h-2 rounded-full bg-[#16a34a]" /> Healthy</div>
          <div className="flex items-center gap-1.5 text-gray-500"><div className="w-2 h-2 rounded-full bg-amber-400" /> Attention</div>
        </div>
        <div className="flex gap-3 mt-2">
          <Link href="/scan" className="flex-1">
            <Button className="w-full h-12 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md font-semibold text-[15px]">
              <ScanLine className="w-5 h-5 mr-2" /> Scan Crop
            </Button>
          </Link>
          <Button variant="outline" className="flex-1 h-12 rounded-xl border-gray-200 text-[#0e3b1c] font-semibold text-[15px] hover:bg-gray-50">
            Check Soil
          </Button>
        </div>
      </motion.div>

      {/* Your Crops */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[19px] font-bold text-[#0e3b1c]">Your Crops</h2>
          <Link href="/farm" className="text-[#16a34a] text-sm font-semibold flex items-center gap-1">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x hide-scrollbar">
          {userCrops.map((crop, idx) => (
            <Link key={crop.id} href={`/plants/${crop.id}`} className="snap-start shrink-0 w-[240px]">
              <CropCard plant={crop} />
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Today's Insights */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-[19px] font-bold text-[#0e3b1c] mb-3">Today's Insights</h2>
        <div className="flex flex-col gap-3">
          {MOCK_FARMER_INSIGHTS.map(insight => (
            <div key={insight.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <div className="shrink-0 mt-0.5">
                {insight.icon === 'warning' && <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>}
                {insight.icon === 'droplet' && <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><Droplet className="w-5 h-5 text-blue-500" /></div>}
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

      {/* Quick Actions */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="text-[19px] font-bold text-[#0e3b1c] mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          <Link href="/scan" className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-[18px] bg-white border border-gray-100 flex items-center justify-center shadow-sm text-[#16a34a]"><ScanLine className="w-6 h-6" /></div>
            <span className="text-xs font-semibold text-gray-600 text-center">Scan<br/>Crop</span>
          </Link>
          <div className="flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
            <div className="w-14 h-14 rounded-[18px] bg-white border border-gray-100 flex items-center justify-center shadow-sm text-gray-500"><Sprout className="w-6 h-6" /></div>
            <span className="text-xs font-semibold text-gray-600 text-center">Soil<br/>Sensor</span>
          </div>
          <Link href="/weather" className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-[18px] bg-white border border-gray-100 flex items-center justify-center shadow-sm text-blue-500"><CloudSun className="w-6 h-6" /></div>
            <span className="text-xs font-semibold text-gray-600 text-center">Weather<br/>Radar</span>
          </Link>
          <Link href="/history" className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-[18px] bg-white border border-gray-100 flex items-center justify-center shadow-sm text-indigo-500"><Clock className="w-6 h-6" /></div>
            <span className="text-xs font-semibold text-gray-600 text-center">Crop<br/>History</span>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
