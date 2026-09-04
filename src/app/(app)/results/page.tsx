"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle, ShieldAlert, ChevronRight, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import type { Diagnosis } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<Diagnosis | null>(null);

  useEffect(() => {
    // Read from localStorage
    const savedImage = localStorage.getItem("kisanedge_scan_image");
    const savedResultStr = localStorage.getItem("kisanedge_scan_result");
    
    if (savedImage) setImageSrc(savedImage);
    if (savedResultStr) {
      try {
        setResult(JSON.parse(savedResultStr));
      } catch (e) {
        console.error("Failed to parse result", e);
      }
    }
  }, []);

  if (!imageSrc || !result) {
    return (
      <div className="flex flex-col h-[100dvh] items-center justify-center p-6 text-center bg-[#f8faf9]">
        <div className="w-12 h-12 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading analysis results...</p>
      </div>
    );
  }

  const isHealthy = result.type === "healthy";
  
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f8faf9] pb-safe">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 pt-safe flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 rounded-full" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold text-lg text-[#0e3b1c]">Scan Results</h1>
      </header>

      <div className="flex-1 pb-10">
        {/* Image Banner */}
        <div className="relative w-full aspect-square md:aspect-video bg-black mx-auto overflow-hidden shadow-sm">
          <img src={imageSrc} alt="Scanned Plant" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="max-w-md mx-auto w-full px-4 -mt-12 relative z-10 flex flex-col gap-4">
          {/* Main Result Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              isHealthy ? "bg-emerald-100 text-emerald-600" :
              result.severity === "High" ? "bg-red-100 text-red-600" :
              "bg-amber-100 text-amber-600"
            }`}>
              {isHealthy ? <CheckCircle className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>
            <h2 className="text-[22px] font-bold text-[#0e3b1c] mb-3 leading-tight">
              {result.disease}
            </h2>
            <div className="flex items-center gap-6 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">AI Confidence</span>
                <span className="font-bold text-xl text-[#16a34a]">{result.confidence}%</span>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Severity</span>
                <span className={`font-bold text-xl ${
                  isHealthy ? "text-emerald-500" :
                  result.severity === "High" ? "text-red-500" :
                  result.severity === "Moderate" ? "text-amber-500" : "text-blue-500"
                }`}>{result.severity}</span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps / Information */}
          {!isHealthy && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-3 mt-4">
              <h3 className="font-bold text-[#0e3b1c] px-1 text-[19px]">Recommended Actions</h3>
              
              <Link href="/treatment">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#16a34a]/30 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 bg-blue-50 rounded-[14px] flex items-center justify-center text-blue-600">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0e3b1c] text-[15px]">Get Treatment Plan</h4>
                      <p className="text-[13px] text-gray-500 mt-0.5">View organic and chemical cures</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>

              <Link href="/expert">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#16a34a]/30 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 bg-indigo-50 rounded-[14px] flex items-center justify-center text-indigo-600">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0e3b1c] text-[15px]">Consult an Expert</h4>
                      <p className="text-[13px] text-gray-500 mt-0.5">Talk to an agronomist</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-col gap-3">
            <Link href="/home" className="w-full">
              <Button size="lg" className="w-full h-14 rounded-[16px] font-bold text-lg bg-[#16a34a] hover:bg-[#15803d] shadow-md">
                Return to Dashboard
              </Button>
            </Link>
            <Link href="/scan" className="w-full">
              <Button size="lg" variant="outline" className="w-full h-14 rounded-[16px] font-bold text-lg text-gray-600 bg-transparent border-gray-300 hover:bg-gray-50">
                Scan Another Plant
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
