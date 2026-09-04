"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_FIELDS } from "@/lib/mock-data";
import { ArrowLeft, Edit2, Calendar, Droplet, Activity, MapPin, AlertTriangle, Wind, Thermometer, CloudSun, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CROP_STAGES = [
  "Sowing",
  "Germination",
  "Vegetative Growth",
  "Flowering",
  "Fruit Development",
  "Harvest"
];

// Simple pure CSS line chart component
const SimpleLineChart = ({ data, color, title, unit }: { data: number[], color: string, title: string, unit: string }) => {
  const max = Math.max(...data) + 10;
  const min = Math.min(...data) - 10;
  
  return (
    <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#E5E7EB] flex flex-col gap-3">
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
      <div className="mt-2 text-[12px] font-medium text-[#64748b]">Past 7 Days (Avg: {Math.round(data.reduce((a,b)=>a+b)/data.length)}{unit})</div>
    </div>
  );
};

export default function FieldDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const field = MOCK_FIELDS.find(f => f.id === resolvedParams.id) || MOCK_FIELDS[0];

  const currentStageIndex = CROP_STAGES.indexOf(field.growthStage);
  
  // Mock chart data
  const healthData = [75, 76, 74, 78, 80, 81, field.healthScore];
  const moistureData = [45, 42, 38, 55, 52, 48, 45];
  
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8FAF9] pb-24 relative overflow-hidden">
      {/* Background Hero */}
      <div className="absolute top-0 left-0 right-0 h-[240px] sm:h-[280px] bg-gradient-to-b from-[#14532D] to-[#16A34A] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-bl-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-5 pt-safe pb-4">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white">
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 px-5 pt-2 pb-6 flex flex-col text-white">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-white/80 text-[13px] font-semibold uppercase tracking-wider">{field.crop}</span>
            <h1 className="text-[26px] sm:text-[32px] font-bold leading-tight">{field.name}</h1>
            <div className="flex items-center gap-1.5 mt-1 text-white/90">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[12px] sm:text-[13px] font-medium">{field.area} • Planted {field.sowingDate}</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/20">
            {field.image}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col gap-5 px-4 sm:px-5">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 -mt-2">
          <div className="bg-white rounded-[20px] p-3 sm:p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#E5E7EB] flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-[#16A34A]" />
              <span className="text-[12px] font-semibold text-[#64748b]">Health Score</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[24px] sm:text-[28px] font-bold text-[#14532D]">{field.healthScore}</span>
              <span className="text-[14px] text-[#94A3B8] font-bold">/100</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#16A34A] rounded-full" style={{ width: `${field.healthScore}%` }} />
            </div>
          </div>
          
          <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#E5E7EB] flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-4 h-4 ${field.alerts > 0 ? 'text-amber-500' : 'text-[#16A34A]'}`} />
              <span className="text-[12px] font-semibold text-[#64748b]">Status</span>
            </div>
            {field.alerts > 0 ? (
              <div className="flex flex-col gap-0.5">
                <span className="text-[18px] font-bold text-[#14532D]">{field.alerts} Alerts</span>
                <span className="text-[12px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded w-fit">Risk: {field.risk}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-0.5">
                <span className="text-[18px] font-bold text-[#14532D]">All Clear</span>
                <span className="text-[12px] text-[#16A34A] font-bold bg-[#DCFCE7] px-2 py-0.5 rounded w-fit">Risk: Low</span>
              </div>
            )}
          </div>
        </div>

        {/* Crop Calendar Timeline */}
        <section className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-[#14532D]" />
            <h2 className="text-[18px] font-bold text-[#14532D]">Crop Calendar</h2>
          </div>
          
          <div className="relative pl-6 flex flex-col gap-6">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100 rounded-full" />
            
            {CROP_STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isFuture = idx > currentStageIndex;
              
              return (
                <div key={stage} className="relative flex items-center gap-4">
                  <div 
                    className={`absolute -left-[29px] w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 z-10 transition-colors
                      ${isPast ? 'border-[#16A34A]' : isCurrent ? 'border-[#F59E0B]' : 'border-gray-200'}
                    `}
                  >
                    {isPast && <div className="w-3 h-3 rounded-full bg-[#16A34A]" />}
                    {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)]" />}
                  </div>
                  <div className={`flex flex-col ${isFuture ? 'opacity-50' : ''}`}>
                    <span className={`text-[15px] font-bold ${isCurrent ? 'text-[#F59E0B]' : 'text-[#14532D]'}`}>
                      {stage}
                    </span>
                    {isCurrent && <span className="text-[12px] font-medium text-[#64748b]">Current Stage</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live Environment / Soil */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#14532D]">Live Environment</h2>
            <Link href="/environment" className="text-[13px] font-bold text-[#16A34A] flex items-center">
              View Node <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F0FDF4] rounded-2xl p-4 border border-[#16A34A]/20 flex flex-col gap-1">
              <Droplet className="w-5 h-5 text-[#16A34A] mb-1" />
              <span className="text-[12px] font-semibold text-[#14532D]/70">Soil Moisture</span>
              <span className="text-[22px] font-bold text-[#14532D]">45%</span>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200/50 flex flex-col gap-1">
              <Thermometer className="w-5 h-5 text-orange-500 mb-1" />
              <span className="text-[12px] font-semibold text-orange-900/70">Soil Temp</span>
              <span className="text-[22px] font-bold text-orange-900">22°C</span>
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="flex flex-col gap-4 mt-2">
          <h2 className="text-[18px] font-bold text-[#14532D]">Trends</h2>
          <SimpleLineChart data={healthData} color="#16A34A" title="Health Score" unit="/100" />
          <SimpleLineChart data={moistureData} color="#3B82F6" title="Soil Moisture" unit="%" />
        </section>

      </div>
    </div>
  );
}
