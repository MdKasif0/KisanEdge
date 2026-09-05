"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_HISTORY } from "@/lib/mock-data";
import { ArrowLeft, Filter, Camera, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { storage } from "@/lib/storage";

const FILTERS = ["All", "Disease", "Healthy", "Recent"];

export default function HistoryPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [historyItems, setHistoryItems] = useState<any[]>(MOCK_HISTORY);

  useEffect(() => {
    // Read real scans from localStorage
    const saved = storage.get<any[]>("kisanedge_scan_history", []);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      // Merge real scans at top, avoid duplicate IDs
      const savedIds = new Set(saved.map((s) => s.id));
      const remainingMock = MOCK_HISTORY.filter((m) => !savedIds.has(m.id));
      setHistoryItems([...saved, ...remainingMock]);
    }
  }, []);

  const filteredHistory = historyItems.filter((scan) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Healthy") return scan.severity === "Healthy" || scan.severity === "healthy";
    if (activeFilter === "Disease") return scan.severity !== "Healthy" && scan.severity !== "healthy";
    if (activeFilter === "Recent") return scan.date?.includes("Today") || scan.date?.includes("now");
    return true;
  });

  const handleOpenReport = (scan: any) => {
    if (scan.fullResult) {
      storage.set("kisanedge_scan_result", scan.fullResult);
    } else {
      // Create structured fallback from history entry
      storage.set("kisanedge_scan_result", {
        status: scan.severity === "Healthy" ? "healthy" : "disease_detected",
        plantDetected: true,
        plantType: scan.crop,
        plantPart: "leaf",
        conditionName: scan.diagnosis,
        confidence: scan.confidence,
        severity: scan.severity.toLowerCase(),
        affectedAreaPercent: 25,
        observedSymptoms: ["Visible leaf lesions and spots observed during scan"],
        explanation: `Historical scan report for ${scan.crop}: ${scan.diagnosis}.`,
        alternativeConditions: [],
        recommendedActions: ["Monitor crop regularly", "Maintain balanced irrigation"],
        warnings: ["This is an AI visual assessment and not a laboratory-confirmed diagnosis."],
        needsBetterImage: false,
        expertVerificationRecommended: false,
        environmentalRisk: "moderate",
      });
    }

    if (scan.image) {
      storage.set("kisanedge_scan_image", scan.image);
    }
    router.push("/results");
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8FAF9] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F8FAF9]/90 backdrop-blur-md px-3.5 sm:px-5 pt-safe pb-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors -ml-2 text-[#14532D]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[20px] font-bold text-[#14532D] tracking-tight">Scan History</h1>
        </div>
        <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 text-[#14532D] hover:bg-gray-100">
          <Filter className="w-5 h-5" />
        </Button>
      </header>

      {/* Filters */}
      <div className="px-3.5 sm:px-5 pt-4 pb-2 overflow-x-auto hide-scrollbar flex gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? "bg-[#14532D] text-white"
                : "bg-white text-[#64748b] border border-[#E5E7EB]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="flex flex-col gap-3 p-3.5 sm:p-5 max-w-md mx-auto w-full">
        <span className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-wider ml-1 mb-1">
          Recent Plant Scans
        </span>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-10 text-[#94A3B8] font-medium">No scans match this filter.</div>
        ) : (
          filteredHistory.map((scan, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={scan.id || idx}
              className="bg-white p-3 sm:p-4 rounded-[18px] sm:rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#E5E7EB] flex flex-col gap-3 relative overflow-hidden"
            >
              {/* Status accent border */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  scan.severity?.toLowerCase() === "healthy" ? "bg-[#16A34A]" : "bg-amber-500"
                }`}
              />

              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-[14px] bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                  {scan.image && scan.image.startsWith("data:") ? (
                    <img src={scan.image} alt={scan.crop} className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-[#14532D] text-[15.5px] leading-tight truncate">
                      {scan.diagnosis}
                    </h3>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-[15px] font-bold text-[#14532D] leading-none">{scan.healthScore}</span>
                      <span className="text-[9px] text-[#94A3B8] font-bold">HEALTH</span>
                    </div>
                  </div>

                  <span className="text-[12.5px] font-medium text-[#64748b] mt-0.5">
                    {scan.crop} • AI {scan.confidence}%
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-medium text-[#94A3B8]">{scan.date}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    {scan.severity?.toLowerCase() === "healthy" ? (
                      <span className="text-[11px] font-bold text-[#16A34A] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Healthy
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {scan.severity}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleOpenReport(scan)}
                  className="text-[13px] font-bold text-[#16a34a] hover:text-[#15803d] flex items-center justify-center w-full py-1 haptic-press"
                >
                  View Diagnostic Report
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
