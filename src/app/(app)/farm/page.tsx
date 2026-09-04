"use client";

import Link from "next/link";
import { MOCK_FIELDS } from "@/lib/mock-data";
import { Plus, Activity, AlertTriangle, Droplet, ChevronRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FarmPage() {
  const avgHealth = Math.round(MOCK_FIELDS.reduce((acc, f) => acc + f.healthScore, 0) / MOCK_FIELDS.length);
  const totalAlerts = MOCK_FIELDS.reduce((acc, f) => acc + f.alerts, 0);

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-5 relative min-h-[100dvh] bg-[#F8FAF9] pb-24">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#16A34A]/5 to-transparent rounded-bl-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between pt-safe pb-2">
        <h1 className="text-[26px] font-bold text-[#14532D] tracking-tight">Farm Overview</h1>
        <Button size="icon" className="rounded-full w-10 h-10 bg-[#16A34A] hover:bg-[#15803d] text-white shadow-md">
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      {/* Metrics Grid */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[#16A34A]" />
            <span className="text-[13px] font-medium text-[#64748b]">Overall Health</span>
          </div>
          <div className="text-[28px] font-bold text-[#14532D] tracking-tight">{avgHealth}<span className="text-[16px] text-[#94A3B8]">/100</span></div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-[13px] font-medium text-[#64748b]">Active Risks</span>
          </div>
          <div className="text-[28px] font-bold text-[#14532D] tracking-tight">{totalAlerts}</div>
        </div>

        <div className="col-span-2 bg-gradient-to-br from-[#16A34A] to-[#14532D] rounded-2xl p-4 shadow-lg text-white flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-white/80 flex items-center gap-1.5"><Droplet className="w-4 h-4" /> Sensor Nodes</span>
            <span className="text-[18px] font-bold mt-0.5">3 Active, 1 Offline</span>
          </div>
          <Button variant="ghost" className="h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-[12px] font-semibold border border-white/10 px-3">
            Check Node
          </Button>
        </div>
      </motion.div>

      {/* Field List */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-bold text-[#14532D]">Your Fields ({MOCK_FIELDS.length})</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          {MOCK_FIELDS.map((field) => (
            <Link key={field.id} href={`/farm/${field.id}`}>
              <div className="bg-white p-4 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#E5E7EB] hover:border-[#16A34A]/30 transition-colors flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] flex items-center justify-center text-2xl shrink-0">
                      {field.image}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-[#14532D] text-[17px]">{field.name}</h3>
                      <p className="text-[13px] text-[#64748b] font-medium">{field.crop} • {field.area}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
                </div>
                
                <div className="w-full h-px bg-gray-100" />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${field.healthScore > 80 ? 'bg-[#16A34A]' : 'bg-amber-500'}`} />
                    <span className="text-[13px] font-bold text-[#14532D]">Health {field.healthScore}</span>
                  </div>
                  {field.alerts > 0 ? (
                    <div className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> {field.alerts} Alerts
                    </div>
                  ) : (
                    <div className="bg-[#DCFCE7] text-[#16A34A] px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> Healthy
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
