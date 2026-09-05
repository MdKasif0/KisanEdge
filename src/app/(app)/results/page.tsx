"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  Info,
  Droplets,
  Thermometer,
  CloudRain,
  Sprout,
  Leaf,
  MessageSquare,
  Camera,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { DiseaseDetectionResult, Severity } from "@/types/disease";
import { DEMO_DIAGNOSIS } from "@/lib/demo-state";

export default function ResultsPage() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Read real scan result and image from localStorage
    const savedImage = storage.get<string | null>("kisanedge_scan_image", null);
    const savedResult = storage.get<any>("kisanedge_scan_result", null);

    if (savedImage) setImageSrc(savedImage);

    if (savedResult) {
      if (savedResult.status) {
        setResult(savedResult as DiseaseDetectionResult);
      } else {
        // Adapt legacy structure if any
        setResult({
          status: savedResult.type === "healthy" ? "healthy" : "disease_detected",
          plantDetected: true,
          plantType: "Tomato",
          plantPart: "leaf",
          conditionName: savedResult.disease || "Possible Early Blight",
          confidence: savedResult.confidence || 87,
          severity: (savedResult.severity?.toLowerCase() || "early") as Severity,
          affectedAreaPercent: 24,
          observedSymptoms: savedResult.reasons || [
            "Minor leaf spotting",
            "Slight discoloration on edges",
            "Fungal patterns observed",
          ],
          explanation:
            savedResult.recommendation ||
            "Improve air circulation around the plant and ensure leaves dry quickly after watering.",
          alternativeConditions: [
            { name: "Septoria Leaf Spot", reason: "Similar circular lesions on lower leaves" },
          ],
          recommendedActions: [
            "Check soil drainage",
            "Remove isolated affected leaves",
            "Monitor closely over the next week",
          ],
          warnings: ["This is an AI visual assessment and not a laboratory-confirmed diagnosis."],
          needsBetterImage: false,
          expertVerificationRecommended: false,
          environmentalRisk: "moderate",
        });
      }
    } else {
      // Fallback demo scenario matching reference screenshots
      setImageSrc("/crops/tomato.jpg");
      setResult({
        status: "disease_detected",
        plantDetected: true,
        plantType: "Tomato",
        plantPart: "leaf",
        conditionName: "Possible Fungal Infection detected",
        confidence: 87,
        severity: "early",
        affectedAreaPercent: 22,
        observedSymptoms: [
          "Minor leaf spotting",
          "Slight discoloration on edges",
          "Fungal patterns observed",
        ],
        explanation:
          "Improve air circulation around the plant and ensure leaves dry quickly after watering.",
        alternativeConditions: [
          { name: "Septoria Leaf Spot", reason: "Similar small concentric lesions on foliage" },
        ],
        recommendedActions: [
          "Check soil drainage",
          "Remove isolated affected leaves",
          "Monitor closely over the next week",
        ],
        warnings: ["This is an AI visual assessment and not a laboratory-confirmed diagnosis."],
        needsBetterImage: false,
        expertVerificationRecommended: false,
        environmentalRisk: "moderate",
      });
    }
  }, []);

  const handleSaveScan = () => {
    if (!result) return;
    try {
      const history = storage.get<any[]>("kisanedge_scan_history", []);
      const existingIdx = history.findIndex((h) => h.id === result.id);

      const historyItem = {
        id: result.id || `scan-${Date.now()}`,
        date: "Today, Just now",
        crop: result.plantType || "Plant",
        diagnosis:
          result.conditionName || (result.status === "healthy" ? "Healthy Plant" : "Observation"),
        confidence: result.confidence,
        severity:
          result.severity === "healthy"
            ? "Healthy"
            : result.severity.charAt(0).toUpperCase() + result.severity.slice(1),
        healthScore:
          result.status === "healthy" ? 96 : Math.max(30, 100 - (result.affectedAreaPercent || 25)),
        image: imageSrc,
        fullResult: result,
      };

      if (existingIdx >= 0) {
        history[existingIdx] = historyItem;
      } else {
        history.unshift(historyItem);
      }

      storage.set("kisanedge_scan_history", history.slice(0, 20));
      setIsSaved(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.warn("Error saving scan to history:", err);
    }
  };

  // Severity display configs
  const severityConfig = useMemo(() => {
    const sev = result?.severity || "early";
    switch (sev) {
      case "healthy":
        return {
          label: "HEALTHY",
          badgeBg: "bg-emerald-100",
          badgeText: "text-emerald-800",
          barColor: "bg-[#16A34A]",
          level: 0,
        };
      case "early":
        return {
          label: "EARLY SEVERITY",
          badgeBg: "bg-[#FFF7ED]",
          badgeText: "text-[#D97706]",
          barColor: "bg-[#F59E0B]",
          level: 1,
        };
      case "mild":
        return {
          label: "MILD SEVERITY",
          badgeBg: "bg-[#FEF3C7]",
          badgeText: "text-[#D97706]",
          barColor: "bg-[#F59E0B]",
          level: 1,
        };
      case "moderate":
        return {
          label: "MODERATE SEVERITY",
          badgeBg: "bg-[#FFF7ED]",
          badgeText: "text-[#EA580C]",
          barColor: "bg-[#EA580C]",
          level: 2,
        };
      case "severe":
      case "critical":
        return {
          label: "SEVERE RISK",
          badgeBg: "bg-rose-50",
          badgeText: "text-rose-700",
          barColor: "bg-red-600",
          level: 3,
        };
      default:
        return {
          label: "OBSERVED",
          badgeBg: "bg-gray-100",
          badgeText: "text-gray-700",
          barColor: "bg-gray-400",
          level: 1,
        };
    }
  }, [result?.severity]);

  // Vitality score (0 - 100)
  const vitalityScore = useMemo(() => {
    if (!result) return 78;
    if (result.status === "healthy") return 96;
    if (result.severity === "early") return 78;
    if (result.severity === "mild") return 74;
    if (result.severity === "moderate") return 62;
    if (result.severity === "severe" || result.severity === "critical") return 42;
    return Math.max(35, 100 - (result.affectedAreaPercent || 25));
  }, [result]);

  if (!result) {
    return (
      <div className="flex flex-col h-[100dvh] items-center justify-center p-6 text-center bg-[#F8FAF9]">
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading KisanEdge diagnosis...</p>
      </div>
    );
  }

  const cropTitle = `${result.plantType || "Tomato"} Diagnosis`;
  const symptoms =
    result.observedSymptoms && result.observedSymptoms.length > 0
      ? result.observedSymptoms
      : [
          "Minor leaf spotting",
          "Slight discoloration on edges",
          "Fungal patterns observed",
        ];

  const nextSteps =
    result.recommendedActions && result.recommendedActions.length > 0
      ? result.recommendedActions
      : [
          "Check soil drainage",
          "Remove isolated affected leaves",
          "Monitor closely over the next week",
        ];

  const envRiskLabel =
    result.environmentalRisk === "high"
      ? "HIGH DISEASE RISK"
      : result.environmentalRisk === "low"
      ? "LOW DISEASE RISK"
      : "MODERATE DISEASE RISK";

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8FAF9] font-sans relative select-none">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-4 right-4 z-[100] flex justify-center animate-fade-in">
          <div className="bg-[#0F3E2E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm">
            <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="font-semibold text-[14px]">Diagnosis saved to scan history</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between"
        style={{ paddingTop: "calc(var(--safe-top, 0px) + 10px)" }}
      >
        <button
          onClick={() => router.push("/scan")}
          className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#0D3321] hover:bg-gray-100 transition-colors cursor-pointer"
          title="Back to scanner"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-[#0D3321] font-bold text-[18px] tracking-tight">{cropTitle}</h1>

        <div className="w-10" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full flex flex-col pb-32">
        {/* Scanned Image Hero */}
        <div className="relative w-full aspect-[4/3] bg-gray-900 overflow-hidden">
          {imageSrc ? (
            <img src={imageSrc} alt="Scanned plant" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <Camera className="w-12 h-12 opacity-30" />
            </div>
          )}
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Overlapping Primary Diagnosis Card */}
        <div className="px-4 -mt-8 relative z-20">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
            {/* Top Row: Severity Pill + Circular AI Gauge */}
            <div className="flex items-center justify-between">
              <span
                className={`px-3.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase ${severityConfig.badgeBg} ${severityConfig.badgeText}`}
              >
                {severityConfig.label}
              </span>

              {/* Circular Gauge */}
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    className="stroke-gray-100"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    className="stroke-[#10B981] transition-all duration-1000 ease-out"
                    strokeWidth="3.5"
                    strokeDasharray={2 * Math.PI * 19}
                    strokeDashoffset={2 * Math.PI * 19 * (1 - result.confidence / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[13.5px] font-black text-gray-900 leading-none">
                    {result.confidence}%
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 leading-none mt-0.5">AI</span>
                </div>
              </div>
            </div>

            {/* Diagnosis Title */}
            <div>
              <h2 className="text-[#0D3321] text-[21px] font-extrabold leading-tight tracking-tight">
                {result.conditionName ||
                  (result.status === "healthy"
                    ? "Healthy Plant detected"
                    : "Possible Fungal Infection detected")}
              </h2>
            </div>

            {/* 4-Step Severity Bar */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex justify-between text-[10.5px] font-extrabold text-[#94A3B8] tracking-wider">
                <span className={severityConfig.level === 0 ? "text-[#16A34A]" : ""}>HEALTHY</span>
                <span className={severityConfig.level === 1 ? "text-[#D97706]" : ""}>EARLY</span>
                <span className={severityConfig.level === 2 ? "text-[#EA580C]" : ""}>MODERATE</span>
                <span className={severityConfig.level === 3 ? "text-red-600" : ""}>SEVERE</span>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden flex gap-1 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    severityConfig.level >= 0 ? severityConfig.barColor : "bg-transparent"
                  }`}
                  style={{
                    width:
                      severityConfig.level === 0
                        ? "25%"
                        : severityConfig.level === 1
                        ? "50%"
                        : severityConfig.level === 2
                        ? "75%"
                        : "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Why KisanEdge Flagged This */}
        <div className="px-4 mt-6 flex flex-col gap-2.5">
          <h3 className="text-[#0D3321] font-bold text-[18px]">Why KisanEdge flagged this</h3>
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 flex flex-col gap-3.5">
            {symptoms.map((symptom, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-[#1E293B] font-medium text-[14.5px] leading-snug">
                  {symptom}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Crop Health Focus */}
        <div className="px-4 mt-6 flex flex-col gap-2.5">
          <h3 className="text-[#0D3321] font-bold text-[18px]">Crop Health Focus</h3>

          {/* Vitality Score Card */}
          <div className="bg-gradient-to-r from-[#15803D] via-[#166534] to-[#14532D] rounded-3xl p-5 text-white shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between relative z-10">
              <div>
                <span className="text-[#A7F3D0] text-[11.5px] font-extrabold tracking-wider uppercase block">
                  VITALITY SCORE
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[44px] font-black leading-none">{vitalityScore}</span>
                  <span className="text-white/60 text-lg font-bold">/100</span>
                </div>
              </div>

              {/* Pulse ECG Watermark */}
              <div className="relative flex items-center justify-center pr-2">
                <svg
                  className="w-20 h-12 text-emerald-300/80"
                  viewBox="0 0 100 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 25h20l5-12 7 26 7-20 6 10 5-4h20" />
                </svg>
                <Leaf className="w-24 h-24 text-white/5 absolute -right-4 -bottom-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Environmental Risk */}
        <div className="px-4 mt-6 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[#0D3321] font-bold text-[18px]">Environmental Risk</h3>
            <span className="bg-[#FEF3C7] text-[#B45309] font-bold text-[10.5px] px-3 py-1 rounded-full uppercase tracking-wider">
              {envRiskLabel}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 flex flex-col gap-4">
            {/* 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Temp */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-400 text-[10.5px] font-extrabold uppercase tracking-wider block">
                    TEMP
                  </span>
                  <span className="text-[#0F172A] font-bold text-[16px]">25°C</span>
                </div>
              </div>

              {/* Humidity */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-400 text-[10.5px] font-extrabold uppercase tracking-wider block">
                    HUMIDITY
                  </span>
                  <span className="text-[#0F172A] font-bold text-[16px]">75%</span>
                </div>
              </div>

              {/* Soil Moisture */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FEF9C3] text-[#CA8A04] flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-400 text-[10.5px] font-extrabold uppercase tracking-wider block">
                    SOIL MOISTURE
                  </span>
                  <span className="text-[#0F172A] font-bold text-[16px]">Moderate</span>
                </div>
              </div>

              {/* Rain Prob. */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#ECFEFF] text-[#0891B2] flex items-center justify-center shrink-0">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-400 text-[10.5px] font-extrabold uppercase tracking-wider block">
                    RAIN PROB.
                  </span>
                  <span className="text-[#0F172A] font-bold text-[16px]">40%</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="flex items-start gap-2.5 pt-3 border-t border-gray-100 text-[13px] text-gray-600 leading-relaxed">
              <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span>
                Moderate humidity could allow existing fungal spores to slowly progress if ventilation is
                poor.
              </span>
            </div>
          </div>
        </div>

        {/* Section: KisanEdge Recommendation */}
        <div className="px-4 mt-6 flex flex-col gap-2.5">
          <h3 className="text-[#0D3321] font-bold text-[18px]">KisanEdge Recommendation</h3>
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-3xl p-5 shadow-2xs relative overflow-hidden">
            <p className="text-[#064E3B] font-semibold text-[15px] leading-relaxed relative z-10">
              {result.explanation ||
                "Improve air circulation around the plant and ensure leaves dry quickly after watering."}
            </p>
            <ShieldCheck className="w-20 h-20 text-[#10B981]/15 absolute -right-3 -bottom-3 pointer-events-none" />
          </div>
        </div>

        {/* Section: Next Steps */}
        <div className="px-4 mt-6 flex flex-col gap-2.5">
          <h3 className="text-[#0D3321] font-bold text-[18px]">Next Steps</h3>
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 flex flex-col gap-4">
            {nextSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold text-[12px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <span className="text-[#1E293B] font-medium text-[14.5px] leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Plant Health Timeline */}
        <div className="px-4 mt-6 flex flex-col gap-2.5">
          <h3 className="text-[#0D3321] font-bold text-[18px]">Plant Health Timeline</h3>
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 flex flex-col">
            {/* Step 1: TODAY */}
            <div className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-100 shrink-0 mt-1" />
                <div className="w-0.5 bg-gray-200 flex-1 my-1" />
              </div>
              <div className="pb-5">
                <span className="text-[#15803D] font-extrabold text-[11px] uppercase tracking-wider block">
                  TODAY
                </span>
                <h4 className="text-gray-900 font-bold text-[15px] mt-0.5">
                  {result.conditionName || "Possible Fungal Infection detected"}
                </h4>
                <p className="text-gray-500 text-[13px] mt-0.5">Diagnostic scan completed</p>
              </div>
            </div>

            {/* Step 2: 3 DAYS AGO */}
            <div className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-slate-300 shrink-0 mt-1" />
                <div className="w-0.5 bg-gray-200 flex-1 my-1" />
              </div>
              <div className="pb-5">
                <span className="text-gray-400 font-extrabold text-[11px] uppercase tracking-wider block">
                  3 DAYS AGO
                </span>
                <h4 className="text-gray-800 font-bold text-[15px] mt-0.5">Heavy rainfall detected</h4>
                <p className="text-gray-500 text-[13px] mt-0.5">45mm of rain logged locally</p>
              </div>
            </div>

            {/* Step 3: 12 DAYS AGO */}
            <div className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 mt-1" />
              </div>
              <div>
                <span className="text-gray-400 font-extrabold text-[11px] uppercase tracking-wider block">
                  12 DAYS AGO
                </span>
                <h4 className="text-gray-800 font-bold text-[15px] mt-0.5">Healthy scan</h4>
                <p className="text-gray-500 text-[13px] mt-0.5">No diseases detected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Action Buttons */}
        <div className="px-4 mt-7 flex flex-col gap-3">
          {/* Save Diagnosis */}
          <Button
            onClick={handleSaveScan}
            className="w-full h-14 rounded-2xl bg-[#0F3E2E] hover:bg-[#134E39] active:scale-[0.99] text-white font-bold text-[16px] shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{isSaved ? "Diagnosis Saved" : "Save Diagnosis"}</span>
          </Button>

          {/* Row of Ask AI & Scan New */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/assistant")}
              className="h-13 rounded-2xl bg-white border border-gray-200 text-gray-800 font-bold text-[14.5px] hover:bg-gray-50 shadow-2xs active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <span>Ask AI</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/scan")}
              className="h-13 rounded-2xl bg-white border border-gray-200 text-gray-800 font-bold text-[14.5px] hover:bg-gray-50 shadow-2xs active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-gray-600" />
              <span>Scan New</span>
            </Button>
          </div>

          {/* Retake photo link */}
          <div className="text-center pt-2 pb-6">
            <span className="text-[13px] text-gray-500">
              Not confident in this result?{" "}
              <button
                onClick={() => router.push("/scan")}
                className="text-[#16A34A] underline font-semibold hover:text-[#15803D] cursor-pointer"
              >
                Retake photo
              </button>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
