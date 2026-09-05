"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface AISuggestionsProps {
  role?: "farmer" | "home" | "home_grower";
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const FARMER_SUGGESTIONS = [
  "Should I irrigate today?",
  "Why is my crop health score low?",
  "Explain my disease risk",
  "What should I monitor today?",
  "Why are my tomato leaves yellow?",
];

const HOME_GROWER_SUGGESTIONS = [
  "Why are my leaves turning yellow?",
  "Does my plant need water?",
  "How can I improve my plant's health?",
  "What should I do next?",
  "What can KisanEdge do?",
];

export function AISuggestions({ role, onSelect, disabled }: AISuggestionsProps) {
  const isFarmer = role !== "home" && role !== "home_grower";
  const suggestions = isFarmer ? FARMER_SUGGESTIONS : HOME_GROWER_SUGGESTIONS;

  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
      {suggestions.map((suggestion, idx) => (
        <button
          key={idx}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          className="shrink-0 bg-white border border-gray-200 text-[#14532D] text-[13px] font-medium px-3.5 py-1.5 rounded-full shadow-xs hover:bg-[#f0fdf4] hover:border-[#16a34a]/30 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-[#16a34a] shrink-0" />
          <span>{suggestion}</span>
        </button>
      ))}
    </div>
  );
}
