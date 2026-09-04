"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, MapPin, Bell, Search, Check, ArrowRight, CloudSun, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import { LANGUAGES, LanguageCode } from "@/lib/i18n/translations";
import { storage } from "@/lib/storage";
import { FARM_CROPS, HOME_PLANTS } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";

// --- Components ---

function StepWelcome({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();

  const handleSkip = () => {
    storage.set("kisanedge_onboarded", true);
    window.location.href = "/home";
  };

  const rawSkip = t("onboarding.welcome.skip");
  const hasQuestion = rawSkip.includes("?");
  const skipPrefix = hasQuestion ? rawSkip.split("?")[0] + "?" : rawSkip;
  const skipAction = hasQuestion ? rawSkip.split("?")[1]?.trim() || "Skip" : "";

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-[#0e3b1c]">
      {/* High Definition Botanical Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-bottom pointer-events-none"
        style={{ backgroundImage: `url('/onboarding-bg-hd.png')` }}
      />

      {/* Top Section with Safe-area & Micro-typography */}
      <div className="relative z-10 pt-safe pt-6 px-6 flex justify-end">
        <div className="text-right pointer-events-none select-none">
          <p className="text-[10px] sm:text-[11px] font-normal tracking-[0.18em] uppercase text-white/60 leading-tight">
            Healthier Crops
          </p>
          <p className="text-[10px] sm:text-[11px] font-normal tracking-[0.18em] uppercase text-white/60 leading-tight mt-0.5">
            Brighter Tomorrows
          </p>
          <div className="w-5 h-[1px] bg-white/40 ml-auto mt-1 rounded-full" />
        </div>
      </div>

      {/* Hero Branding Section (Logo, Name, Tagline, Description) */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-4 sm:mt-6">
        {/* Animated Brand Logo Squircle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5 sm:mb-6"
        >
          <div className="w-[104px] h-[104px] sm:w-[114px] sm:h-[114px] rounded-[30px] bg-gradient-to-br from-[#a3e635] via-[#4ade80] to-[#16a34a] shadow-[0_16px_32px_rgba(20,83,45,0.45)] flex items-center justify-center relative overflow-hidden group">
            {/* Subtle inner highlight */}
            <div className="absolute inset-0 rounded-[30px] border-[1.5px] border-white/20 mix-blend-overlay" />
            <Leaf className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] text-white stroke-[2.5]" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-[36px] sm:text-[42px] font-bold text-white tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
        >
          KisanEdge
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-[19px] sm:text-[21px] font-semibold text-white/95 mt-2.5 tracking-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
        >
          {t("onboarding.welcome.tagline")}
        </motion.p>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14px] sm:text-[15px] font-normal text-white/80 mt-2.5 max-w-[285px] sm:max-w-[310px] leading-[1.45] drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
        >
          {t("onboarding.welcome.desc")}
        </motion.p>
      </div>

      {/* Middle Interactive / AI Scanner Ambient Space */}
      <div className="relative z-10 flex-1 w-full pointer-events-none mt-4">
        
        {/* Left side micro-text */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-[40%] left-[8%] text-left"
        >
          <p className="text-[8px] sm:text-[9px] font-medium tracking-[0.25em] text-white/50 leading-snug">
            PLANT CARE<br/>SMARTER<br/>FARMING<br/>BRIGHTER<br/>FUTURES
          </p>
          <div className="w-5 h-[1px] bg-white/30 mt-1.5" />
        </motion.div>

        {/* AI Scanner Reticle & Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute inset-x-0 bottom-[-5%] sm:bottom-0 h-48 sm:h-56 flex justify-center"
        >
          <div className="relative w-48 h-40 sm:w-56 sm:h-48 mt-4">
            {/* 4 Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[2px] border-l-[2px] border-white/80 rounded-tl-[16px]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[2px] border-r-[2px] border-white/80 rounded-tr-[16px]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[2px] border-l-[2px] border-white/80 rounded-bl-[16px]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[2px] border-r-[2px] border-white/80 rounded-br-[16px]" />
            
            {/* Animated Pulse */}
            <motion.div
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-2 bg-green-500/10 rounded-xl blur-md"
            />
          </div>

          {/* Connected AI Badge */}
          <div className="absolute top-[5%] right-[6%] sm:right-[12%] flex flex-col items-center">
            <svg className="absolute -left-[55px] sm:-left-[70px] top-4 w-[60px] sm:w-[75px] h-[30px]" style={{ pointerEvents: 'none' }}>
              <line x1="0" y1="30" x2="60" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
            <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 bg-[#16a34a]/40 backdrop-blur-md flex items-center justify-center shadow-lg">
              <Leaf className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_8px_white]" />
            </div>
            <p className="text-[8px] sm:text-[9px] text-white/70 mt-1.5 leading-[1.2] text-left ml-2">
              AI<br/>for a<br/>greener<br/>tomorrow
            </p>
          </div>
        </motion.div>
      </div>

      {/* Native Bottom Sheet Card */}
      <motion.div 
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-white rounded-t-[34px] sm:rounded-t-[38px] pt-3.5 pb-8 px-6 shadow-[0_-16px_45px_rgba(0,0,0,0.16)] pb-safe"
      >
        {/* Drag Handle Indicator */}
        <div className="w-11 h-1.5 bg-neutral-300 rounded-full mx-auto mb-5" />

        <div className="flex flex-col gap-3.5 max-w-md mx-auto w-full">
          {/* Primary CTA Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="w-full h-[58px] bg-[#16a34a] hover:bg-[#15803d] active:bg-[#15803d] text-white text-[17.5px] font-semibold rounded-[18px] flex items-center justify-center gap-2 shadow-[0_6px_22px_rgba(22,163,74,0.35)] transition-all cursor-pointer group"
          >
            <span>{t("onboarding.welcome.start")}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>

          {/* Secondary Skip Action */}
          <button
            onClick={handleSkip}
            className="w-full py-2 flex items-center justify-center text-[15px] text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            {hasQuestion ? (
              <>
                <span>{skipPrefix}</span>
                <span className="ml-1.5 text-[#16a34a] font-semibold hover:underline">{skipAction}</span>
              </>
            ) : (
              <span>{rawSkip}</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function StepLanguage({ onNext }: { onNext: () => void }) {
  const { t, language, setLanguage } = useTranslation();
  
  return (
    <div className="relative flex flex-col h-full bg-[#f8fcf9] pb-safe overflow-hidden">
      {/* Top Background Atmospheric Gradient */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#eaf5ef] to-transparent opacity-70 pointer-events-none" />

      {/* Subtle Botanical Decoration (Top Right) */}
      <div className="absolute top-[12%] right-[-10%] opacity-40 pointer-events-none select-none">
        <Leaf className="w-32 h-32 text-[#a3e635] rotate-[25deg]" strokeWidth={1} />
        <p className="absolute top-[40%] right-[35%] text-[11px] font-medium text-[#16a34a] -rotate-[15deg] whitespace-nowrap opacity-60">
          Farming<br/>Grows<br/>Together
        </p>
      </div>

      {/* Brand Header & Progress */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-safe mt-4 sm:mt-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] bg-[#16a34a] rounded-[16px] sm:rounded-[20px] flex items-center justify-center shadow-[0_8px_16px_rgba(22,163,74,0.25)]">
            <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[22px] sm:text-[24px] text-[#0e3b1c] tracking-tight leading-none">
              KisanEdge
            </span>
            <span className="text-[14px] sm:text-[15px] text-gray-500 mt-1">
              Smart care for every plant.
            </span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-[6px] sm:gap-[8px]">
          <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#16a34a]" />
          <div className="w-4 sm:w-5 h-[2px] bg-gray-200" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full bg-gray-200" />
          <div className="w-4 sm:w-5 h-[2px] bg-gray-200" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full bg-gray-200" />
          <div className="w-4 sm:w-5 h-[2px] bg-gray-200" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Main Heading & Subtitle */}
      <div className="relative z-10 px-6 sm:px-8 mt-8 sm:mt-10">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[34px] sm:text-[38px] font-bold text-[#0e3b1c] leading-[1.15] tracking-tight"
        >
          Choose your <span className="text-[#16a34a]">language</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[17px] sm:text-[19px] text-gray-500 font-medium mt-3"
        >
          You can change this anytime from Settings.
        </motion.p>
      </div>

      {/* Language Grid */}
      <div className="relative z-20 flex-1 overflow-y-auto px-6 sm:px-8 mt-6 sm:mt-8 pb-[180px] sm:pb-[200px]">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 w-full max-w-[600px] mx-auto">
          {Object.entries(LANGUAGES).map(([code, lang], i) => {
            const isSelected = language === code;
            return (
              <motion.button
                key={code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLanguage(code as LanguageCode)}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "relative flex flex-col justify-center items-start p-5 sm:p-6 h-[110px] sm:h-[125px] rounded-[20px] transition-all overflow-hidden border",
                  isSelected 
                    ? "bg-[#f2fdf5] border-[#16a34a] shadow-[0_6px_16px_rgba(22,163,74,0.12)]"
                    : "bg-white border-gray-100/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:bg-gray-50 hover:border-gray-200"
                )}
              >
                {/* Text Content */}
                <span className="font-bold text-[24px] sm:text-[26px] text-[#0e3b1c] z-10 leading-none mb-2">
                  {lang.nativeName}
                </span>
                <span className="text-[16px] sm:text-[17px] text-gray-500 font-medium z-10">
                  {lang.name}
                </span>
                
                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#16a34a] flex items-center justify-center shadow-md"
                  >
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3]" />
                  </motion.div>
                )}
                
                {/* Subtle Card Artwork Placeholder */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none overflow-hidden rounded-br-[20px] mix-blend-multiply">
                  <div className="w-full h-full bg-[#0e3b1c] rounded-full translate-x-8 translate-y-8" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating CTA Area */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        
        {/* Rolling Hills Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-[180px] sm:h-[220px] overflow-hidden opacity-30 z-0 flex items-end">
          <svg viewBox="0 0 1440 320" className="w-full min-w-[800px] absolute bottom-0 opacity-40">
            <path fill="#16a34a" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg viewBox="0 0 1440 320" className="w-full min-w-[800px] absolute bottom-[-20px] opacity-60">
            <path fill="#16a34a" fillOpacity="1" d="M0,192L60,202.7C120,213,240,235,360,234.7C480,235,600,213,720,208C840,203,960,213,1080,229.3C1200,245,1320,267,1380,277.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>

        {/* Action Button Container */}
        <div className="relative z-10 px-6 sm:px-8 pb-6 sm:pb-8 pt-10 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="w-full h-[56px] sm:h-[60px] bg-[#16a34a] hover:bg-[#15803d] text-white text-[17px] sm:text-[18px] font-semibold rounded-[16px] sm:rounded-[18px] shadow-[0_8px_24px_rgba(22,163,74,0.25)] flex justify-center items-center gap-2 group transition-colors"
          >
            Continue 
            <ArrowRight className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6"
          >
            <div className="h-[1px] flex-1 max-w-[40px] sm:max-w-[50px] bg-gray-200" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-[14px] sm:text-[15px] text-gray-500 font-medium">
              <Leaf className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#16a34a]" /> A greener tomorrow, in your language
            </div>
            <div className="h-[1px] flex-1 max-w-[40px] sm:max-w-[50px] bg-gray-200" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StepRole({ onNext }: { onNext: (role: "farmer" | "home") => void }) {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<"farmer" | "home">("farmer");

  const handleSelect = (role: "farmer" | "home") => {
    setSelectedRole(role);
    setTimeout(() => onNext(role), 350); // slight delay for visual feedback before proceeding
  };

  return (
    <div className="relative flex flex-col h-full bg-[#f8faf9] pb-safe overflow-y-auto">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src="/role-bg-placeholder.png" 
          alt="" 
          className="w-full h-full object-cover object-bottom opacity-60" 
        />
        {/* Subtle white gradient at top to ensure header/text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8faf9] via-[#f8faf9]/80 to-transparent h-[60%]" />
      </div>

      {/* Brand Header & Progress */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-safe mt-4 sm:mt-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] bg-[#16a34a] rounded-[16px] sm:rounded-[18px] flex items-center justify-center shadow-[0_8px_16px_rgba(22,163,74,0.25)]">
            <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[22px] sm:text-[24px] text-[#0e3b1c] tracking-tight leading-none">
              KisanEdge
            </span>
            <span className="text-[14px] sm:text-[15px] text-gray-500 mt-1 font-medium">
              Smart care for every plant.
            </span>
          </div>
        </div>

        {/* Progress Indicator (Step 2 Active) */}
        <div className="flex items-center gap-[6px] sm:gap-[8px]">
          <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#16a34a]" />
          <div className="w-4 sm:w-5 h-[2px] bg-[#16a34a]" />
          <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#16a34a]" />
          <div className="w-4 sm:w-5 h-[2px] bg-gray-200" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full bg-gray-200" />
          <div className="w-4 sm:w-5 h-[2px] bg-gray-200" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Main Heading & Subtitle */}
      <div className="relative z-10 px-6 sm:px-8 mt-8 sm:mt-10 mb-6 sm:mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[34px] sm:text-[38px] font-bold text-[#0e3b1c] leading-[1.15] tracking-tight"
        >
          How do you <span className="text-[#16a34a]">grow plants?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[17px] sm:text-[19px] text-[#64748b] font-medium mt-3"
        >
          This helps us personalize your experience.
        </motion.p>
      </div>

      {/* Main Content: Cards */}
      <div className="relative z-10 px-6 sm:px-8 flex flex-col gap-4 sm:gap-5 pb-24 max-w-[600px] mx-auto w-full">
        
        {/* Farmer Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect("farmer")}
          className={cn(
            "relative w-full flex items-center p-5 sm:p-6 rounded-[24px] sm:rounded-[28px] border-[2px] transition-all duration-200 text-left overflow-hidden h-[180px] sm:h-[200px]",
            selectedRole === "farmer" 
              ? "bg-[#f2fdf5] border-[#16a34a] shadow-[0_8px_24px_rgba(22,163,74,0.15)]"
              : "bg-white border-transparent shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          )}
        >
          {/* Left Image */}
          <div className="flex-shrink-0 w-[130px] h-[130px] sm:w-[145px] sm:h-[145px] rounded-full overflow-hidden z-10 bg-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <img src="/farmer-placeholder.png" alt="Farmer" className="w-full h-full object-cover" />
          </div>

          {/* Right Content */}
          <div className="flex flex-col ml-5 sm:ml-6 flex-1 z-10 h-full justify-center">
            {/* Recommended Badge */}
            <div className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#dcfce7] rounded-full mb-2.5">
              <Leaf className="w-3.5 h-3.5 text-[#16a34a]" />
              <span className="text-[#16a34a] text-[13px] sm:text-[14px] font-semibold tracking-wide">Recommended</span>
            </div>
            
            <span className="text-[26px] sm:text-[30px] font-bold text-[#0e3b1c] leading-none mb-2 tracking-tight uppercase">
              FARMER
            </span>
            <span className="text-[17px] sm:text-[19px] text-[#64748b] font-medium leading-snug">
              Grow crops in fields
            </span>
          </div>

          {/* Action Arrow */}
          <div className={cn(
            "absolute right-5 sm:right-6 w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm z-10",
            selectedRole === "farmer" 
              ? "bg-[#16a34a]" 
              : "bg-white border border-gray-200 text-[#16a34a]"
          )}>
            <ArrowRight className={cn(
              "w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]",
              selectedRole === "farmer" ? "text-white" : "text-[#16a34a]"
            )} />
          </div>
        </motion.button>

        {/* Home Grower Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect("home")}
          className={cn(
            "relative w-full flex items-center p-5 sm:p-6 rounded-[24px] sm:rounded-[28px] border-[2px] transition-all duration-200 text-left overflow-hidden h-[180px] sm:h-[200px]",
            selectedRole === "home" 
              ? "bg-[#f2fdf5] border-[#16a34a] shadow-[0_8px_24px_rgba(22,163,74,0.15)]"
              : "bg-white border-transparent shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          )}
        >
          {/* Left Image */}
          <div className="flex-shrink-0 w-[130px] h-[130px] sm:w-[145px] sm:h-[145px] rounded-full overflow-hidden z-10 bg-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <img src="/home-grower-placeholder.png" alt="Home Grower" className="w-full h-full object-cover" />
          </div>

          {/* Right Content */}
          <div className="flex flex-col ml-5 sm:ml-6 flex-1 z-10 h-full justify-center">
            <span className="text-[25px] sm:text-[29px] font-bold text-[#0e3b1c] leading-none mb-2 tracking-tight uppercase">
              HOME GROWER
            </span>
            <span className="text-[17px] sm:text-[19px] text-[#64748b] font-medium leading-[1.3] pr-12 sm:pr-14">
              Grow plants at home, in pots or a garden
            </span>
          </div>

          {/* Action Arrow */}
          <div className={cn(
            "absolute right-5 sm:right-6 w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm z-10",
            selectedRole === "home" 
              ? "bg-[#16a34a]" 
              : "bg-white border border-[#e5e7eb] text-[#64748b]"
          )}>
            <ArrowRight className={cn(
              "w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]",
              selectedRole === "home" ? "text-white" : "text-[#16a34a]"
            )} />
          </div>
        </motion.button>
      </div>

      {/* Bottom Brand Message */}
      <div className="relative z-10 mt-auto pb-6 sm:pb-8 flex items-center justify-center w-full px-6 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-3 sm:gap-4 w-full"
        >
          <div className="h-[1px] flex-1 max-w-[40px] sm:max-w-[50px] bg-gray-200" />
          <div className="flex items-center gap-1.5 sm:gap-2 text-[14px] sm:text-[16px] text-gray-500 font-medium">
            <Leaf className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#16a34a]" /> 
            Different spaces, same greener tomorrow.
          </div>
          <div className="h-[1px] flex-1 max-w-[40px] sm:max-w-[50px] bg-gray-200" />
        </motion.div>
      </div>
    </div>
  );
}

function StepLocation({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  
  const handleAllow = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          storage.set("kisanedge_loc", { lat: pos.coords.latitude, lng: pos.coords.longitude });
          onNext();
        },
        () => {
          // Fallback to default Indian location if denied
          storage.set("kisanedge_loc", { lat: 20.5937, lng: 78.9629, mock: true });
          onNext();
        }
      );
    } else {
      onNext();
    }
  };

  return (
    <div className="relative flex flex-col h-full bg-[#f8faf9] pb-safe overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src="/loc-bg-placeholder.png" 
          alt="" 
          className="w-full h-full object-cover object-bottom opacity-50" 
        />
        {/* Subtle white gradient at top to ensure header/text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8faf9] via-[#f8faf9]/70 to-transparent h-[60%]" />
      </div>

      {/* Brand Header & Progress */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-safe mt-4 sm:mt-6 flex-none">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] bg-[#16a34a] rounded-[14px] sm:rounded-[16px] flex items-center justify-center shadow-[0_8px_16px_rgba(22,163,74,0.25)]">
            <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[20px] sm:text-[22px] text-[#0e3b1c] tracking-tight leading-none">
              KisanEdge
            </span>
            <span className="text-[13px] sm:text-[14px] text-gray-500 mt-1 font-medium">
              Smart care for every plant.
            </span>
          </div>
        </div>

        {/* Progress Indicator (Step 3 Active) */}
        <div className="flex items-center gap-[6px] sm:gap-[8px]">
          <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#16a34a]" />
          <div className="w-4 sm:w-5 h-[2px] bg-[#16a34a]" />
          <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#16a34a]" />
          <div className="w-4 sm:w-5 h-[2px] bg-[#16a34a]" />
          <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-full bg-[#16a34a]" />
          <div className="w-4 sm:w-5 h-[2px] bg-gray-200" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Main Hero Image - flexible height to prevent scrolling */}
      <div className="relative z-10 flex-1 flex justify-center items-center w-full px-4 sm:px-6 min-h-[140px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[400px] h-[90%] max-h-[320px] flex items-center justify-center pointer-events-none mix-blend-multiply mx-auto"
        >
          <img src="/enable-loc-placeholder.png" alt="" className="w-full h-full object-contain drop-shadow-none" />
        </motion.div>
      </div>

      {/* Main Heading & Subtitle */}
      <div className="relative z-10 px-6 sm:px-8 text-center flex flex-col items-center flex-none">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[28px] sm:text-[34px] md:text-[38px] font-bold text-[#0e3b1c] leading-[1.15] tracking-tight max-w-[320px]"
        >
          Enable <span className="text-[#16a34a]">location</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15px] sm:text-[17px] md:text-[19px] text-[#64748b] font-medium mt-2 sm:mt-3 md:mt-4 max-w-[320px] leading-snug"
        >
          Use your location for local weather, crop conditions and personalized alerts.
        </motion.p>
      </div>

      {/* Benefit Row */}
      <div className="relative z-10 px-4 sm:px-8 mt-5 sm:mt-8 flex items-start justify-center gap-2 sm:gap-4 md:gap-6 w-full max-w-[400px] mx-auto flex-none">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center flex-1 text-center"
        >
          <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#dcfce7] flex items-center justify-center mb-2 sm:mb-3">
            <CloudSun className="w-5 h-5 sm:w-6 sm:h-6 text-[#16a34a] stroke-[2]" />
          </div>
          <span className="text-[13px] sm:text-[15px] text-[#64748b] font-medium leading-tight">
            Local<br/>weather
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center flex-1 text-center"
        >
          <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#dcfce7] flex items-center justify-center mb-2 sm:mb-3">
            <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-[#16a34a] stroke-[2]" />
          </div>
          <span className="text-[13px] sm:text-[15px] text-[#64748b] font-medium leading-tight">
            Crop<br/>conditions
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center flex-1 text-center"
        >
          <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#dcfce7] flex items-center justify-center mb-2 sm:mb-3">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-[#16a34a] stroke-[2]" />
          </div>
          <span className="text-[13px] sm:text-[15px] text-[#64748b] font-medium leading-tight">
            Personalized<br/>alerts
          </span>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="relative z-10 px-6 sm:px-8 mt-6 sm:mt-10 flex flex-col gap-3 sm:gap-4 w-full max-w-[400px] mx-auto mb-4 sm:mb-8 flex-none">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAllow}
          className="w-full h-[52px] sm:h-[60px] bg-[#16a34a] hover:bg-[#15803d] transition-colors rounded-[14px] sm:rounded-[18px] text-white flex items-center px-6 shadow-[0_8px_20px_rgba(22,163,74,0.25)]"
          aria-label="Allow location to get local weather, crop conditions, and personalized alerts."
        >
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="flex-1 text-[16px] sm:text-[19px] font-semibold text-center">Allow Location</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full h-[44px] flex items-center justify-center text-[#64748b] text-[15px] sm:text-[18px] font-medium hover:text-[#0e3b1c] transition-colors"
        >
          Not Now
        </motion.button>
      </div>

      {/* Bottom Brand Message */}
      <div className="relative z-10 flex items-center justify-center w-full px-6 pointer-events-none pb-4 sm:pb-8 flex-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center justify-center gap-3 sm:gap-4 w-full"
        >
          <div className="h-[1px] flex-1 max-w-[30px] sm:max-w-[40px] bg-gray-200" />
          <div className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-[16px] text-gray-500 font-medium">
            <Leaf className="w-4 h-4 sm:w-[16px] sm:h-[16px] text-[#16a34a]" /> 
            Smarter farming starts where you are
          </div>
          <div className="h-[1px] flex-1 max-w-[30px] sm:max-w-[40px] bg-gray-200" />
        </motion.div>
      </div>
    </div>
  );
}

function StepNotifications({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  
  const handleAllow = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(() => onNext());
    } else {
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background p-4 pb-safe">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20" />
          <Bell className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-brand-deep mb-3">{t("onboarding.notif.title")}</h2>
        <p className="text-gray-500 leading-relaxed mb-12">{t("onboarding.notif.desc")}</p>
      </div>
      <div className="flex flex-col gap-3 max-w-md mx-auto w-full">
        <Button size="lg" className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl" onClick={handleAllow}>
          {t("onboarding.notif.allow")}
        </Button>
        <Button variant="ghost" className="w-full h-14 text-gray-500" onClick={onNext}>
          {t("onboarding.notif.deny")}
        </Button>
      </div>
    </div>
  );
}

function StepCrops({ role, onFinish }: { role: "farmer" | "home"; onFinish: () => void }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  
  const data = role === "farmer" ? FARM_CROPS : HOME_PLANTS;
  const filtered = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleFinish = () => {
    storage.set("kisanedge_crops", Array.from(selected));
    onFinish();
  };

  return (
    <div className="flex flex-col h-full bg-background p-4 pb-safe">
      <div className="mt-8 mb-6 text-center max-w-md mx-auto w-full">
        <h2 className="text-2xl font-bold text-brand-deep">
          {role === "farmer" ? t("onboarding.crop.farmerTitle") : t("onboarding.crop.homeTitle")}
        </h2>
        <p className="text-gray-500 mt-2">
          {role === "farmer" ? t("onboarding.crop.farmerDesc") : t("onboarding.crop.homeDesc")}
        </p>
      </div>
      
      <div className="relative mb-6 max-w-md mx-auto w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pb-4">
          {filtered.map(plant => (
            <button
              key={plant.id}
              onClick={() => toggle(plant.id)}
              className={cn(
                "p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all",
                selected.has(plant.id)
                  ? "border-brand-primary bg-brand-soft shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200"
              )}
            >
              <div className="text-4xl">{plant.emoji}</div>
              <span className="font-semibold text-brand-deep text-sm">{plant.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 max-w-md mx-auto w-full bg-background">
        <Button 
          size="lg" 
          className="w-full h-14 rounded-2xl shadow-lg" 
          disabled={selected.size === 0}
          onClick={handleFinish}
        >
          {t("onboarding.crop.continue")} ({selected.size})
        </Button>
      </div>
    </div>
  );
}

// --- Main Controller ---

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [role, setRole] = useState<"farmer" | "home">("farmer");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const nextStep = () => {
    setDirection(1);
    setStep(s => s + 1);
  };

  const handleFinish = () => {
    storage.set("kisanedge_onboarded", true);
    storage.set("kisanedge_role", role);
    router.push("/home");
  };

  if (!mounted) return null;

  return (
    <div className="h-screen w-full overflow-hidden bg-background relative flex flex-col">
      {/* Progress Indicator */}
      {step > 1 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 z-50">
          <div 
            className="h-full bg-brand-primary transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      )}

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full h-full absolute inset-0"
        >
          {step === 1 && <StepWelcome onNext={nextStep} />}
          {step === 2 && <StepLanguage onNext={nextStep} />}
          {step === 3 && <StepRole onNext={(r) => { setRole(r); nextStep(); }} />}
          {step === 4 && <StepLocation onNext={nextStep} />}
          {step === 5 && <StepNotifications onNext={nextStep} />}
          {step === 6 && <StepCrops role={role} onFinish={handleFinish} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
