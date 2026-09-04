"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Upload, Zap, RefreshCcw, X, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/lib/store/user-store";
import { useRouter } from "next/navigation";
import { MOCK_DIAGNOSES } from "@/lib/mock-data";

type ScanState = "idle" | "preview" | "analyzing";

const ANALYZING_STEPS = [
  "Analyzing visual symptoms...",
  "Comparing disease patterns...",
  "Checking crop context...",
  "Preparing recommendation..."
];

export default function ScanPage() {
  const router = useRouter();
  const { crops } = useUser();
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [analysisStep, setAnalysisStep] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (scanState === "idle") {
      startCamera();
    }
    return () => stopCamera();
  }, [scanState]);

  const startCamera = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setHasCamera(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
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
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      setImageSrc(dataUrl);
      setScanState("preview");
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setScanState("preview");
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const handleRetake = () => {
    setImageSrc(null);
    setScanState("idle");
  };

  const handleAnalyze = () => {
    setScanState("analyzing");
    
    // Simulate multi-step analysis
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= ANALYZING_STEPS.length) {
        clearInterval(interval);
        finishAnalysis();
      } else {
        setAnalysisStep(step);
      }
    }, 1200);
  };

  const finishAnalysis = () => {
    // Generate Mock Diagnosis based on user's first crop or default
    const targetCrop = crops.length > 0 ? crops[0] : "default_disease";
    const diagnosis = MOCK_DIAGNOSES[targetCrop] || MOCK_DIAGNOSES["default_disease"];
    
    // Save to local storage for Results page
    if (imageSrc) {
      try {
        localStorage.setItem("kisanedge_scan_image", imageSrc);
        localStorage.setItem("kisanedge_scan_result", JSON.stringify(diagnosis));
      } catch (e) {
        console.error("Failed to save to localStorage, image might be too large", e);
      }
    }
    
    router.push("/results");
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-black absolute inset-0 z-[100] overflow-hidden sm:bg-gray-900">
      <div className="w-full h-full max-w-md mx-auto relative flex flex-col bg-black shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 z-20 absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent pt-safe">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
              <X className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex flex-col items-center">
          <h1 className="text-white font-bold text-lg">Scan your plant</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
          <Zap className="w-6 h-6" />
        </Button>
      </header>

      {/* Main View Area */}
      <div className="flex-1 relative w-full h-full bg-black">
        {scanState === "idle" && hasCamera && (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {scanState === "idle" && !hasCamera && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
            <Scan className="w-16 h-16 mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">Camera Unavailable</h2>
            <p className="text-gray-400">Please use the gallery upload button below.</p>
          </div>
        )}

        {(scanState === "preview" || scanState === "analyzing") && imageSrc && (
          <img 
            src={imageSrc} 
            alt="Preview" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Viewfinder Overlays */}
        {scanState === "idle" && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8 z-10">
            <div className="relative w-full aspect-[3/4] max-w-sm rounded-3xl border-2 border-white/30">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#16a34a] -translate-x-0.5 -translate-y-0.5 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#16a34a] translate-x-0.5 -translate-y-0.5 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#16a34a] -translate-x-0.5 translate-y-0.5 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#16a34a] translate-x-0.5 translate-y-0.5 rounded-br-3xl" />
            </div>
            <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md mt-6 shadow-lg text-sm">
              Keep the affected area inside the frame
            </p>
          </div>
        )}

        {/* Analyzing Overlay */}
        <AnimatePresence>
          {scanState === "analyzing" && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 z-30"
            >
              {/* Dimming backdrop */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
              
              {/* Laser scanning line */}
              <motion.div 
                className="absolute left-0 right-0 h-1 bg-[#16a34a] shadow-[0_0_15px_#16a34a,0_0_5px_#16a34a]"
                initial={{ top: "10%" }}
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Status Box */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                  className="bg-black/80 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center w-[280px] shadow-2xl border border-white/10"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-transparent border-t-[#16a34a] rounded-full animate-spin" />
                    <Scan className="absolute inset-0 m-auto w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">Analyzing...</h3>
                  <motion.p 
                    key={analysisStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#16a34a] font-medium text-sm text-center"
                  >
                    {ANALYZING_STEPS[analysisStep]}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Area */}
      <div className="bg-black p-6 z-20 pb-safe pb-8">
        {scanState === "idle" && (
          <div className="flex flex-col gap-6">
            <div className="text-center text-white/70 text-xs">
              <p>Tips: Use natural light • Avoid blurry images • Capture closely</p>
            </div>
            <div className="flex items-center justify-center gap-8">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-6 h-6" />
              </Button>
              <button 
                onClick={handleCapture}
                disabled={!hasCamera}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-1.5 focus:outline-none focus:ring-4 focus:ring-[#16a34a]/50 active:scale-95 transition-transform disabled:opacity-50"
              >
                <div className="w-full h-full border-2 border-black rounded-full" />
              </button>
              <div className="w-14 h-14" /> {/* Spacer for symmetry */}
            </div>
          </div>
        )}

        {scanState === "preview" && (
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 h-14 rounded-2xl bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold"
              onClick={handleRetake}
            >
              <RefreshCcw className="w-5 h-5 mr-2" /> Retake
            </Button>
            <Button 
              className="flex-[2] h-14 rounded-2xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-lg shadow-[0_4px_14px_rgba(22,163,74,0.4)]"
              onClick={handleAnalyze}
            >
              Analyze <Scan className="w-5 h-5 ml-2" />
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
