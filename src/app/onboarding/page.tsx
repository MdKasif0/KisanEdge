"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, MapPin, Bell, Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import { LANGUAGES, LanguageCode } from "@/lib/i18n/translations";
import { storage } from "@/lib/storage";
import { FARM_CROPS, HOME_PLANTS } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";

// --- Components ---

function StepWelcome({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full bg-brand-primary">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md mb-8 shadow-inner">
          <Leaf className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">KisanEdge</h1>
        <p className="text-lg text-white/90 mb-8 max-w-xs">{t("onboarding.welcome.tagline")}</p>
        <p className="text-sm text-white/70 max-w-xs">{t("onboarding.welcome.desc")}</p>
      </div>
      <div className="bg-white p-6 rounded-t-3xl pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
          <Button size="lg" className="w-full text-lg h-14 rounded-2xl" onClick={onNext}>
            {t("onboarding.welcome.start")}
          </Button>
          <Button variant="ghost" className="w-full text-gray-500 hover:bg-gray-50" onClick={() => {
            storage.set("kisanedge_onboarded", true);
            window.location.href = "/home";
          }}>
            {t("onboarding.welcome.skip")}
          </Button>
        </div>
      </div>
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
