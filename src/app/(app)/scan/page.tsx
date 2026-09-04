"use client";

import { useState } from "react";
import { Camera, Upload, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate AI scanning delay
    setTimeout(() => {
      window.location.href = "/results";
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-brand-deep">Detect Disease</h1>
        <p className="text-gray-500 mt-1">Position the leaf within the frame</p>
      </div>

      <div className="flex-1 relative bg-black rounded-3xl overflow-hidden shadow-xl mb-6">
        {/* Mock Camera View Finder */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-70" />
        
        {/* Scanning Overlay Animation */}
        {isScanning && (
          <div className="absolute inset-0 bg-brand-primary/20 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-white border-t-brand-primary rounded-full animate-spin mb-4" />
            <p className="text-white font-medium text-lg">AI is analyzing...</p>
          </div>
        )}

        {/* Viewfinder Frame */}
        <div className="absolute inset-4 border-2 border-white/50 rounded-2xl pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white -translate-x-0.5 -translate-y-0.5 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white translate-x-0.5 -translate-y-0.5 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white -translate-x-0.5 translate-y-0.5 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white translate-x-0.5 translate-y-0.5 rounded-br-xl" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button 
          size="lg" 
          className="w-full h-16 text-lg shadow-lg flex items-center gap-2"
          onClick={handleScan}
          disabled={isScanning}
        >
          {isScanning ? (
            "Processing..."
          ) : (
            <>
              <Camera className="w-6 h-6" /> Take Photo
            </>
          )}
        </Button>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 bg-white">
            <Upload className="w-5 h-5 mr-2" /> Gallery
          </Button>
          <Button variant="outline" className="flex-1 bg-white">
            <Zap className="w-5 h-5 mr-2" /> Flash
          </Button>
        </div>
      </div>
    </div>
  );
}
