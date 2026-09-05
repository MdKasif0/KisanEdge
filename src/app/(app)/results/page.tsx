"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  ChevronRight,
  Info,
  Droplets,
  Activity,
  Sprout,
  Leaf,
  MessageSquare,
  Camera,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Thermometer,
  CloudRain,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
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
      // Normalize result if it came from legacy Diagnosis mock or real DiseaseDetectionResult
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
          confidence: savedResult.confidence || 94,
          severity: (savedResult.severity?.toLowerCase() || "moderate") as Severity,
          affectedAreaPercent: 28,
          observedSymptoms: savedResult.reasons || ["Target-like concentric rings on leaves", "Lower leaf yellowing"],
          explanation: savedResult.recommendation || "Visual pattern matches characteristic fungal symptoms.",
          alternativeConditions: [{ name: "Septoria leaf spot", reason: "Similar circular spots with necrotic margins" }],
          recommendedActions: savedResult.nextSteps || ["Inspect nearby plants", "Prune affected lower leaves", "Avoid overhead watering"],
          warnings: ["This is an AI visual assessment and not a laboratory-confirmed diagnosis."],
          needsBetterImage: false,
          expertVerificationRecommended: false,
          environmentalRisk: "high",
        });
      }
    } else {
      // Fallback demo scenario for testing
      setImageSrc("/crops/tomato.jpg");
      setResult({
        status: "disease_detected",
        plantDetected: true,
        plantType: "Tomato",
        plantPart: "leaf",
        conditionName: DEMO_DIAGNOSIS.disease,
        confidence: DEMO_DIAGNOSIS.confidence,
        severity: "moderate",
        affectedAreaPercent: 32,
        observedSymptoms: DEMO_DIAGNOSIS.reasons,
        explanation: "Visual symptoms and concentric ring lesions indicate probable early blight infection.",
        alternativeConditions: [{ name: "Septoria Leaf Spot", reason: "Can produce similar necrotic lesions on Solanaceous crops" }],
        recommendedActions: DEMO_DIAGNOSIS.nextSteps,
        warnings: ["This is an AI visual assessment and not a laboratory-confirmed diagnosis."],
        needsBetterImage: false,
        expertVerificationRecommended: false,
        environmentalRisk: "high",
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
        diagnosis: result.conditionName || (result.status === "healthy" ? "Healthy Plant" : "Observation"),
        confidence: result.confidence,
        severity: result.severity === "healthy" ? "Healthy" : (result.severity.charAt(0).toUpperCase() + result.severity.slice(1)),
        healthScore: result.status === "healthy" ? 96 : Math.max(30, 100 - (result.affectedAreaPercent || 30)),
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

  if (!result) {
    return (
      <div className="flex flex-col h-[100dvh] items-center justify-center p-6 text-center bg-[#f8faf9]">
        <div className="w-12 h-12 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading KisanEdge diagnosis...</p>
      </div>
    );
  }

  const isHealthy = result.status === "healthy" || result.severity === "healthy";
  const isNotPlant = result.status === "not_a_plant";
  const isPoorImage = result.status === "poor_image" || result.needsBetterImage;
  const isLowConfidence = result.confidence < 60;
  const isHighSeverity = result.severity === "severe" || result.severity === "critical";

  // Severity color mapping
  const severityBadgeColors: Record<string, string> = {
    healthy: "bg-emerald-100 text-emerald-800 border-emerald-200",
    early: "bg-amber-100 text-amber-800 border-amber-200",
    mild: "bg-yellow-100 text-yellow-800 border-yellow-200",
    moderate: "bg-orange-100 text-orange-800 border-orange-200",
    severe: "bg-red-100 text-red-800 border-red-200",
    critical: "bg-rose-100 text-rose-900 border-rose-300",
    unknown: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const activeBadgeColor = severityBadgeColors[result.severity] || severityBadgeColors.unknown;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f8faf9] pb-safe font-sans relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-4 right-4 z-[100] flex justify-center animate-fade-in">
          <div className="bg-[#14532D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm">
            <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="font-semibold text-[14px]">Diagnosis saved to scan history</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between shadow-2xs"
        style={{ paddingTop: "calc(var(--safe-top, 0px) + 14px)" }}
      >
        <div className="max-w-md mx-auto w-full flex items-center justify-between">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/scan")}>
            <ArrowLeft className="w-5 h-5 text-[#0e3b1c]" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-[17px] text-[#0e3b1c] tracking-tight">Plant Health Assessment</h1>
            <span className="text-[11px] font-semibold text-[#16a34a] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Groq Vision Intelligence
            </span>
          </div>
          <button
            onClick={handleSaveScan}
            title="Save to history"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isSaved ? "bg-emerald-50 text-emerald-600" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-emerald-600" : ""}`} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full p-4 flex flex-col gap-4 pb-32">
        {/* Image Preview & Crop Badge */}
        <div className="relative rounded-3xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-900 border border-gray-100 group">
          {imageSrc ? (
            <img src={imageSrc} alt="Scanned Plant" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <Camera className="w-12 h-12 opacity-30" />
            </div>
          )}

          {/* Overlay Plant Badge */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/10">
            <Leaf className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>{result.plantType || "Plant"}</span>
            {result.plantPart && <span className="text-white/60">• {result.plantPart}</span>}
          </div>

          {/* Retake Quick Action */}
          <button
            onClick={() => router.push("/scan")}
            className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rescan</span>
          </button>
        </div>

        {/* NOT A PLANT WARNING */}
        {isNotPlant && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 flex flex-col gap-2 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-[15px] text-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>No Plant Detected</span>
            </div>
            <p className="text-[13px] text-amber-800/90 leading-relaxed">{result.explanation}</p>
            <Button
              className="mt-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold self-start"
              onClick={() => router.push("/scan")}
            >
              Take photo of a plant
            </Button>
          </div>
        )}

        {/* POOR IMAGE QUALITY WARNING */}
        {isPoorImage && !isNotPlant && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-900 flex flex-col gap-2 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-[15px] text-blue-800">
              <Info className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Image Quality Insufficient for Diagnosis</span>
            </div>
            <p className="text-[13px] text-blue-800/90 leading-relaxed">{result.explanation}</p>
            <Button
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold self-start"
              onClick={() => router.push("/scan")}
            >
              Retake with closer focus
            </Button>
          </div>
        )}

        {/* HIGH SEVERITY CRITICAL WARNING */}
        {isHighSeverity && (
          <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-4 text-red-900 flex items-start gap-3 shadow-sm">
            <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-[15px] text-red-900">Significant Symptoms Detected</h3>
              <p className="text-[13px] text-red-800 mt-1 leading-snug">
                Consider isolating affected plants where appropriate to prevent spread, and seek local agricultural
                guidance for confirmed diagnosis and treatments.
              </p>
            </div>
          </div>
        )}

        {/* Primary Diagnosis Header Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {isHealthy ? "Plant Status" : "Observed Condition"}
              </span>
              <h2 className="text-[22px] font-bold text-[#14532D] leading-tight tracking-tight mt-0.5">
                {result.conditionName || (isHealthy ? "Healthy Plant" : "Under Observation")}
              </h2>
            </div>

            {/* Severity Pill */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${activeBadgeColor}`}
            >
              {result.severity}
            </span>
          </div>

          {/* AI Confidence & Affected Area Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
            {/* AI Confidence */}
            <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>AI Confidence</span>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[24px] font-extrabold text-[#14532D]">{result.confidence}%</span>
                <span className="text-[11px] text-gray-400 font-medium">score</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className={`h-full rounded-full ${
                    result.confidence >= 75
                      ? "bg-[#16a34a]"
                      : result.confidence >= 50
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Affected Area / Environmental Risk */}
            <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Affected Area</span>
                <Activity className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[24px] font-extrabold text-[#14532D]">
                  {result.affectedAreaPercent !== null ? `${result.affectedAreaPercent}%` : "—"}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">surface</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-500 font-semibold mt-1.5">
                <span>Env. Risk:</span>
                <span
                  className={`capitalize font-bold ${
                    result.environmentalRisk === "high"
                      ? "text-red-600"
                      : result.environmentalRisk === "moderate"
                      ? "text-amber-600"
                      : "text-[#16a34a]"
                  }`}
                >
                  {result.environmentalRisk}
                </span>
              </div>
            </div>
          </div>

          {/* Low confidence notice */}
          {isLowConfidence && !isNotPlant && (
            <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 text-amber-900 text-[12px] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Low-confidence visual result. Try taking a closer, well-lit photo of the affected leaf.</span>
            </div>
          )}
        </div>

        {/* Observed Symptoms Section */}
        {result.observedSymptoms && result.observedSymptoms.length > 0 && (
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3">
            <h3 className="font-bold text-[16px] text-[#14532D] flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#16A34A]" />
              Observed Visual Symptoms
            </h3>
            <ul className="space-y-2">
              {result.observedSymptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[14px] text-gray-700 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AI Explanation / Why KisanEdge AI Thinks This */}
        {result.explanation && (
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col gap-2.5">
            <h3 className="font-bold text-[16px] text-[#14532D] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#16A34A]" />
              Diagnostic Visual Reasoning
            </h3>
            <p className="text-[14px] text-gray-700 leading-relaxed">{result.explanation}</p>
          </div>
        )}

        {/* Alternative Possibilities */}
        {result.alternativeConditions && result.alternativeConditions.length > 0 && (
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3">
            <h3 className="font-bold text-[16px] text-[#14532D] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#16A34A]" />
              Alternative Possibilities
            </h3>
            <div className="space-y-2.5">
              {result.alternativeConditions.map((alt, idx) => (
                <div key={idx} className="bg-[#f8faf9] p-3 rounded-2xl border border-gray-100 flex flex-col gap-0.5">
                  <span className="font-bold text-[14px] text-gray-800">{alt.name}</span>
                  {alt.reason && <span className="text-[12.5px] text-gray-500 leading-snug">{alt.reason}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Actions */}
        {result.recommendedActions && result.recommendedActions.length > 0 && (
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3">
            <h3 className="font-bold text-[16px] text-[#14532D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              Recommended Next Steps
            </h3>
            <div className="space-y-2">
              {result.recommendedActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[14px] text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-snug">{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety & Compliance Disclaimer */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 text-[12px] text-gray-500 leading-relaxed flex flex-col gap-1.5">
          <span className="font-bold text-gray-700 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Agricultural Advisory Notice
          </span>
          <p>
            This is an AI visual assessment and not a laboratory-confirmed diagnosis. Never apply unauthorized chemical
            dosages. Always follow product labels and local agricultural extension guidance.
          </p>
        </div>
      </main>

      {/* Fixed Bottom Action Floating Bar */}
      <div className="fixed bottom-[74px] sm:bottom-[80px] left-0 right-0 bg-gradient-to-t from-[#f8faf9] via-[#f8faf9]/95 to-transparent pt-3 pb-2 px-4 z-30 pointer-events-none">
        <div className="max-w-md mx-auto flex gap-3 pointer-events-auto">
          {/* Ask KisanEdge AI button (Connects seamlessly to Assistant) */}
          <Button
            onClick={() => router.push("/assistant")}
            className="flex-1 h-13 rounded-2xl bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-[15px] shadow-[0_8px_20px_rgba(22,163,74,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask KisanEdge AI</span>
          </Button>

          {/* Scan Again */}
          <Button
            variant="outline"
            onClick={() => router.push("/scan")}
            className="h-13 px-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-semibold text-[14px] hover:bg-gray-50 shadow-2xs active:scale-95"
          >
            <Camera className="w-4 h-4 mr-1.5" />
            <span>Rescan</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
