"use client";

import { useState } from "react";
import { 
  Droplet, 
  Thermometer, 
  Sun, 
  Cpu, 
  Sparkles, 
  Leaf, 
  Play, 
  Pause,
  Bell, 
  ChevronRight,
  Check,
  AlertCircle,
  CheckCircle,
  Wifi,
  CloudSun,
  CloudRain,
  ShieldAlert,
  AlertTriangle,
  Sprout,
  Waves,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FORECAST = [
  { day: "Mon", temp: 32, icon: CloudSun, prob: 10 },
  { day: "Tue", temp: 34, icon: Sun, prob: 0 },
  { day: "Wed", temp: 33, icon: CloudSun, prob: 20 },
  { day: "Thu", temp: 28, icon: CloudRain, prob: 80 },
  { day: "Fri", temp: 27, icon: CloudRain, prob: 60 },
  { day: "Sat", temp: 29, icon: CloudSun, prob: 30 },
  { day: "Sun", temp: 31, icon: Sun, prob: 10 },
];

export default function EnvironmentPage() {
  const [connState, setConnState] = useState<"connected" | "scanning">("connected");
  const [isPumpActive, setIsPumpActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const togglePump = () => {
    setIsPumpActive((prev) => {
      const next = !prev;
      showToast(next ? "Irrigation pump started successfully" : "Irrigation pump stopped");
      return next;
    });
  };

  const handleRemindMe = () => {
    showToast("Reminder set: We'll notify you in 2 hours to check soil moisture");
  };

  const handleSyncNode = () => {
    setConnState("scanning");
    setTimeout(() => {
      setConnState("connected");
      showToast("Sensor telemetry updated successfully");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F4F8F5] font-sans relative select-none overflow-x-hidden">
      {/* Botanical Foliage Watermark in Upper Right */}
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none overflow-hidden z-0">
        <svg
          className="absolute -top-4 -right-4 w-52 h-52 text-[#16A34A]/15"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          {/* Decorative natural leaf branch */}
          <path d="M190,10 Q140,50 80,65 Q130,25 190,10 Z" />
          <path d="M185,50 Q135,90 95,105 Q145,70 185,50 Z" opacity="0.8" />
          <path d="M170,85 Q120,125 75,135 Q125,105 170,85 Z" opacity="0.6" />
          <path d="M150,120 Q105,155 60,165 Q110,135 150,120 Z" opacity="0.5" />
          <path d="M125,150 Q85,180 40,190 Q90,165 125,150 Z" opacity="0.4" />
          <path d="M200,0 Q160,80 100,150" stroke="#16A34A" strokeWidth="2" strokeOpacity="0.2" fill="none" />
        </svg>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 z-[100] flex justify-center animate-fade-in">
          <div className="bg-[#0F3E2E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm">
            <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="font-semibold text-[13.5px]">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="flex flex-col relative z-10 w-full max-w-md mx-auto pb-28">
        {/* Header */}
        <header
          className="px-4 sm:px-5 pb-3 flex items-center justify-between"
          style={{ paddingTop: "calc(var(--safe-top, 0px) + 20px)" }}
        >
          <div className="flex items-center gap-3">
            {/* App Clover Logo Container */}
            <div className="w-[46px] h-[46px] bg-white rounded-2xl p-1 shadow-xs border border-gray-100 flex items-center justify-center shrink-0">
              <img
                src="/icon-512x512.png"
                alt="KisanEdge Clover"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[21px] font-black text-[#0D3321] leading-tight tracking-tight">
                Field Sensor
              </h1>
              <p className="text-[13px] text-[#64748B] font-medium tracking-tight mt-0.5">
                Local weather & conditions
              </p>
            </div>
          </div>

          {/* Online Status Pill Badge */}
          <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/60 shadow-2xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.6)] animate-pulse" />
            <span className="text-[12.5px] font-bold text-[#15803D]">Online</span>
          </div>
        </header>

        {/* Main Body */}
        <div className="px-4 sm:px-5 mt-3 flex flex-col gap-4">
          {/* KisanEdge Node Status Card */}
          <div
            onClick={handleSyncNode}
            className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3.5">
              {/* IoT Chip Icon Container */}
              <div className="w-13 h-13 rounded-2xl bg-[#ECFDF5] border border-emerald-100 flex items-center justify-center relative shrink-0">
                <div className="relative">
                  <Cpu className="w-6 h-6 text-[#15803D]" />
                  <Wifi className="w-3.5 h-3.5 text-[#16A34A] absolute -top-1.5 -right-1.5" />
                </div>
                {/* Green Connected Indicator Dot */}
                <div className="w-3 h-3 bg-[#16A34A] border-2 border-white rounded-full absolute -bottom-0.5 -right-0.5 shadow-2xs" />
              </div>

              {/* Node Information */}
              <div className="flex flex-col">
                <h3 className="font-bold text-[#0D3321] text-[16px] leading-snug">
                  KisanEdge Node
                </h3>
                <p className="text-[#64748B] text-[13px] font-medium mt-0.5">
                  {connState === "scanning" ? "Syncing telemetry..." : "Connected • 92% Battery"}
                </p>
              </div>
            </div>

            {/* Sync Status & Chevron */}
            <div className="flex items-center gap-2 pl-2">
              <div className="flex flex-col items-end">
                <span className="text-[10.5px] font-extrabold text-[#94A3B8] uppercase tracking-wider">
                  SYNC
                </span>
                <span className="text-[13px] font-bold text-[#15803D]">2m ago</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
            </div>
          </div>

          {/* 2x2 Sensor Metrics Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* 1. Soil Moisture Card */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 relative overflow-hidden flex flex-col justify-between h-[156px]">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]" />

              {/* Top Label & Icon */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Droplet className="w-5 h-5 fill-[#2563EB]/20" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#475569]">Soil Moisture</span>
              </div>

              {/* Value */}
              <div className="my-auto">
                <span className="text-[34px] font-black text-[#0D3321] tracking-tight leading-none">
                  31<span className="text-[18px] font-bold text-[#64748B] ml-0.5">%</span>
                </span>
              </div>

              {/* Pill Status Badge */}
              <div className="relative z-10">
                <span className="bg-[#FEF3C7] text-[#D97706] font-extrabold text-[11px] px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 shadow-2xs">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[9px] font-black leading-none">
                    !
                  </span>
                  <span>Attention</span>
                </span>
              </div>

              {/* Bottom Organic Wave Background */}
              <svg
                className="absolute bottom-0 right-0 w-32 h-12 text-[#FEF3C7]/60 pointer-events-none"
                viewBox="0 0 120 40"
                fill="currentColor"
              >
                <path d="M0,40 Q30,12 60,26 T120,8 L120,40 Z" />
              </svg>
            </div>

            {/* 2. Soil Temp Card */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 relative overflow-hidden flex flex-col justify-between h-[156px]">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#10B981]" />

              {/* Top Label & Icon */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-9 h-9 rounded-full bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0">
                  <Thermometer className="w-5 h-5" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#475569]">Soil Temp</span>
              </div>

              {/* Value */}
              <div className="my-auto">
                <span className="text-[34px] font-black text-[#0D3321] tracking-tight leading-none">
                  28<span className="text-[18px] font-bold text-[#64748B] ml-0.5">°C</span>
                </span>
              </div>

              {/* Pill Status Badge */}
              <div className="relative z-10">
                <span className="bg-[#DCFCE7] text-[#15803D] font-extrabold text-[11px] px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 shadow-2xs">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#15803D] text-white flex items-center justify-center text-[9px] font-black leading-none">
                    ✓
                  </span>
                  <span>Good</span>
                </span>
              </div>

              {/* Bottom Organic Wave Background */}
              <svg
                className="absolute bottom-0 right-0 w-32 h-12 text-[#DCFCE7]/70 pointer-events-none"
                viewBox="0 0 120 40"
                fill="currentColor"
              >
                <path d="M0,40 Q30,18 60,30 T120,12 L120,40 Z" />
              </svg>
            </div>

            {/* 3. Air Temp Card */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 relative overflow-hidden flex flex-col justify-between h-[156px]">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]" />

              {/* Top Label & Icon */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-9 h-9 rounded-full bg-[#FEF9C3] text-[#CA8A04] flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#475569]">Air Temp</span>
              </div>

              {/* Value */}
              <div className="my-auto">
                <span className="text-[34px] font-black text-[#0D3321] tracking-tight leading-none">
                  33<span className="text-[18px] font-bold text-[#64748B] ml-0.5">°C</span>
                </span>
              </div>

              {/* Pill Status Badge */}
              <div className="relative z-10">
                <span className="bg-[#FEF3C7] text-[#D97706] font-extrabold text-[11px] px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 shadow-2xs">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[9px] font-black leading-none">
                    !
                  </span>
                  <span>Monitor</span>
                </span>
              </div>

              {/* Bottom Organic Wave Background */}
              <svg
                className="absolute bottom-0 right-0 w-32 h-12 text-[#FEF3C7]/60 pointer-events-none"
                viewBox="0 0 120 40"
                fill="currentColor"
              >
                <path d="M0,40 Q30,12 60,26 T120,8 L120,40 Z" />
              </svg>
            </div>

            {/* 4. Humidity Card */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 relative overflow-hidden flex flex-col justify-between h-[156px]">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#10B981]" />

              {/* Top Label & Icon */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Droplet className="w-5 h-5 fill-[#2563EB]/20" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#475569]">Humidity</span>
              </div>

              {/* Value */}
              <div className="my-auto">
                <span className="text-[34px] font-black text-[#0D3321] tracking-tight leading-none">
                  76<span className="text-[18px] font-bold text-[#64748B] ml-0.5">%</span>
                </span>
              </div>

              {/* Pill Status Badge */}
              <div className="relative z-10">
                <span className="bg-[#DCFCE7] text-[#15803D] font-extrabold text-[11px] px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 shadow-2xs">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#15803D] text-white flex items-center justify-center text-[9px] font-black leading-none">
                    ✓
                  </span>
                  <span>Good</span>
                </span>
              </div>

              {/* Bottom Organic Wave Background */}
              <svg
                className="absolute bottom-0 right-0 w-32 h-12 text-[#DCFCE7]/70 pointer-events-none"
                viewBox="0 0 120 40"
                fill="currentColor"
              >
                <path d="M0,40 Q30,18 60,30 T120,12 L120,40 Z" />
              </svg>
            </div>
          </div>

          {/* AI Irrigation Status Hero Card */}
          <div className="rounded-3xl p-5 text-white shadow-md relative overflow-hidden bg-[#042813] mt-1">
            {/* Real Sprout Photograph on Right */}
            <img
              src="/sprout-irrigation.jpg"
              alt="Seedling Sprout"
              className="absolute top-0 right-0 bottom-0 w-[58%] h-full object-cover object-center pointer-events-none opacity-95"
            />

            {/* Gradient Mask over the image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#042813] via-[#042813]/90 to-transparent pointer-events-none" />

            {/* Content on top */}
            <div className="relative z-10 flex flex-col">
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/95 font-bold text-[13.5px] tracking-tight">
                  <Sparkles className="w-4 h-4 text-[#FBBF24] fill-[#FBBF24]" />
                  <span>AI Irrigation Status</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                  <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Smart Farming</span>
                </div>
              </div>

              {/* Status Dots Indicator in top right */}
              <div className="absolute top-0 right-0 -mt-2 -mr-1 flex items-center gap-1 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>

              {/* Headline */}
              <h2 className="text-[30px] font-black leading-tight tracking-tight mt-3.5 mb-1.5 text-white">
                Irrigate Now
              </h2>

              {/* Rationale Text */}
              <p className="text-white/80 text-[13px] leading-relaxed max-w-[85%] font-medium">
                Low soil moisture (31%) + high air temperature (33°C) + no significant rainfall
                expected today.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex gap-3">
                {/* Start Pump Button */}
                <button
                  onClick={togglePump}
                  className="bg-white hover:bg-gray-100 text-[#0D3321] font-extrabold h-12 px-5 rounded-2xl flex items-center justify-center gap-2 text-[14.5px] shadow-sm flex-1 cursor-pointer active:scale-95 transition-all"
                >
                  {isPumpActive ? (
                    <>
                      <Pause className="w-4 h-4 fill-[#EA580C] text-[#EA580C]" />
                      <span>Stop Pump</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-[#16A34A] text-[#16A34A]" />
                      <span>Start Pump</span>
                    </>
                  )}
                </button>

                {/* Remind Me Button */}
                <button
                  onClick={handleRemindMe}
                  className="bg-black/25 hover:bg-black/35 backdrop-blur-md border border-white/25 text-white font-bold h-12 px-5 rounded-2xl flex items-center justify-center gap-2 text-[14.5px] flex-1 cursor-pointer active:scale-95 transition-all"
                >
                  <Bell className="w-4 h-4 text-white" />
                  <span>Remind me</span>
                </button>
              </div>
            </div>
          </div>

          {/* 7-DAY FORECAST SECTION */}
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100/90 flex flex-col gap-3 mt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-extrabold text-[#0D3321]">7-Day Forecast</h3>
              <span className="text-[12px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                Live Outlook
              </span>
            </div>

            {/* Horizontal Forecast Scroll */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-2 px-2 hide-scrollbar">
              {FORECAST.map((day, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center min-w-[56px] py-2.5 px-1.5 rounded-2xl bg-[#F8FAF9] border border-gray-100/80 shrink-0 hover:border-emerald-200 transition-colors"
                >
                  <span className="text-[12.5px] font-bold text-[#64748B] mb-2">{day.day}</span>
                  <day.icon
                    className={cn(
                      "w-6 h-6 mb-2 shrink-0",
                      day.temp > 32 ? "text-amber-500" : day.prob > 50 ? "text-blue-500" : "text-emerald-600"
                    )}
                  />
                  <span className="text-[15px] font-extrabold text-[#0D3321] mb-1">
                    {day.temp}°
                  </span>
                  <span className="text-[10.5px] font-bold text-blue-500 flex items-center gap-0.5">
                    <CloudRain className="w-3 h-3" /> {day.prob}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI RISK ENGINE SECTION */}
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-extrabold text-[#0D3321] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                Risk Engine
              </h3>
              <span className="text-[11px] font-extrabold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Active Alerts
              </span>
            </div>

            {/* Engine Data Pipeline Diagram */}
            <div className="bg-[#ECFDF5] rounded-2xl p-3.5 border border-emerald-200/60 flex items-center justify-between text-[11px] font-extrabold text-[#0D3321] uppercase tracking-wider text-center">
              <div className="flex flex-col gap-1 items-center flex-1">
                <Cpu className="w-4 h-4 text-[#16A34A]" />
                <span>Sensor Data</span>
              </div>
              <div className="w-6 h-px bg-[#16A34A]/40" />
              <div className="flex flex-col gap-1 items-center flex-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Model</span>
              </div>
              <div className="w-6 h-px bg-[#16A34A]/40" />
              <div className="flex flex-col gap-1 items-center flex-1">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span>Realtime Alert</span>
              </div>
            </div>

            {/* 2x2 Risk Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* Disease Risk */}
              <div className="bg-white p-4 rounded-3xl border border-gray-100/90 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#64748B]">Disease Risk</span>
                  <span className="text-[14px] font-black text-red-600 tracking-tight">HIGH</span>
                </div>
              </div>

              {/* Water Stress */}
              <div className="bg-white p-4 rounded-3xl border border-gray-100/90 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#64748B]">Water Stress</span>
                  <span className="text-[14px] font-black text-amber-600 tracking-tight">MODERATE</span>
                </div>
              </div>

              {/* Flood Risk */}
              <div className="bg-white p-4 rounded-3xl border border-gray-100/90 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <Waves className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#64748B]">Flood Risk</span>
                  <span className="text-[14px] font-black text-blue-600 tracking-tight">LOW</span>
                </div>
              </div>

              {/* Heat Stress */}
              <div className="bg-white p-4 rounded-3xl border border-gray-100/90 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#64748B]">Heat Stress</span>
                  <span className="text-[14px] font-black text-orange-600 tracking-tight">MODERATE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
