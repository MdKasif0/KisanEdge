"use client";

import Link from "next/link";
import { MOCK_HOME_PLANTS } from "@/lib/mock-data";
import { Plus, Droplet, Sun, Activity, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function PlantsPage() {
  const avgHealth = Math.round(MOCK_HOME_PLANTS.reduce((acc, p) => acc + p.healthScore, 0) / MOCK_HOME_PLANTS.length);
  const needsWater = MOCK_HOME_PLANTS.filter(p => p.waterStatus.toLowerCase().includes("due")).length;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-5 relative min-h-[100dvh] bg-[#F8FAF9] pb-24">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#16A34A]/5 to-transparent rounded-bl-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between pt-safe pb-2">
        <h1 className="text-[26px] font-bold text-[#14532D] tracking-tight">My Plants</h1>
        <Button size="icon" className="rounded-full w-10 h-10 bg-[#16A34A] hover:bg-[#15803d] text-white shadow-md">
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      {/* Metrics Grid */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[#16A34A]" />
            <span className="text-[13px] font-medium text-[#64748b]">Avg Health</span>
          </div>
          <div className="text-[28px] font-bold text-[#14532D] tracking-tight">{avgHealth}<span className="text-[16px] text-[#94A3B8]">/100</span></div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-4 h-4 text-blue-500" />
            <span className="text-[13px] font-medium text-[#64748b]">Needs Water</span>
          </div>
          <div className="text-[28px] font-bold text-blue-600 tracking-tight">{needsWater}</div>
        </div>
      </motion.div>

      {/* Plants List */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative z-10 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {MOCK_HOME_PLANTS.map((plant) => (
            <Link key={plant.id} href={`/plants/${plant.id}`}>
              <div className="bg-white p-4 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#E5E7EB] hover:border-[#16A34A]/30 transition-colors flex flex-col gap-3">
                
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-16 rounded-[18px] bg-[#F0FDF4] flex items-center justify-center text-3xl shrink-0">
                      {plant.image}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-bold text-[#14532D] text-[18px]">{plant.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${plant.healthScore > 80 ? 'bg-[#16A34A]' : 'bg-amber-500'}`} />
                        <span className="text-[13px] font-semibold text-[#64748b]">Health {plant.healthScore}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#94A3B8] mt-2" />
                </div>
                
                <div className="w-full h-px bg-gray-100 mt-1" />
                
                <div className="flex justify-between items-center gap-2 pt-1">
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider">Watering</span>
                    <div className="flex items-center gap-1.5">
                      <Droplet className={`w-3.5 h-3.5 ${plant.waterStatus.toLowerCase().includes('due') ? 'text-amber-500' : 'text-blue-500'}`} />
                      <span className={`text-[12px] font-bold ${plant.waterStatus.toLowerCase().includes('due') ? 'text-amber-600' : 'text-blue-600'}`}>
                        {plant.waterStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-px h-8 bg-gray-100 mx-2" />
                  
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider">Condition</span>
                    <div className="flex items-center gap-1.5">
                      {plant.diseaseStatus === "Healthy" ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span className="text-[12px] font-bold text-[#16A34A]">{plant.diseaseStatus}</span>
                        </>
                      ) : (
                        <>
                          <Activity className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[12px] font-bold text-amber-600">{plant.diseaseStatus}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
