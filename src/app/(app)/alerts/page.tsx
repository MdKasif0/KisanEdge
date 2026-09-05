"use client";

import { useState } from "react";
import { MOCK_ALERTS, AlertCategory, Alert } from "@/lib/mock-data";
import { 
  Bell, CheckCircle2, ChevronRight, Filter, Info, Settings, 
  ShieldAlert, AlertTriangle, Bug, CloudRain, ThermometerSun, 
  Waves, HeartPulse, Cpu, X, Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FilterTab = "All" | "Important" | "Disease" | "Weather" | "Care";

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();
  
  // Settings state (mock)
  const [settings, setSettings] = useState({
    disease: true,
    weather: true,
    irrigation: true,
    pest: true,
    care: true
  });

  const getFilteredAlerts = () => {
    return MOCK_ALERTS.filter(alert => {
      if (activeTab === "All") return true;
      if (activeTab === "Important") return alert.severity === "critical";
      if (activeTab === "Disease") return alert.category === "disease";
      if (activeTab === "Weather") return alert.category === "weather";
      if (activeTab === "Care") return alert.category === "care";
      return true;
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-100/50 border-red-200/50";
      case "warning": return "text-orange-600 bg-orange-100/50 border-orange-200/50";
      case "info": return "text-blue-600 bg-blue-100/50 border-blue-200/50";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getCategoryIcon = (category: AlertCategory, severity: string) => {
    const props = { className: "w-5 h-5" };
    switch (category) {
      case "disease": return <ShieldAlert {...props} />;
      case "pest": return <Bug {...props} />;
      case "weather": return <CloudRain {...props} />;
      case "heat": return <ThermometerSun {...props} />;
      case "flood": return <Waves {...props} />;
      case "care": return <HeartPulse {...props} />;
      case "sensor": return <Cpu {...props} />;
      case "irrigation": return <Waves {...props} />;
      default: 
        if (severity === "critical") return <ShieldAlert {...props} />;
        if (severity === "warning") return <AlertTriangle {...props} />;
        return <Info {...props} />;
    }
  };

  const tabs: FilterTab[] = ["All", "Important", "Disease", "Weather", "Care"];
  const filteredAlerts = getFilteredAlerts();

  return (
    <div className="flex flex-col h-full bg-[#f8faf9] relative">
      {/* Header */}
      <div className="pt-safe px-6 pb-2 flex-none bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-[24px] font-bold text-[#0e3b1c] tracking-tight">Alerts</h1>
            <p className="text-[13px] text-gray-500 font-medium">You have 2 unread alerts</p>
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-2 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-none px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                activeTab === tab 
                  ? "bg-[#0e3b1c] text-white shadow-md" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filteredAlerts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#0e3b1c]">All caught up!</h3>
                <p className="text-[14px] text-gray-500 mt-1">No alerts found for this filter.</p>
              </motion.div>
            ) : (
              filteredAlerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`relative p-4 rounded-2xl bg-white border shadow-sm ${!alert.isRead ? 'border-l-4 border-l-[#16a34a] border-y-gray-100 border-r-gray-100' : 'border-gray-100'}`}
                >
                  <div className="flex gap-3.5">
                    <div className={`w-10 h-10 rounded-full flex-none flex items-center justify-center border ${getSeverityColor(alert.severity)}`}>
                      {getCategoryIcon(alert.category, alert.severity)}
                    </div>
                    
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
                          {alert.title}
                        </h3>
                        <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap shrink-0">
                          {alert.date}
                        </span>
                      </div>
                      
                      {alert.relatedEntity && (
                        <div className="inline-block px-2 py-0.5 bg-gray-100 rounded text-[11px] font-medium text-gray-600 mb-2 mt-1">
                          {alert.relatedEntity}
                        </div>
                      )}
                      
                      <p className="text-[13px] text-gray-600 leading-relaxed mb-3 pr-2 mt-1">
                        {alert.description}
                      </p>
                      
                      {alert.action && (
                        <button 
                          onClick={() => {
                            if (alert.action === 'View Diagnosis' || alert.action === 'Inspect Plants') router.push('/scan');
                            else if (alert.action === 'View Forecast' || alert.action === 'Check Environment') router.push('/environment');
                            else if (alert.action === 'Review Irrigation' || alert.action === 'Turn on Irrigation') router.push('/environment');
                          }}
                          className="flex items-center gap-1 text-[13px] font-semibold text-[#16a34a] haptic-press"
                        >
                          {alert.action}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Settings Sheet (Modal) */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col max-h-[85vh] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
                <h2 className="text-[20px] font-bold text-[#0e3b1c]">Notification Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex flex-col gap-6">
                <SettingToggle 
                  title="Disease Alerts" 
                  description="Receive immediate warnings about potential fungal or bacterial infections."
                  icon={<ShieldAlert className="w-5 h-5 text-red-500" />}
                  checked={settings.disease}
                  onChange={(val) => setSettings({...settings, disease: val})}
                />
                <SettingToggle 
                  title="Pest Alerts" 
                  description="Get notified about insect activity in your fields or indoor plants."
                  icon={<Bug className="w-5 h-5 text-orange-500" />}
                  checked={settings.pest}
                  onChange={(val) => setSettings({...settings, pest: val})}
                />
                <SettingToggle 
                  title="Weather Warnings" 
                  description="Extreme weather warnings, frost alerts, and heavy rainfall."
                  icon={<CloudRain className="w-5 h-5 text-blue-500" />}
                  checked={settings.weather}
                  onChange={(val) => setSettings({...settings, weather: val})}
                />
                <SettingToggle 
                  title="Irrigation Updates" 
                  description="Alerts when soil moisture drops below safe thresholds."
                  icon={<Waves className="w-5 h-5 text-cyan-500" />}
                  checked={settings.irrigation}
                  onChange={(val) => setSettings({...settings, irrigation: val})}
                />
                <SettingToggle 
                  title="Plant Care Reminders" 
                  description="Daily or weekly reminders to water, fertilize, or rotate plants."
                  icon={<HeartPulse className="w-5 h-5 text-[#16a34a]" />}
                  checked={settings.care}
                  onChange={(val) => setSettings({...settings, care: val})}
                />
              </div>
              
              <div className="p-6 pt-2 pb-safe">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full h-12 bg-[#16a34a] rounded-xl text-white font-semibold text-[15px]"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingToggle({ 
  title, description, icon, checked, onChange 
}: { 
  title: string, description: string, icon: React.ReactNode, checked: boolean, onChange: (val: boolean) => void 
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <h4 className="text-[16px] font-semibold text-gray-900">{title}</h4>
          <p className="text-[13px] text-gray-500 leading-snug mt-1 max-w-[240px]">
            {description}
          </p>
        </div>
      </div>
      <button 
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-none mt-1 ${checked ? 'bg-[#16a34a]' : 'bg-gray-200'}`}
      >
        <motion.div 
          layout
          className="w-5 h-5 bg-white rounded-full absolute top-[2px]"
          animate={{ left: checked ? 'calc(100% - 22px)' : '2px' }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
