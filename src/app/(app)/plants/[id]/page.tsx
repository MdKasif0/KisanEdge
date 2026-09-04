"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_HOME_PLANTS, MOCK_HISTORY } from "@/lib/mock-data";
import { ArrowLeft, Edit2, Droplet, Sun, Activity, Camera, Flower, History, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple pure CSS line chart component
const SimpleLineChart = ({ data, color, title, unit }: { data: number[], color: string, title: string, unit: string }) => {
  const max = Math.max(...data) + 10;
  const min = Math.min(...data) - 10;
  
  return (
    <div className="bg-white p-4 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#E5E7EB] flex flex-col gap-3">
      <h3 className="text-[14px] font-bold text-[#14532D]">{title}</h3>
      <div className="h-24 w-full relative flex items-end justify-between gap-1 pt-4">
        {data.map((val, i) => {
          const heightPct = Math.max(10, ((val - min) / (max - min)) * 100);
          return (
            <div key={i} className="relative flex flex-col items-center flex-1 group">
              <div 
                className="w-full max-w-[12px] rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ height: `${heightPct}%`, backgroundColor: color }}
              />
              <span className="text-[9px] text-[#94A3B8] mt-1 font-medium absolute -bottom-4">{i}d</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-[12px] font-medium text-[#64748b]">Past 7 Days</div>
    </div>
  );
};

export default function PlantDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const plant = MOCK_HOME_PLANTS.find(p => p.id === resolvedParams.id) || MOCK_HOME_PLANTS[0];

  const recentScans = MOCK_HISTORY.slice(0, 2);
  const healthData = [82, 85, 84, 88, 90, 91, plant.healthScore];
  
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8FAF9] pb-24 relative overflow-hidden">
      {/* Background Hero */}
      <div className="absolute top-0 left-0 right-0 h-[260px] bg-gradient-to-b from-[#0f4021] to-[#14532D] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-bl-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-5 pt-safe pb-4">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10">
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 px-5 pt-2 pb-8 flex justify-between items-end text-white">
        <div className="flex flex-col gap-1">
          <span className="text-white/70 text-[12px] font-semibold uppercase tracking-wider">Indoor Plant</span>
          <h1 className="text-[36px] font-bold leading-none mb-1">{plant.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.6)]" />
            <span className="text-[14px] font-medium text-white/90">{plant.diseaseStatus}</span>
          </div>
        </div>
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[24px] flex items-center justify-center text-4xl shadow-lg border border-white/20">
          {plant.image}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col gap-5 px-4 sm:px-5">
        
        {/* Care Schedule */}
        <section className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#E5E7EB] -mt-4">
          <h2 className="text-[18px] font-bold text-[#14532D] mb-4">Care Schedule</h2>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Droplet className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[14px] font-bold text-[#14532D]">Watering</span>
                <span className={`text-[12px] font-medium ${plant.waterStatus.toLowerCase().includes('due') ? 'text-amber-600' : 'text-[#64748b]'}`}>{plant.waterStatus}</span>
              </div>
              <Button size="sm" variant={plant.waterStatus.toLowerCase().includes('due') ? "default" : "outline"} className={`rounded-full h-8 px-4 text-[12px] font-semibold ${plant.waterStatus.toLowerCase().includes('due') ? 'bg-blue-500 hover:bg-blue-600' : 'border-[#E5E7EB]'}`}>
                Water
              </Button>
            </div>
            
            <div className="w-full h-px bg-gray-100" />
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                <Sun className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[14px] font-bold text-[#14532D]">Sunlight</span>
                <span className="text-[12px] font-medium text-[#64748b]">{plant.sunlightStatus}</span>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                <Flower className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[14px] font-bold text-[#14532D]">Fertilizer</span>
                <span className="text-[12px] font-medium text-[#64748b]">Due in 14 days</span>
              </div>
            </div>
          </div>
        </section>

        {/* Health Trend */}
        <section className="flex flex-col gap-3">
          <SimpleLineChart data={healthData} color="#16A34A" title="Overall Health Trend" unit="/100" />
        </section>

        {/* Recent Scans */}
        <section className="flex flex-col gap-3 mt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#14532D] flex items-center gap-2">
              <History className="w-5 h-5" /> Recent Scans
            </h2>
            <Link href="/history" className="text-[13px] font-bold text-[#16A34A] flex items-center">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-col gap-3">
            {recentScans.map((scan) => (
              <div key={scan.id} className="bg-white p-3.5 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#E5E7EB] flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col flex-1">
                  <h4 className="font-bold text-[#14532D] text-[14px]">{scan.diagnosis}</h4>
                  <span className="text-[12px] font-medium text-[#94A3B8]">{scan.date}</span>
                </div>
                <div className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 ${
                  scan.severity === 'Healthy' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-amber-50 text-amber-600'
                }`}>
                  {scan.severity === 'Healthy' ? <Activity className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                  {scan.healthScore}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
