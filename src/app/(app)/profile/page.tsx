"use client";

import { useState } from "react";
import { UserCircle, Settings, ChevronRight, LogOut, MapPin, Globe, Bell, WifiOff, Cpu, Leaf, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/store/user-store";
import { useTranslation } from "@/lib/i18n/context";
import { LANGUAGES, LanguageCode } from "@/lib/i18n/translations";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const { name, role, location } = useUser();
  const { t, language, setLanguage } = useTranslation();
  
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col h-full bg-[#f8faf9] relative pb-24 overflow-y-auto">
      {/* Header */}
      <div className="pt-safe px-6 pb-2 bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center h-16">
          <h1 className="text-[24px] font-bold text-[#0e3b1c] tracking-tight">{t("profile.title")}</h1>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {/* Profile Info */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
            <span className="text-[#14532D] font-bold text-4xl">{name.charAt(0)}</span>
          </div>
          <h2 className="text-[22px] font-bold text-[#0e3b1c]">{name}</h2>
          <div className="flex items-center gap-1.5 mt-1 bg-gray-50 px-3 py-1 rounded-full">
            {role === "farmer" ? <Sprout className="w-4 h-4 text-[#16a34a]" /> : <Leaf className="w-4 h-4 text-[#16a34a]" />}
            <p className="text-[14px] text-gray-600 font-medium capitalize">{role === "farmer" ? "Commercial Farmer" : "Home Grower"}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="text-[14px] font-medium">{location}</span>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-wider px-2 mt-2">{t("profile.settings")}</h3>
          
          <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden flex flex-col divide-y divide-gray-50">
            
            {/* Language Selector */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-semibold text-gray-900">Language</span>
                  <span className="text-[13px] text-gray-500">{LANGUAGES[language]?.nativeName || "English"}</span>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#16a34a] focus:border-[#16a34a] block p-2.5 outline-none font-medium appearance-none"
              >
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <option key={code} value={code}>{lang.nativeName} ({lang.name})</option>
                ))}
              </select>
            </div>

            {/* Notifications */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-semibold text-gray-900">Notifications</span>
                  <span className="text-[13px] text-gray-500">Alerts & reminders</span>
                </div>
              </div>
              <SettingToggle checked={notifications} onChange={setNotifications} />
            </div>

            {/* Offline Mode */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <WifiOff className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-semibold text-gray-900">Offline Mode</span>
                  <span className="text-[13px] text-gray-500">Save data for field use</span>
                </div>
              </div>
              <SettingToggle checked={offlineMode} onChange={setOfflineMode} />
            </div>

            {/* Sensor Connectivity */}
            <Link href="/environment" className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-semibold text-gray-900">Sensors</span>
                  <span className="text-[13px] text-[#16a34a] font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" /> 1 Connected
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </Link>

          </div>
        </div>

        {/* Account Actions */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden flex flex-col divide-y divide-gray-50">
            <Link href="/settings" className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-[16px] font-medium text-gray-900">Account Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </Link>
            <button className="p-4 flex items-center justify-between hover:bg-red-50 transition-colors w-full text-left">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-[16px] font-medium text-red-600">Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) {
  return (
    <button 
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-[26px] rounded-full transition-colors flex-none ${checked ? 'bg-[#16a34a]' : 'bg-gray-200'}`}
    >
      <motion.div 
        layout
        className="w-5 h-5 bg-white rounded-full absolute top-[3px]"
        animate={{ left: checked ? 'calc(100% - 23px)' : '3px' }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
