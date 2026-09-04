"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, MapPin, Bell, Search, Check, ArrowRight } from "lucide-react";
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
    <div className="flex flex-col h-full bg-background p-4 pb-safe">
      <div className="mt-8 mb-6 text-center">
        <h2 className="text-2xl font-bold text-brand-deep">{t("onboarding.lang.title")}</h2>
        <p className="text-gray-500 mt-2">{t("onboarding.lang.subtitle")}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {Object.entries(LANGUAGES).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code as LanguageCode);
                setTimeout(onNext, 300); // Small delay for visual feedback
              }}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-all",
                language === code 
                  ? "border-brand-primary bg-brand-soft shadow-sm" 
                  : "border-gray-100 bg-white hover:border-brand-primary/30"
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-lg text-brand-deep">{lang.nativeName}</span>
                {language === code && <Check className="w-5 h-5 text-brand-primary" />}
              </div>
              <span className="text-sm text-gray-500">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepRole({ onNext }: { onNext: (role: "farmer" | "home") => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full bg-background p-4 pb-safe">
      <div className="mt-8 mb-8 text-center">
        <h2 className="text-2xl font-bold text-brand-deep">{t("onboarding.role.title")}</h2>
      </div>
      <div className="flex-1 flex flex-col gap-4 max-w-md mx-auto w-full">
        <button
          onClick={() => onNext("farmer")}
          className="flex-1 bg-white border-2 border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:border-brand-primary hover:bg-brand-soft/30 transition-all active:scale-95 group"
        >
          <div className="w-24 h-24 bg-brand-soft rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
            🌾
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-brand-deep mb-1">{t("onboarding.role.farmer")}</h3>
            <p className="text-gray-500 text-sm">{t("onboarding.role.farmerDesc")}</p>
          </div>
        </button>
        <button
          onClick={() => onNext("home")}
          className="flex-1 bg-white border-2 border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:border-brand-primary hover:bg-brand-soft/30 transition-all active:scale-95 group"
        >
          <div className="w-24 h-24 bg-brand-soft rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
            🪴
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-brand-deep mb-1">{t("onboarding.role.home")}</h3>
            <p className="text-gray-500 text-sm">{t("onboarding.role.homeDesc")}</p>
          </div>
        </button>
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
    <div className="flex flex-col h-full bg-background p-4 pb-safe">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20" />
          <MapPin className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-brand-deep mb-3">{t("onboarding.loc.title")}</h2>
        <p className="text-gray-500 leading-relaxed mb-12">{t("onboarding.loc.desc")}</p>
      </div>
      <div className="flex flex-col gap-3 max-w-md mx-auto w-full">
        <Button size="lg" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl" onClick={handleAllow}>
          {t("onboarding.loc.allow")}
        </Button>
        <Button variant="ghost" className="w-full h-14 text-gray-500" onClick={onNext}>
          {t("onboarding.loc.deny")}
        </Button>
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
