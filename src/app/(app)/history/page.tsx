"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_HISTORY } from "@/lib/mock-data";
import { ArrowLeft, Filter, Camera, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FILTERS = ["All", "Disease", "Healthy", "Recent"];

export default function HistoryPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredHistory = MOCK_HISTORY.filter(scan => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Healthy") return scan.severity === "Healthy";
    if (activeFilter === "Disease") return scan.severity !== "Healthy";
    if (activeFilter === "Recent") return scan.date.includes("Today");
    return true;
  });

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8FAF9] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F8FAF9]/90 backdrop-blur-md px-4 sm:px-5 pt-safe pb-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors -ml-2 text-[#14532D]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[20px] font-bold text-[#14532D] tracking-tight">
            Scan History
          </h1>
        </div>
        <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 text-[#14532D] hover:bg-gray-100">
          <Filter className="w-5 h-5" />
        </Button>
      </header>

      {/* Filters */}
      <div className="px-4 sm:px-5 pt-4 pb-2 overflow-x-auto hide-scrollbar flex gap-2">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors ${
              activeFilter === filter 
                ? 'bg-[#14532D] text-white' 
                : 'bg-white text-[#64748b] border border-[#E5E7EB]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <span className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-wider ml-1 mb-1">Recent Scans</span>
        
        {filteredHistory.length === 0 ? (
          <div className="text-center py-10 text-[#94A3B8] font-medium">
            No scans match this filter.
          </div>
        ) : (
          filteredHistory.map((scan, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.05 }}
              key={scan.id} 
              className="bg-white p-4 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#E5E7EB] flex flex-col gap-3 relative overflow-hidden"
            >
              {/* Status accent border */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${scan.severity === 'Healthy' ? 'bg-[#16A34A]' : 'bg-amber-500'}`} />
              
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-[14px] bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#14532D] text-[16px] leading-tight pr-4">{scan.diagnosis}</h3>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-[16px] font-bold text-[#14532D] leading-none">{scan.healthScore}</span>
                      <span className="text-[10px] text-[#94A3B8] font-bold">HEALTH</span>
                    </div>
                  </div>
                  
                  <span className="text-[13px] font-medium text-[#64748b] mt-0.5">{scan.crop} • AI {scan.confidence}%</span>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-medium text-[#94A3B8]">{scan.date}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    {scan.severity === 'Healthy' ? (
                      <span className="text-[11px] font-bold text-[#16A34A] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Healthy
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {scan.severity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
