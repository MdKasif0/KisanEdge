"use client";

import React from "react";
import { Bot, Sparkles } from "lucide-react";

export function AILoading() {
  return (
    <div className="flex gap-2.5 max-w-[85%] self-start animate-fade-in">
      <div className="w-8 h-8 bg-gradient-to-br from-[#16a34a] to-[#14532D] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm animate-pulse">
        <Bot className="w-4 h-4 text-white" />
      </div>

      <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-gray-100 flex flex-col gap-2 shadow-sm">
        <div className="flex items-center gap-1.5 text-gray-500 text-[13px] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#16a34a] animate-spin" style={{ animationDuration: "3s" }} />
          <span>KisanEdge AI is thinking...</span>
        </div>
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
