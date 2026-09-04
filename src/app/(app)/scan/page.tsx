"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Upload, Zap, RefreshCcw, X, Scan, Image as ImageIcon, Sun, Maximize, Leaf, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/lib/store/user-store";
import { useRouter } from "next/navigation";
import { MOCK_DIAGNOSES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (scanState === "idle") {
      startCamera();
    }
    return () => stopCamera();
  }, [scanState, facingMode]);

  const startCamera = async () => {
    stopCamera(); // Stop any existing stream before starting a new one
    
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setHasCamera(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode }
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
      // If using front camera, we should mirror the capture so it matches the preview
      if (facingMode === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
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
        console.error("Failed to save to localStorage", e);
      }
    }
    
    router.push("/results");
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
              <p className="text-[#94A3B8]">Allow camera access to scan your plants and detect diseases.</p>
              <div className="flex gap-3 mt-6">
                <Button className="bg-[#16A34A] hover:bg-[#15803d]" onClick={startCamera}>Try Again</Button>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800" onClick={() => fileInputRef.current?.click()}>Use Gallery</Button>
              </div>
            </div>
          )}

          {(scanState === "preview" || scanState === "analyzing") && imageSrc && (
            <img 
              src={imageSrc} 
              alt="Preview" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
          <div className="h-40 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between p-4 z-20 absolute top-0 left-0 right-0 pt-safe">
          <Link href="/home" className="shrink-0">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </Link>
          <div className="flex flex-col items-center flex-1">
            <h1 className="text-white font-bold text-[20px] sm:text-[22px] tracking-tight text-shadow-sm">Scan your plant</h1>
            <span className="text-white/80 text-[13px] font-medium mt-0.5">AI-powered plant health scan</span>
          </div>
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors shrink-0"
            onClick={() => setIsFlashActive(!isFlashActive)}
          >
            <div className="relative">
              <Zap className={cn("w-6 h-6 transition-colors", isFlashActive ? "text-yellow-400 fill-yellow-400" : "text-white")} />
              {isFlashActive && <div className="absolute top-0 right-0 w-2 h-2 bg-[#16A34A] rounded-full border border-black" />}
            </div>
          </button>
        </header>

        {/* Viewfinder Overlays */}
        {scanState === "idle" && hasCamera && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8 z-20">
            {/* AI Scanning Frame */}
            <div className="relative w-full aspect-[3/4] max-w-sm rounded-[28px] border border-white/20">
              
              {/* Animated Laser Line */}
              <div className="absolute inset-0 overflow-hidden rounded-[28px]">
                <motion.div 
                  className="w-full h-0.5 bg-[#16A34A] shadow-[0_0_12px_2px_rgba(22,163,74,0.6)]"
                  animate={{ y: ["0%", "4000%", "0%"] }} // Using percentage of parent height approx
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
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="bg-black/50 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-lg flex items-center gap-2.5">
                <Leaf className="w-5 h-5 text-[#16A34A]" />
                <span className="text-white font-medium text-[15px] sm:text-[16px]">Keep the affected area inside the frame</span>
              </div>
              
              {/* Smart Tips */}
              <div className="flex items-center gap-3 text-white/70 text-[13px] font-medium">
                <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5" /> Use natural light</span>
                <span className="w-1 h-1 bg-white/30 rounded-full" />
                <span className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5" /> Avoid blurry images</span>
              </div>
            </div>
          </div>
        )}

        {/* Analyzing Overlay */}
        <AnimatePresence>
          {scanState === "analyzing" && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6"
            >
              {/* Dimming backdrop but keeping plant visible */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              
              {/* Green Scanning Gradient Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-[#16A34A]/0 via-[#16A34A]/20 to-[#16A34A]/0"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 border-4 border-[#16A34A]/30 rounded-full"
                  />
                  <motion.div 
                    className="absolute inset-0 border-4 border-transparent border-t-[#16A34A] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-[#16A34A]" />
                  </div>
                </div>

                <h3 className="text-white font-bold text-[24px] mb-2 tracking-tight">Analyzing your plant</h3>
                
                <div className="h-6 overflow-hidden">
                  <motion.p 
                    key={analysisStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[#DCFCE7] font-medium text-[15px]"
                  >
                    {ANALYZING_STEPS[analysisStep]}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Area (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-safe mb-4 z-20 flex flex-col">
          
          {/* Ready to scan badge */}
          {scanState === "idle" && hasCamera && (
            <div className="flex justify-center mb-6">
              <div className="bg-[#16A34A]/20 backdrop-blur-md border border-[#16A34A]/30 text-[#DCFCE7] text-[13px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Ready to scan
              </div>
            </div>
          )}

          {scanState === "idle" && (
            <div className="flex items-center justify-between px-2">
              {/* Gallery Button */}
              <div className="flex flex-col items-center gap-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                />
                <button 
                  className="w-14 h-14 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-6 h-6" />
                </button>
                <span className="text-white/70 text-[12px] font-medium">Gallery</span>
              </div>

              {/* Premium Shutter Button */}
              <button 
                onClick={handleCapture}
                disabled={!hasCamera}
                className="relative w-[80px] h-[80px] flex items-center justify-center focus:outline-none active:scale-95 transition-transform disabled:opacity-50 group"
              >
                {/* Outer White Ring */}
                <div className="absolute inset-0 border-[4px] border-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
                {/* Inner Green Circle */}
                <div className="w-[62px] h-[62px] bg-[#16A34A] rounded-full group-active:bg-[#15803d] transition-colors shadow-inner flex items-center justify-center">
                  {/* Optional tiny icon inside the shutter to emphasize scan */}
                  <Scan className="w-6 h-6 text-white/50" />
                </div>
              </button>

              {/* Flip Camera Button */}
              <div className="flex flex-col items-center gap-2">
                <button 
                  onClick={() => setFacingMode(prev => prev === "environment" ? "user" : "environment")}
                  className="w-14 h-14 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors text-white"
                >
                  <RefreshCcw className="w-6 h-6" />
                </button>
                <span className="text-white/70 text-[12px] font-medium">Flip</span>
              </div>
            </div>
          )}

          {/* Preview Controls */}
          {scanState === "preview" && (
            <div className="flex gap-4 px-2">
              <Button 
                variant="outline" 
                className="flex-1 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-semibold text-[16px]"
                onClick={handleRetake}
              >
                Retake
              </Button>
              <Button 
                className="flex-[2] h-14 rounded-2xl bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-[16px] shadow-[0_8px_20px_rgba(22,163,74,0.4)]"
                onClick={handleAnalyze}
              >
                Analyze Plant <Sparkles className="w-5 h-5 ml-2" />
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
