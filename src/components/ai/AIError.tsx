"use client";

import React from "react";
import { AlertTriangle, RotateCcw, WifiOff } from "lucide-react";

interface AIErrorProps {
  error: string;
  isOffline?: boolean;
  onRetry?: () => void;
}

export function AIError({ error, isOffline, onRetry }: AIErrorProps) {
  return (
    <div
      className={`mx-4 p-3.5 rounded-2xl border flex items-center justify-between gap-3 shadow-xs animate-fade-in ${
        isOffline
          ? "bg-amber-50 border-amber-200 text-amber-900"
          : "bg-red-50 border-red-200 text-red-900"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isOffline ? (
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
        )}
        <span className="text-[13px] font-medium leading-snug">{error}</span>
      </div>

      {!isOffline && onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-[12px] font-semibold rounded-lg transition-colors active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
