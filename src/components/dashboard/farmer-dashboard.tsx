"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_ALERTS, MOCK_FARMER_INSIGHTS, MOCK_PLANTS, MOCK_WEATHER } from "@/lib/mock-data";
import { 
  ArrowRight, AlertTriangle, ScanLine, Sprout, CloudSun, Droplet, Clock, 
  MapPin, Bell, Sun, Thermometer, Wind, Leaf, Sparkles, Activity, Check,
  CloudRain, ThermometerSun
} from "lucide-react";
import { useUser } from "@/lib/store/user-store";
import { motion } from "framer-motion";
import { FARM_CROPS, HOME_PLANTS } from "@/lib/onboarding-data";

export function FarmerDashboard() {
  const { name, crops } = useUser();
  
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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-[#F8FAF9] min-h-[100dvh]">
      {/* Botanical subtle background */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50,100 C50,100 0,60 0,30 C0,13.431 13.431,0 30,0 C38.284,0 45.784,3.358 50,8.783 C54.216,3.358 61.716,0 70,0 C86.569,0 100,13.431 100,30 C100,60 50,100 50,100 Z\' fill=\'%2316A34A\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: '100%' }} />

      <div className="flex flex-col p-4 sm:p-5 relative z-10 w-full max-w-md mx-auto pb-24">
        
        {/* Top Header */}
        <header className="flex items-center justify-between pt-safe pb-6">
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

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {/* Greeting */}
          <motion.div variants={item} className="flex flex-col gap-1">
            <h2 className="text-[26px] sm:text-[28px] font-bold text-[#14532D] tracking-tight leading-tight">
              Good morning, {name} <span className="inline-block origin-bottom-right hover:rotate-12 transition-transform">🌱</span>
            </h2>
            <p className="text-[15px] text-[#64748b] font-medium">Here is your farm overview today.</p>
          </motion.div>

          {/* Weather Intelligence Card */}
          <motion.div variants={item} className="w-full rounded-[24px] bg-gradient-to-br from-[#16A34A] to-[#14532D] shadow-[0_12px_24px_rgba(20,83,45,0.15)] p-5 text-white relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[14px] font-medium text-white/80">Weather Intelligence</span>
                <Link href="/weather">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </div>
              
              <div className="flex flex-col gap-0">
                <span className="text-[32px] sm:text-[40px] font-bold leading-none tracking-tighter">{MOCK_WEATHER.temp}°C</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[16px] font-semibold">{MOCK_WEATHER.condition}</span>
                  <div className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="text-[13px] bg-white/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <Sprout className="w-3 h-3" /> Good for farming
                  </span>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="flex items-center justify-between bg-black/10 rounded-2xl p-2.5 sm:p-3.5 mt-5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2.5">
                  <Droplet className="w-5 h-5 text-blue-200" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold leading-tight">{MOCK_WEATHER.humidity}%</span>
                    <span className="text-[11px] text-white/70 font-medium">Humidity</span>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex items-center gap-2.5">
                  <CloudRain className="w-5 h-5 text-blue-300" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold leading-tight">{MOCK_WEATHER.rainProbability}%</span>
                    <span className="text-[11px] text-white/70 font-medium">Rain Prob.</span>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex items-center gap-2.5">
                  <Wind className="w-5 h-5 text-teal-200" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold leading-tight">{MOCK_WEATHER.windSpeed} km/h</span>
                    <span className="text-[11px] text-white/70 font-medium">Wind</span>
                  </div>
                </div>
              </div>

              {/* 7-Day Forecast */}
              <div className="mt-5 border-t border-white/10 pt-4">
                <h4 className="text-[12px] font-semibold text-white/70 mb-3 uppercase tracking-wider">7-Day Forecast</h4>
                <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-5 px-5">
                  {MOCK_WEATHER.forecast.map((f, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 bg-black/5 rounded-xl p-2.5 min-w-[56px] border border-white/5">
                      <span className="text-[11px] font-medium text-white/80">{f.day}</span>
                      <span className="text-xl">{f.icon}</span>
                      <span className="text-[13px] font-bold">{f.temp}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Crop Health Hero */}
          <motion.div variants={item} className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E7EB] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#16A34A]" />
                </div>
                <h2 className="text-[19px] font-bold text-[#14532D]">Crop Health</h2>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#16A34A] font-extrabold text-[32px] leading-none tracking-tighter">
                  82<span className="text-[#94A3B8] text-[18px] font-bold">/100</span>
                </span>
              </div>
            </div>

            {/* Segmented Visualization */}
            <div className="flex flex-col gap-3 mb-5">
              <div className="flex gap-1.5 h-3 w-full">
                <div className="flex-1 bg-[#16A34A] rounded-l-full rounded-r-sm" />
                <div className="flex-1 bg-[#16A34A] rounded-sm" />
                <div className="flex-1 bg-[#16A34A] rounded-sm" />
                <div className="flex-1 bg-[#F59E0B] rounded-sm" />
                <div className="flex-1 bg-gray-100 rounded-r-full rounded-l-sm" />
              </div>
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                  <span className="text-[12px] font-medium text-[#64748b]">Healthy (3)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-[12px] font-medium text-[#64748b]">Attention (1)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link href="/scan" className="flex-[3]">
                <Button className="w-full h-12 rounded-[16px] bg-[#16A34A] hover:bg-[#14532D] text-white shadow-[0_4px_12px_rgba(22,163,74,0.25)] font-semibold text-[15px] transition-transform active:scale-[0.98]">
                  <ScanLine className="w-5 h-5 mr-2" /> Scan Crop
                </Button>
              </Link>
              <Link href="/environment" className="flex-[2]">
                <Button variant="outline" className="w-full h-12 rounded-[16px] border-[#E5E7EB] text-[#16A34A] font-semibold text-[15px] hover:bg-[#F0FDF4] bg-white transition-transform active:scale-[0.98]">
                  <Sprout className="w-5 h-5 mr-2" /> Soil
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Environment Preview Card */}
          <motion.div variants={item} className="bg-gradient-to-br from-[#14532D] to-[#0e3b1c] rounded-[24px] p-5 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <CloudSun className="w-4 h-4 text-amber-300" />
                  <h2 className="text-[16px] font-bold text-white/90">Soil & Environment</h2>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.8)]" />
                  <span className="text-[12px] text-white/70 font-medium">Node Connected</span>
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
                  <span className="text-[11px] font-medium text-white/70">Soil Moisture</span>
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

          {/* Your Crops */}
          <motion.section variants={item}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-bold text-[#14532D]">Your Crops</h2>
              <Link href="/farm" className="text-[#16A34A] text-[14px] font-semibold flex items-center gap-1 hover:opacity-80">
                See all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x hide-scrollbar">
              {userCrops.map((crop) => (
                <Link key={crop.id} href={`/plants/${crop.id}`} className="snap-start shrink-0 w-[220px] sm:w-[260px]">
                  <div className="bg-white p-3.5 rounded-[20px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:border-[#16A34A]/30 transition-colors">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] bg-[#F0FDF4] flex items-center justify-center shrink-0">
                      <span className="text-3xl">{crop.image}</span>
                    </div>
                    <div className="flex flex-col py-1">
                      <h3 className="font-bold text-[#14532D] text-[16px] leading-tight">{crop.name}</h3>
                      <p className="text-[12px] text-[#94A3B8] font-medium mb-1.5">Crop</p>
                      <div className="flex items-center gap-1.5">
                        <div className="bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> {crop.healthScore}% Health
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Today's Insights */}
          <motion.section variants={item} className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-bold text-[#14532D] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#16A34A]" /> Smart Insights
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK_FARMER_INSIGHTS.map((insight, idx) => (
                <div key={insight.id} className="bg-white border border-[#E5E7EB] p-4 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="flex gap-4">
                    <div className="shrink-0 mt-0.5 relative z-10">
                      {insight.icon === 'warning' && <div className="w-11 h-11 rounded-[14px] bg-orange-50 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-orange-500" /></div>}
                      {insight.icon === 'droplet' && <div className="w-11 h-11 rounded-[14px] bg-blue-50 flex items-center justify-center"><Droplet className="w-5 h-5 text-blue-500" /></div>}
                      {insight.icon === 'cloud' && <div className="w-11 h-11 rounded-[14px] bg-indigo-50 flex items-center justify-center"><CloudRain className="w-5 h-5 text-indigo-500" /></div>}
                      {insight.icon === 'sun' && <div className="w-11 h-11 rounded-[14px] bg-amber-50 flex items-center justify-center"><ThermometerSun className="w-5 h-5 text-amber-500" /></div>}
                    </div>
                    <div className="flex-1 relative z-10 pt-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-[#14532D] text-[15px] leading-tight pr-6">{insight.title}</h4>
                        {idx === 0 && (
                          <span className="shrink-0 bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> AI Insight
                          </span>
                        )}
                      </div>
                      <p className="text-[#64748b] text-[13px] mt-1.5 leading-snug">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
