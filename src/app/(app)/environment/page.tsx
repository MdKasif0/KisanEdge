"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Search,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ConnectionState = "disconnected" | "scanning" | "connected";

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
  const [connState, setConnState] = useState<ConnectionState>("connected");
  const [isPumpActive, setIsPumpActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConnect = () => {
    setConnState("scanning");
    showToast("Searching for nearby KisanEdge sensor node...");
    setTimeout(() => {
      setConnState("connected");
      showToast("KisanEdge Node connected • Telemetry loaded");
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnState("disconnected");
    showToast("Field sensor disconnected");
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
    if (connState !== "connected") {
      handleConnect();
      return;
    }
    setConnState("scanning");
    setTimeout(() => {
      setConnState("connected");
      showToast("Sensor telemetry updated successfully");
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8FAF9] font-sans relative select-none overflow-x-hidden">
      {/* Subtle Botanical Foliage Watermark in Upper Right */}
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none overflow-hidden z-0 opacity-40">
        <svg
          className="absolute -top-4 -right-4 w-52 h-52 text-[#16A34A]/10"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M190,10 Q140,50 80,65 Q130,25 190,10 Z" />
          <path d="M185,50 Q135,90 95,105 Q145,70 185,50 Z" opacity="0.8" />
          <path d="M170,85 Q120,125 75,135 Q125,105 170,85 Z" opacity="0.6" />
          <path d="M150,120 Q105,155 60,165 Q110,135 150,120 Z" opacity="0.5" />
          <path d="M125,150 Q85,180 40,190 Q90,165 125,150 Z" opacity="0.4" />
          <path d="M200,0 Q160,80 100,150" stroke="#16A34A" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
        </svg>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 z-[100] flex justify-center animate-fade-in">
          <div className="bg-[#0D3321] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm">
            <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="font-medium text-[13px]">{toastMessage}</span>
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
            <div className="w-[44px] h-[44px] bg-white rounded-2xl p-1 shadow-xs border border-gray-100 flex items-center justify-center shrink-0">
              <img
                src="/icon-512x512.png"
                alt="KisanEdge Clover"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[20px] font-bold text-[#0F3822] leading-tight tracking-tight">
                Field Sensor
              </h1>
              <p className="text-[12.5px] text-[#64748B] font-medium tracking-tight mt-0.5">
                Local weather & conditions
              </p>
            </div>
          </div>

          {/* Status Pill Badge */}
          {connState === "connected" && (
            <div className="bg-white/95 px-3 py-1.5 rounded-full border border-emerald-100/80 shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span className="text-[12px] font-semibold text-emerald-800">Online</span>
            </div>
          )}

          {connState === "scanning" && (
            <div className="bg-white/95 px-3 py-1.5 rounded-full border border-amber-200/60 shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[12px] font-semibold text-amber-700">Scanning</span>
            </div>
          )}

          {connState === "disconnected" && (
            <div className="bg-white/95 px-3 py-1.5 rounded-full border border-gray-200/60 shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-[12px] font-medium text-gray-500">Offline</span>
            </div>
          )}
        </header>

        {/* Main Body */}
        <div className="px-4 sm:px-5 mt-3 flex flex-col gap-4">
          {/* KisanEdge Node Status Card */}
          <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div
                onClick={handleSyncNode}
                className="flex items-center gap-3.5 cursor-pointer flex-1"
              >
                {/* IoT Chip Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] border border-emerald-100/80 flex items-center justify-center relative shrink-0">
                  <div className="relative">
                    <Cpu
                      className={cn(
                        "w-5 h-5 transition-colors",
                        connState === "connected"
                          ? "text-emerald-700"
                          : connState === "scanning"
                          ? "text-amber-500"
                          : "text-gray-400"
                      )}
                    />
                    <Wifi
                      className={cn(
                        "w-3 h-3 absolute -top-1 -right-1",
                        connState === "connected"
                          ? "text-emerald-600"
                          : connState === "scanning"
                          ? "text-amber-500 animate-pulse"
                          : "text-gray-300"
                      )}
                    />
                  </div>

                  {/* Connected Indicator Dot */}
                  {connState === "connected" && (
                    <div className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full absolute -bottom-0.5 -right-0.5" />
                  )}
                </div>

                {/* Node Information */}
                <div className="flex flex-col">
                  <h3 className="font-bold text-[#0F3822] text-[15.5px] leading-snug">
                    KisanEdge Node
                  </h3>
                  <p className="text-[#64748B] text-[12.5px] font-medium mt-0.5">
                    {connState === "connected" && "Connected • 92% Battery"}
                    {connState === "scanning" && "Scanning for sensor..."}
                    {connState === "disconnected" && "Disconnected • Tap to pair"}
                  </p>
                </div>
              </div>

              {/* Sync Status & Chevron / Disconnect button */}
              {connState === "connected" && (
                <div className="flex items-center gap-2 pl-2">
                  <div className="flex flex-col items-end cursor-pointer" onClick={handleSyncNode}>
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                      SYNC
                    </span>
                    <span className="text-[12.5px] font-semibold text-emerald-700">2m ago</span>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    title="Disconnect sensor"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors ml-1 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                  </button>
                </div>
              )}
            </div>

            {/* Simulation action buttons when not connected */}
            {connState === "disconnected" && (
              <button
                onClick={handleConnect}
                className="w-full mt-1 bg-[#0F3822] hover:bg-[#14472C] text-white rounded-2xl h-11 font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all text-[14px]"
              >
                <Wifi className="w-4 h-4" />
                <span>Connect Sensor</span>
              </button>
            )}

            {connState === "scanning" && (
              <div className="w-full mt-1 h-11 bg-[#F0FDF4] border border-emerald-100 rounded-2xl flex items-center justify-center gap-2.5 text-emerald-800 font-semibold text-[13.5px]">
                <Search className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Searching for KisanEdge Node (BLE)...</span>
              </div>
            )}
          </div>

          {/* TELEMETRY DATA & DASHBOARD (Rendered when connected) */}
          <AnimatePresence mode="wait">
            {connState === "connected" ? (
              <motion.div
                key="telemetry-dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4"
              >
                {/* 2x2 Sensor Metrics Grid - Refined Light Colors */}
                <div className="grid grid-cols-2 gap-3.5">
                  {/* 1. Soil Moisture Card */}
                  <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 relative overflow-hidden flex flex-col justify-between h-[154px]">
                    {/* Subtle top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-300/80" />

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <Droplet className="w-4 h-4 fill-sky-600/15" />
                      </div>
                      <span className="text-[13px] font-medium text-[#475569]">Soil Moisture</span>
                    </div>

                    <div className="my-auto">
                      <span className="text-[32px] font-extrabold text-[#0F3822] tracking-tight leading-none">
                        31<span className="text-[16px] font-semibold text-[#64748B] ml-0.5">%</span>
                      </span>
                    </div>

                    <div className="relative z-10">
                      <span className="bg-amber-50/90 text-amber-800 border border-amber-200/50 font-semibold text-[11px] px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Attention</span>
                      </span>
                    </div>

                    {/* Gentle pastel wave watermark */}
                    <svg
                      className="absolute bottom-0 right-0 w-28 h-10 text-amber-100/35 pointer-events-none"
                      viewBox="0 0 120 40"
                      fill="currentColor"
                    >
                      <path d="M0,40 Q30,12 60,26 T120,8 L120,40 Z" />
                    </svg>
                  </div>

                  {/* 2. Soil Temp Card */}
                  <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 relative overflow-hidden flex flex-col justify-between h-[154px]">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-400/80" />

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600/80 flex items-center justify-center shrink-0">
                        <Thermometer className="w-4 h-4" />
                      </div>
                      <span className="text-[13px] font-medium text-[#475569]">Soil Temp</span>
                    </div>

                    <div className="my-auto">
                      <span className="text-[32px] font-extrabold text-[#0F3822] tracking-tight leading-none">
                        28<span className="text-[16px] font-semibold text-[#64748B] ml-0.5">°C</span>
                      </span>
                    </div>

                    <div className="relative z-10">
                      <span className="bg-emerald-50/90 text-emerald-800 border border-emerald-200/50 font-semibold text-[11px] px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Good</span>
                      </span>
                    </div>

                    <svg
                      className="absolute bottom-0 right-0 w-28 h-10 text-emerald-100/40 pointer-events-none"
                      viewBox="0 0 120 40"
                      fill="currentColor"
                    >
                      <path d="M0,40 Q30,18 60,30 T120,12 L120,40 Z" />
                    </svg>
                  </div>

                  {/* 3. Air Temp Card */}
                  <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 relative overflow-hidden flex flex-col justify-between h-[154px]">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-300/80" />

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Sun className="w-4 h-4" />
                      </div>
                      <span className="text-[13px] font-medium text-[#475569]">Air Temp</span>
                    </div>

                    <div className="my-auto">
                      <span className="text-[32px] font-extrabold text-[#0F3822] tracking-tight leading-none">
                        33<span className="text-[16px] font-semibold text-[#64748B] ml-0.5">°C</span>
                      </span>
                    </div>

                    <div className="relative z-10">
                      <span className="bg-amber-50/90 text-amber-800 border border-amber-200/50 font-semibold text-[11px] px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Monitor</span>
                      </span>
                    </div>

                    <svg
                      className="absolute bottom-0 right-0 w-28 h-10 text-amber-100/35 pointer-events-none"
                      viewBox="0 0 120 40"
                      fill="currentColor"
                    >
                      <path d="M0,40 Q30,12 60,26 T120,8 L120,40 Z" />
                    </svg>
                  </div>

                  {/* 4. Humidity Card */}
                  <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100/90 relative overflow-hidden flex flex-col justify-between h-[154px]">
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-400/80" />

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <Droplet className="w-4 h-4 fill-sky-600/15" />
                      </div>
                      <span className="text-[13px] font-medium text-[#475569]">Humidity</span>
                    </div>

                    <div className="my-auto">
                      <span className="text-[32px] font-extrabold text-[#0F3822] tracking-tight leading-none">
                        76<span className="text-[16px] font-semibold text-[#64748B] ml-0.5">%</span>
                      </span>
                    </div>

                    <div className="relative z-10">
                      <span className="bg-emerald-50/90 text-emerald-800 border border-emerald-200/50 font-semibold text-[11px] px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Good</span>
                      </span>
                    </div>

                    <svg
                      className="absolute bottom-0 right-0 w-28 h-10 text-emerald-100/40 pointer-events-none"
                      viewBox="0 0 120 40"
                      fill="currentColor"
                    >
                      <path d="M0,40 Q30,18 60,30 T120,12 L120,40 Z" />
                    </svg>
                  </div>
                </div>

                {/* AI Irrigation Status Hero Card - Refined Forest Green */}
                <div className="rounded-3xl p-5 text-white shadow-sm relative overflow-hidden bg-[#0F3822] mt-1">
                  <img
                    src="/sprout-irrigation.jpg"
                    alt="Seedling Sprout"
                    className="absolute top-0 right-0 bottom-0 w-[56%] h-full object-cover object-center pointer-events-none opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0F3822] via-[#0F3822]/90 to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-white/90 font-semibold text-[13px] tracking-tight">
                        <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                        <span>AI Irrigation Status</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/15 text-white/85 px-2.5 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-emerald-300" />
                        <span>Smart Farming</span>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center gap-1 opacity-60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    </div>

                    <h2 className="text-[28px] font-extrabold leading-tight tracking-tight mt-3 mb-1 text-white">
                      Irrigate Now
                    </h2>

                    <p className="text-white/75 text-[12.5px] leading-relaxed max-w-[85%] font-normal">
                      Low soil moisture (31%) + high air temperature (33°C) + no significant rainfall
                      expected today.
                    </p>

                    <div className="mt-4 flex gap-2.5">
                      <button
                        onClick={togglePump}
                        className="bg-white hover:bg-gray-50 text-[#0F3822] font-bold h-11 px-4 rounded-xl flex items-center justify-center gap-1.5 text-[13.5px] shadow-xs flex-1 cursor-pointer active:scale-95 transition-all"
                      >
                        {isPumpActive ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                            <span>Stop Pump</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                            <span>Start Pump</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleRemindMe}
                        className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium h-11 px-4 rounded-xl flex items-center justify-center gap-1.5 text-[13.5px] flex-1 cursor-pointer active:scale-95 transition-all"
                      >
                        <Bell className="w-3.5 h-3.5 text-white/80" />
                        <span>Remind me</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 7-DAY FORECAST SECTION - Professional Muted Tones */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-gray-100 flex flex-col gap-3 mt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[17px] font-bold text-[#0F3822]">7-Day Forecast</h3>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-[#F0FDF4] border border-emerald-100 px-2.5 py-0.5 rounded-full">
                      Live Outlook
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 hide-scrollbar">
                    {FORECAST.map((day, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center min-w-[54px] py-2 px-1 rounded-2xl bg-[#FAFCFA] border border-gray-100 shrink-0"
                      >
                        <span className="text-[12px] font-semibold text-[#64748B] mb-1.5">{day.day}</span>
                        <day.icon
                          className={cn(
                            "w-5 h-5 mb-1.5 shrink-0",
                            day.temp > 32 ? "text-amber-500/80" : day.prob > 50 ? "text-sky-500/80" : "text-emerald-600/70"
                          )}
                        />
                        <span className="text-[14px] font-bold text-[#1E293B] mb-0.5">
                          {day.temp}°
                        </span>
                        <span className="text-[10px] font-medium text-sky-700 flex items-center gap-0.5">
                          <CloudRain className="w-2.5 h-2.5" /> {day.prob}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI RISK ENGINE SECTION - Professional Calibrated Colors */}
                <div className="flex flex-col gap-2.5 mt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[17px] font-bold text-[#0F3822] flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-slate-700" />
                      Risk Engine
                    </h3>
                    <span className="text-[10.5px] font-semibold text-slate-700 bg-slate-100 border border-slate-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Active Telemetry
                    </span>
                  </div>

                  {/* Engine Pipeline Diagram */}
                  <div className="bg-[#F8FAF9] rounded-2xl p-3 border border-emerald-100/80 flex items-center justify-between text-[10.5px] font-semibold text-[#0F3822] uppercase tracking-wider text-center">
                    <div className="flex flex-col gap-1 items-center flex-1">
                      <Cpu className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Sensor Data</span>
                    </div>
                    <div className="w-6 h-px bg-emerald-200/60" />
                    <div className="flex flex-col gap-1 items-center flex-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>AI Model</span>
                    </div>
                    <div className="w-6 h-px bg-emerald-200/60" />
                    <div className="flex flex-col gap-1 items-center flex-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                      <span>Realtime Alert</span>
                    </div>
                  </div>

                  {/* 2x2 Risk Metric Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Disease Risk */}
                    <div className="bg-white p-3.5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-rose-50/90 text-rose-600 border border-rose-100/60 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11.5px] font-medium text-[#64748B]">Disease Risk</span>
                        <span className="text-[13px] font-bold text-rose-700 tracking-tight">HIGH</span>
                      </div>
                    </div>

                    {/* Water Stress */}
                    <div className="bg-white p-3.5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-amber-50/90 text-amber-600 border border-amber-100/60 flex items-center justify-center shrink-0">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11.5px] font-medium text-[#64748B]">Water Stress</span>
                        <span className="text-[13px] font-bold text-amber-700 tracking-tight">MODERATE</span>
                      </div>
                    </div>

                    {/* Flood Risk */}
                    <div className="bg-white p-3.5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-sky-50/90 text-sky-600 border border-sky-100/60 flex items-center justify-center shrink-0">
                        <Waves className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11.5px] font-medium text-[#64748B]">Flood Risk</span>
                        <span className="text-[13px] font-bold text-sky-700 tracking-tight">LOW</span>
                      </div>
                    </div>

                    {/* Heat Stress */}
                    <div className="bg-white p-3.5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-orange-50/90 text-orange-600 border border-orange-100/60 flex items-center justify-center shrink-0">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11.5px] font-medium text-[#64748B]">Heat Stress</span>
                        <span className="text-[13px] font-bold text-orange-700 tracking-tight">MODERATE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sensor-disconnected-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100 flex flex-col items-center text-center gap-3 mt-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1 max-w-xs">
                  <h3 className="font-bold text-[#0F3822] text-[16px]">No Telemetry Stream</h3>
                  <p className="text-gray-500 text-[12.5px] leading-relaxed">
                    Connect your IoT field node or environmental probe to begin live soil and climate monitoring.
                  </p>
                </div>
                <button
                  onClick={handleConnect}
                  className="mt-1 px-5 py-2 rounded-xl bg-[#0F3822] hover:bg-[#14472C] text-white font-semibold text-[13px] cursor-pointer active:scale-95 transition-all shadow-xs"
                >
                  Start Simulation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
