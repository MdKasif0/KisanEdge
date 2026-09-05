"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowLeft, AlertTriangle, CheckCircle, ShieldAlert, ChevronRight, Stethoscope,
  Info, Thermometer, Droplets, CloudRain, Activity, Check, Sprout, Leaf, MessageSquare, Camera
} from "lucide-react";
import { motion } from "framer-motion";
import type { Diagnosis } from "@/lib/mock-data";
import { DEMO_DIAGNOSIS } from "@/lib/demo-state";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
    // Fallback to demo data for hackathon demo
    if (!savedImage && !savedResultStr) {
      setResult(DEMO_DIAGNOSIS);
      setImageSrc("/farmer-placeholder.png");
    }
  }, []);

  if (!imageSrc || !result) {
    return (
      <div className="flex flex-col h-[100dvh] items-center justify-center p-6 text-center bg-[#f4f7f5]">
        <div className="w-12 h-12 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Analyzing diagnostic data...</p>
      </div>
    );
  }

  const isHealthy = result.severity === "Healthy";
  const isLowConfidence = result.confidence < 70;

  // Severity color mapping
  const severityColors = {
    Healthy: "bg-emerald-500",
    Early: "bg-amber-400",
    Moderate: "bg-orange-500",
    Severe: "bg-red-500"
  };

  const severityBgColors = {
    Healthy: "bg-emerald-50",
    Early: "bg-amber-50",
    Moderate: "bg-orange-50",
    Severe: "bg-red-50"
  };

  const severityTextColors = {
    Healthy: "text-emerald-700",
    Early: "text-amber-700",
    Moderate: "text-orange-700",
    Severe: "text-red-700"
  };

  const activeColor = severityColors[result.severity];
  const activeBg = severityBgColors[result.severity];
  const activeText = severityTextColors[result.severity];

  const severitySteps = ["Healthy", "Early", "Moderate", "Severe"];
  const currentStepIndex = severitySteps.indexOf(result.severity);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f4f7f5] pb-safe font-sans relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-4 right-4 z-[100] flex justify-center toast-enter">
          <div className="bg-[#14532D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm">
            <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="font-semibold text-[14px]">Diagnosis saved to history</span>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 pt-safe flex items-center justify-between shadow-sm">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 text-[#0e3b1c]" />
        </Button>
        <h1 className="font-bold text-[17px] text-[#0e3b1c] tracking-tight">Tomato Diagnosis</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <div className="flex-1 w-full max-w-md mx-auto">
        {/* Image Banner */}
        <div className="relative w-full h-[35vh] min-h-[250px] max-h-[350px] bg-black overflow-hidden shadow-inner sm:rounded-b-3xl">
          <img src={imageSrc} alt="Scanned Plant" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f7f5] via-transparent to-black/30" />
        </div>

        <div className="px-4 -mt-16 relative z-10 flex flex-col gap-6 pb-12">
          
          {/* Primary Diagnosis Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/50 shadow-sm ${activeBg} ${activeText}`}>
                {result.severity} SEVERITY
              </div>
              
              {/* Circular Confidence Visual */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-100" />
                  <circle 
                    cx="28" cy="28" r="24" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="150" 
                    strokeDashoffset={150 - (150 * result.confidence) / 100}
                    strokeLinecap="round"
                    className="text-[#16a34a] transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[14px] font-black text-[#0e3b1c]">{result.confidence}%</span>
                  <span className="text-[8px] font-bold text-gray-400 -mt-1">AI</span>
                </div>
              </div>
            </div>

            <h2 className="text-[24px] font-extrabold text-[#0e3b1c] leading-tight mb-2">
              {result.disease}
            </h2>

            {/* Severity Step Indicator */}
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                {severitySteps.map((step, idx) => (
                  <span key={step} className={`text-[10px] font-bold uppercase ${idx === currentStepIndex ? activeText : 'text-gray-400'}`}>
                    {step}
                  </span>
                ))}
              </div>
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden flex">
                {severitySteps.map((_, idx) => (
                  <div key={idx} className={`h-full flex-1 border-r border-white/50 last:border-0 ${idx <= currentStepIndex ? activeColor : 'bg-transparent'}`} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Low Confidence State */}
          {isLowConfidence && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 text-sm">Low AI Confidence</h4>
                <p className="text-xs text-amber-700 mt-1 mb-3 leading-relaxed">We're not confident enough to give a reliable result. Please capture another clear image in good lighting.</p>
                <Link href="/scan">
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl h-10 text-xs font-bold px-5 shadow-sm">
                    Retake Photo
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Why KisanEdge Flagged This */}
          {!isHealthy && result.reasons && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h3 className="font-extrabold text-[#0e3b1c] text-[17px] px-2 mb-3">Why KisanEdge flagged this</h3>
              <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
                <ul className="flex flex-col gap-3.5">
                  {result.reasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="bg-red-50 p-1.5 rounded-full shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-red-500 stroke-[4]" />
                      </div>
                      <span className="text-[14px] font-medium text-gray-700 leading-snug">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Crop Health Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="font-extrabold text-[#0e3b1c] text-[17px] px-2 mb-3 tracking-tight">Crop Health Focus</h3>
            <div className="bg-gradient-to-br from-[#16a34a] to-[#0e3b1c] rounded-[20px] p-5 shadow-md flex items-center justify-between text-white overflow-hidden relative">
              <Leaf className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
              <div className="relative z-10">
                <p className="text-white/80 text-[13px] font-semibold uppercase tracking-wider mb-1">Vitality Score</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-5xl font-black tracking-tighter">{result.healthScore}</span>
                  <span className="text-xl font-bold text-white/60">/100</span>
                </div>
              </div>
              <Activity className="w-12 h-12 text-white/80 relative z-10" />
            </div>
          </motion.div>

          {/* Environmental Risk */}
          {result.environmentalRisk && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 px-2 mb-3">
                <h3 className="font-extrabold text-[#0e3b1c] text-[17px]">Environmental Risk</h3>
                <span className={`${
                  result.environmentalRisk.riskLevel.includes('High') || result.environmentalRisk.riskLevel.includes('Critical') 
                    ? 'bg-red-100 text-red-600' 
                    : result.environmentalRisk.riskLevel.includes('Low') 
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-amber-100 text-amber-600'
                } text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                  {result.environmentalRisk.riskLevel}
                </span>
              </div>
              
              <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-50 p-2.5 rounded-2xl"><Thermometer className="w-5 h-5 text-orange-500" /></div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Temp</p>
                      <p className="font-bold text-gray-900 text-sm">{result.environmentalRisk.temp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2.5 rounded-2xl"><Droplets className="w-5 h-5 text-blue-500" /></div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Humidity</p>
                      <p className="font-bold text-gray-900 text-sm">{result.environmentalRisk.humidity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-50 p-2.5 rounded-2xl"><Sprout className="w-5 h-5 text-amber-600" /></div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Soil Moisture</p>
                      <p className="font-bold text-gray-900 text-sm">{result.environmentalRisk.moisture}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-50 p-2.5 rounded-2xl"><CloudRain className="w-5 h-5 text-cyan-600" /></div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Rain Prob.</p>
                      <p className="font-bold text-gray-900 text-sm">{result.environmentalRisk.rain}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{result.environmentalRisk.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recommendation */}
          {result.recommendation && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="font-extrabold text-[#0e3b1c] text-[17px] px-2 mb-3">KisanEdge Recommendation</h3>
              <div className="bg-emerald-50 border border-emerald-200 rounded-[20px] p-5 relative overflow-hidden shadow-sm">
                <ShieldAlert className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-100/60" />
                <p className="text-[14px] font-semibold text-emerald-900 leading-relaxed relative z-10">
                  {result.recommendation}
                </p>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          {result.nextSteps && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h3 className="font-extrabold text-[#0e3b1c] text-[17px] px-2 mb-3">Next Steps</h3>
              <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
                {result.nextSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5 border border-[#16a34a]/20">
                      {idx + 1}
                    </div>
                    <p className="text-[14px] font-medium text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Plant Health Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h3 className="font-extrabold text-[#0e3b1c] text-[17px] px-2 mb-3">Plant Health Timeline</h3>
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
              
              <div className="flex gap-4 relative">
                <div className="absolute left-2.5 top-3 bottom-0 w-[2px] bg-gray-100" />
                
                <div className="flex flex-col gap-6 relative z-10 w-full">
                  {/* Current Event */}
                  <div className="flex gap-4">
                    <div className={`w-5 h-5 rounded-full border-[4px] border-white ${activeBg} flex items-center justify-center shrink-0 shadow-sm`}>
                      <div className={`w-2 h-2 rounded-full ${activeColor}`} />
                    </div>
                    <div className="-mt-1 w-full">
                      <p className="text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-1">Today</p>
                      <p className="text-[14px] font-bold text-gray-900">{result.disease}</p>
                      <p className="text-[12px] text-gray-500 mt-1">Diagnostic scan completed</p>
                    </div>
                  </div>
                  
                  {/* Past Event 1 */}
                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full border-[4px] border-white bg-gray-200 shrink-0" />
                    <div className="-mt-1 w-full">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">3 days ago</p>
                      <p className="text-[14px] font-bold text-gray-700">Heavy rainfall detected</p>
                      <p className="text-[12px] text-gray-500 mt-1">45mm of rain logged locally</p>
                    </div>
                  </div>

                  {/* Past Event 2 */}
                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full border-[4px] border-white bg-emerald-200 shrink-0" />
                    <div className="-mt-1 w-full">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">12 days ago</p>
                      <p className="text-[14px] font-bold text-gray-700">Healthy scan</p>
                      <p className="text-[12px] text-gray-500 mt-1">No diseases detected</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-4 flex flex-col gap-3">
            <Button 
              size="lg" 
              className={`w-full h-[60px] rounded-2xl font-bold text-[17px] shadow-xl flex items-center justify-center gap-2 transition-all haptic-press ${
                isSaved ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#0e3b1c] hover:bg-[#0a2a14]'
              } text-white`}
              onClick={() => {
                setIsSaved(true);
                setShowToast(true);
                try {
                  localStorage.setItem('kisanedge_saved_diagnosis', JSON.stringify(result));
                } catch(e) {}
                setTimeout(() => setShowToast(false), 3000);
              }}
            >
              <CheckCircle className="w-5 h-5" /> {isSaved ? 'Diagnosis Saved' : 'Save Diagnosis'}
            </Button>
            
            <div className="flex gap-3">
              <Button size="lg" variant="outline" className="flex-1 h-[56px] rounded-2xl font-bold text-[15px] bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm transition-transform active:scale-[0.98]">
                <MessageSquare className="w-4 h-4 mr-2" /> Ask AI
              </Button>
              <Link href="/scan" className="flex-1">
                <Button size="lg" variant="outline" className="w-full h-[56px] rounded-2xl font-bold text-[15px] bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm transition-transform active:scale-[0.98]">
                  <Camera className="w-4 h-4 mr-2" /> Scan New
                </Button>
              </Link>
            </div>

            <div className="text-center mt-6 mb-4">
              <span className="text-[13px] text-gray-500 font-medium mr-2">Not confident in this result?</span>
              <Link href="/scan" className="text-[13px] font-bold text-[#16a34a] underline underline-offset-2">
                Retake photo
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
