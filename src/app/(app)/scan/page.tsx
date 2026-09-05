"use client";

import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Upload,
  Zap,
  RefreshCcw,
  X,
  Scan,
  Image as ImageIcon,
  Sun,
  Maximize,
  Leaf,
  Check,
  Sparkles,
  AlertCircle,
  WifiOff,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/lib/store/user-store";
import { useTranslation } from "@/lib/i18n/context";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { DiseaseDetectionResult, DiseaseDetectionResponse } from "@/types/disease";
import { storage } from "@/lib/storage";

type ScanState = "idle" | "preview" | "analyzing";

const ANALYZING_STEPS = [
  "Uploading plant image...",
  "Inspecting image clarity & lighting...",
  "Detecting plant structure & foliage...",
  "Examining leaf symptoms & lesions...",
  "Comparing visual patterns with Groq Vision AI...",
  "Estimating severity & environmental risk...",
  "Finalizing KisanEdge diagnosis...",
];

const COMMON_CROPS = ["Tomato", "Wheat", "Rice", "Potato", "Maize", "Cotton", "Other"];

export default function ScanPage() {
  const router = useRouter();
  const { crops, location } = useUser();
  const { language } = useTranslation();

  const [scanState, setScanState] = useState<ScanState>("idle");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>(crops.length > 0 ? crops[0] : "Tomato");
  const [hasCamera, setHasCamera] = useState(true);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Monitor offline state
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Update default crop if user crops load
  useEffect(() => {
    if (crops.length > 0 && !selectedCrop) {
      setSelectedCrop(crops[0]);
    }
  }, [crops, selectedCrop]);

  useEffect(() => {
    if (scanState === "idle") {
      startCamera();
    }
    return () => stopCamera();
  }, [scanState, facingMode]);

  const startCamera = async () => {
    stopCamera();
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setHasCamera(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      if (facingMode === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setImageSrc(dataUrl);
      setScanState("preview");
      setErrorMessage(null);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so selecting the same file again triggers onChange
    e.target.value = "";

    // Check size limit client-side before reading
    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage("Please select an image smaller than 20 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) return;

      // Optimize image for fast and reliable AI vision analysis (1024px preserves lesion details while conserving token limits)
      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 1024;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimized = canvas.toDataURL("image/jpeg", 0.85);
            setImageSrc(optimized);
          } else {
            setImageSrc(rawDataUrl);
          }
        } catch {
          setImageSrc(rawDataUrl);
        }
        setScanState("preview");
        setErrorMessage(null);
        stopCamera();
      };
      img.onerror = () => {
        setErrorMessage("The selected file could not be read as an image. Please choose another photo.");
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => {
      setErrorMessage("Could not read the selected image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleRetake = () => {
    setImageSrc(null);
    setScanState("idle");
    setErrorMessage(null);
  };

  const handleAnalyze = async () => {
    if (!imageSrc || scanState === "analyzing") return;

    if (isOffline || !navigator.onLine) {
      setErrorMessage("You're offline. Connect to the internet to analyze a new plant image.");
      return;
    }

    setScanState("analyzing");
    setErrorMessage(null);
    setAnalysisStep(0);

    // Step animation timer for UI feedback
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < ANALYZING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    try {
      // Send real POST request to /api/ai/disease-detection
      const res = await fetch("/api/ai/disease-detection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageSrc,
          crop: selectedCrop,
          location,
          language,
        }),
      });

      const data: DiseaseDetectionResponse = await res.json();
      clearInterval(stepInterval);

      if (!res.ok || !data.success || !data.result) {
        const msg = data.error?.message || "Unable to analyze this image right now. Please try again.";
        throw new Error(msg);
      }

      const result: DiseaseDetectionResult = data.result;

      // Save to localStorage for Results page and History
      try {
        storage.set("kisanedge_scan_image", imageSrc);
        storage.set("kisanedge_scan_result", result);

        // Prepend to scan history
        const existingHistory = storage.get<any[]>("kisanedge_scan_history", []);
        const historyItem = {
          id: result.id || `scan-${Date.now()}`,
          date: "Today, Just now",
          crop: result.plantType || selectedCrop,
          diagnosis: result.conditionName || (result.status === "healthy" ? "Healthy Plant" : "Observation"),
          confidence: result.confidence,
          severity: result.severity === "healthy" ? "Healthy" : (result.severity.charAt(0).toUpperCase() + result.severity.slice(1)),
          healthScore: result.status === "healthy" ? 96 : Math.max(30, 100 - (result.affectedAreaPercent || 30)),
          image: imageSrc,
          fullResult: result,
        };
        storage.set("kisanedge_scan_history", [historyItem, ...existingHistory.slice(0, 19)]);
      } catch (storageErr) {
        console.warn("Storage quota exceeded or storage error:", storageErr);
      }

      // Navigate to Results page
      router.push("/results");
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error("[KisanEdge Disease AI Client Error]:", err);
      setScanState("preview");
      setErrorMessage(err?.message || "Unable to analyze image. Please try again with a clearer photo.");
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-black absolute inset-0 z-[100] overflow-hidden">
      <div className="w-full h-full max-w-md mx-auto relative flex flex-col bg-black overflow-hidden shadow-2xl">
        {/* Main View Area - EDGE TO EDGE */}
        <div className="absolute inset-0 w-full h-full bg-black z-0">
          {scanState === "idle" && hasCamera && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={cn(
                "absolute inset-0 w-full h-full object-cover",
                facingMode === "user" && "scale-x-[-1]"
              )}
            />
          )}

          {scanState === "idle" && !hasCamera && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center z-10">
              <Scan className="w-16 h-16 mb-4 opacity-50" />
              <h2 className="text-xl font-semibold mb-2">Camera Unavailable</h2>
              <p className="text-[#94A3B8]">Allow camera access or upload an existing photo from gallery.</p>
              <div className="flex gap-3 mt-6">
                <Button className="bg-[#16A34A] hover:bg-[#15803d]" onClick={startCamera}>
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Use Gallery
                </Button>
              </div>
            </div>
          )}

          {(scanState === "preview" || scanState === "analyzing") && imageSrc && (
            <img src={imageSrc} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>

        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
          <div className="h-36 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
          <div className="h-64 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        </div>

        {/* Header */}
        <header
          className="flex items-center justify-between p-4 z-20 absolute top-0 left-0 right-0"
          style={{ paddingTop: "calc(var(--safe-top, 0px) + 12px)" }}
        >
          <Link href="/home" className="shrink-0">
            <button className="w-11 h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex flex-col items-center flex-1 px-2">
            <h1 className="text-white font-bold text-[18px] sm:text-[20px] tracking-tight">Plant Disease Scanner</h1>
            <span className="text-white/80 text-[12px] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#16a34a]" /> Real Vision AI Detection
            </span>
          </div>
          <button
            className="w-11 h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 transition-colors shrink-0"
            onClick={() => setIsFlashActive(!isFlashActive)}
          >
            <div className="relative">
              <Zap
                className={cn(
                  "w-5 h-5 transition-colors",
                  isFlashActive ? "text-yellow-400 fill-yellow-400" : "text-white"
                )}
              />
              {isFlashActive && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#16A34A] rounded-full border border-black" />
              )}
            </div>
          </button>
        </header>

        {/* Error notification banner */}
        {errorMessage && (
          <div
            className={cn(
              "absolute top-[80px] left-4 right-4 z-30 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-lg flex items-center justify-between gap-2.5 text-[12.5px] animate-fade-in border",
              errorMessage.toLowerCase().includes("rate limit") || errorMessage.toLowerCase().includes("wait")
                ? "bg-amber-600/95 border-amber-400/40"
                : "bg-red-500/90 border-red-400/40"
            )}
          >
            <div className="flex items-center gap-2 flex-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {scanState === "preview" && imageSrc && (
                <button
                  onClick={handleAnalyze}
                  className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Retry Now
                </button>
              )}
              <button
                onClick={() => setErrorMessage(null)}
                className="text-white/80 hover:text-white text-xs font-semibold px-1.5 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Viewfinder Overlays */}
        {scanState === "idle" && hasCamera && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8 z-20">
            {/* AI Scanning Frame */}
            <div className="relative w-full aspect-[3/4] max-w-sm rounded-[28px] border border-white/20">
              {/* Animated Laser Line */}
              <div className="absolute inset-0 overflow-hidden rounded-[28px]">
                <motion.div
                  className="w-full h-0.5 bg-[#16A34A] shadow-[0_0_12px_2px_rgba(22,163,74,0.6)]"
                  animate={{ y: ["0%", "4000%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ top: "10%", position: "absolute" }}
                />
              </div>

              {/* Corner Accents */}
              <div className="absolute -top-0.5 -left-0.5 w-12 h-12 border-t-4 border-l-4 border-[#16A34A] rounded-tl-[28px] shadow-[0_0_8px_rgba(22,163,74,0.3)]" />
              <div className="absolute -top-0.5 -right-0.5 w-12 h-12 border-t-4 border-r-4 border-[#16A34A] rounded-tr-[28px] shadow-[0_0_8px_rgba(22,163,74,0.3)]" />
              <div className="absolute -bottom-0.5 -left-0.5 w-12 h-12 border-b-4 border-l-4 border-[#16A34A] rounded-bl-[28px] shadow-[0_0_8px_rgba(22,163,74,0.3)]" />
              <div className="absolute -bottom-0.5 -right-0.5 w-12 h-12 border-b-4 border-r-4 border-[#16A34A] rounded-br-[28px] shadow-[0_0_8px_rgba(22,163,74,0.3)]" />
            </div>

            {/* Instruction Pill */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shadow-lg flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#16A34A]" />
                <span className="text-white font-medium text-[14px]">Keep affected area inside frame</span>
              </div>

              {/* Smart Tips */}
              <div className="flex items-center gap-3 text-white/70 text-[12px] font-medium">
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5" /> Natural light
                </span>
                <span className="w-1 h-1 bg-white/30 rounded-full" />
                <span className="flex items-center gap-1">
                  <Maximize className="w-3.5 h-3.5" /> Clear focus
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Analyzing Overlay with real AI steps */}
        <AnimatePresence>
          {scanState === "analyzing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6"
            >
              <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

              {/* Green Scanning Gradient Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-[#16A34A]/0 via-[#16A34A]/25 to-[#16A34A]/0"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 mb-6 relative">
                  <motion.div className="absolute inset-0 border-4 border-[#16A34A]/30 rounded-full" />
                  <motion.div
                    className="absolute inset-0 border-4 border-transparent border-t-[#16A34A] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-[#16A34A] animate-pulse" />
                  </div>
                </div>

                <h3 className="text-white font-bold text-[22px] mb-1.5 tracking-tight">KisanEdge Vision AI</h3>
                <span className="text-[#86efac] text-[12px] font-semibold uppercase tracking-wider mb-4">
                  Groq Multimodal Analysis
                </span>

                <div className="h-8 overflow-hidden flex items-center justify-center">
                  <motion.p
                    key={analysisStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[#DCFCE7] font-medium text-[14.5px] leading-tight"
                  >
                    {ANALYZING_STEPS[analysisStep]}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Area (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pb-safe z-20 flex flex-col">
          {/* Crop Selection Bar in Preview Mode */}
          {scanState === "preview" && (
            <div className="mb-4">
              <span className="text-white/80 text-[12px] font-semibold ml-1 mb-1.5 block">Select Plant / Crop:</span>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {COMMON_CROPS.map((crop) => (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => setSelectedCrop(crop)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all border",
                      selectedCrop === crop
                        ? "bg-[#16a34a] text-white border-[#16a34a] shadow-sm"
                        : "bg-black/50 text-white/80 border-white/20 hover:bg-black/70"
                    )}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>
          )}

          {scanState === "idle" && (
            <div className="flex items-center justify-between px-4 pb-2">
              {/* Gallery Button */}
              <div className="flex flex-col items-center gap-1.5">
                <input
                  type="file"
                  accept="image/*,image/jpeg,image/png,image/webp"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <button
                  className="w-13 h-13 bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/15 rounded-full flex items-center justify-center transition-colors text-white"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload from gallery"
                >
                  <ImageIcon className="w-6 h-6" />
                </button>
                <span className="text-white/80 text-[11.5px] font-medium">Gallery</span>
              </div>

              {/* Premium Shutter Button */}
              <button
                onClick={handleCapture}
                disabled={!hasCamera}
                className="relative w-[76px] h-[76px] flex items-center justify-center focus:outline-none active:scale-95 transition-transform disabled:opacity-50 group haptic-press"
              >
                <div className="absolute inset-0 border-[3.5px] border-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.4)]" />
                <div className="w-[58px] h-[58px] bg-[#16A34A] rounded-full group-active:bg-[#15803d] transition-colors shadow-inner flex items-center justify-center">
                  <Scan className="w-5 h-5 text-white/70" />
                </div>
              </button>

              {/* Flip Camera Button */}
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => setFacingMode((prev) => (prev === "environment" ? "user" : "environment"))}
                  className="w-13 h-13 bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/15 rounded-full flex items-center justify-center transition-colors text-white"
                  title="Flip camera"
                >
                  <RefreshCcw className="w-5 h-5" />
                </button>
                <span className="text-white/80 text-[11.5px] font-medium">Flip</span>
              </div>
            </div>
          )}

          {/* Preview Controls */}
          {scanState === "preview" && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-13 rounded-2xl bg-black/50 backdrop-blur-md border border-white/25 text-white hover:bg-white/20 font-semibold text-[15px]"
                onClick={handleRetake}
              >
                Retake
              </Button>
              <Button
                className="flex-[2] h-13 rounded-2xl bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-[15px] shadow-[0_8px_20px_rgba(22,163,74,0.4)] flex items-center justify-center gap-2"
                onClick={handleAnalyze}
                disabled={isOffline}
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze Plant</span>
              </Button>
            </div>
          )}
        </div>

        {/* Hidden Canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
