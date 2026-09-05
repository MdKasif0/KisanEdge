"use client";

import { ScanLine, Thermometer, CloudSun, Droplet, CalendarDays, Leaf, FlaskConical, Activity, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/context";

const TOOLS = [
  {
    id: "scanner",
    title: "Disease Scanner",
    desc: "AI-powered crop diagnosis",
    icon: ScanLine,
    color: "bg-emerald-50 text-emerald-600",
    href: "/scan"
  },
  {
    id: "soil",
    title: "Soil Check",
    desc: "Analyze moisture & nutrients",
    icon: Thermometer,
    color: "bg-orange-50 text-orange-600",
    href: "/environment"
  },
  {
    id: "weather",
    title: "Weather",
    desc: "Hyper-local forecasts",
    icon: CloudSun,
    color: "bg-blue-50 text-blue-600",
    href: "/weather"
  },
  {
    id: "irrigation",
    title: "Irrigation Advisor",
    desc: "Smart watering schedules",
    icon: Droplet,
    color: "bg-cyan-50 text-cyan-600",
    href: "#"
  },
  {
    id: "calendar",
    title: "Crop Calendar",
    desc: "Stage-wise planning",
    icon: CalendarDays,
    color: "bg-purple-50 text-purple-600",
    href: "#"
  },
  {
    id: "care",
    title: "Plant Care",
    desc: "Daily growth insights",
    icon: Leaf,
    color: "bg-green-50 text-green-600",
    href: "#"
  },
  {
    id: "fertilizer",
    title: "Fertilizer Guidance",
    desc: "NPK recommendations",
    icon: FlaskConical,
    color: "bg-pink-50 text-pink-600",
    href: "#"
  },
  {
    id: "health",
    title: "Farm Health",
    desc: "Overall yield predictions",
    icon: Activity,
    color: "bg-indigo-50 text-indigo-600",
    href: "#"
  }
];

export default function ToolsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full bg-[#f8faf9] relative pb-24 overflow-y-auto">
      {/* Header */}
      <div className="pt-safe px-6 pb-2 bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center h-16">
          <h1 className="text-[24px] font-bold text-[#0e3b1c] tracking-tight">{t("nav.tools")}</h1>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-6">
        
        {/* Featured: Community */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/community" className="block relative overflow-hidden bg-gradient-to-br from-[#14532D] to-[#0e3b1c] rounded-[24px] p-5 text-white shadow-lg group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            <div className="flex justify-between items-start relative z-10">
              <div className="flex flex-col">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-emerald-300" />
                </div>
                <h2 className="text-[18px] font-bold text-white/90">KisanEdge Community</h2>
                <p className="text-[13px] text-white/70 mt-1 max-w-[200px]">Connect with farmers, ask questions, and share expertise.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Tools Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {TOOLS.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} href={tool.href} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow active:scale-95">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0e3b1c] text-[15px] leading-tight">{tool.title}</h3>
                  <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{tool.desc}</p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
