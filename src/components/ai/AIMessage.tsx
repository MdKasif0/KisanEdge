"use client";

import React from "react";
import { Bot, User, AlertCircle, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage } from "@/types/ai";

interface AIMessageProps {
  message: ChatMessage;
  isError?: boolean;
  onRetry?: () => void;
}

export function AIMessage({ message, isError, onRetry }: AIMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-2.5 max-w-[92%] sm:max-w-[88%] ${
        isUser ? "self-end flex-row-reverse" : "self-start"
      }`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      ) : (
        <div className="w-8 h-8 bg-gradient-to-br from-[#16a34a] to-[#14532D] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Bubble */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div
          className={`p-3.5 rounded-2xl text-[14.5px] leading-relaxed shadow-xs ${
            isUser
              ? "bg-[#16a34a] text-white rounded-tr-none ml-auto"
              : isError
              ? "bg-red-50 text-red-900 border border-red-200 rounded-tl-none"
              : "bg-white text-gray-800 rounded-tl-none border border-gray-100/80"
          }`}
        >
          {isError ? (
            <div className="flex items-start gap-2 text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-[14px]">{message.content}</p>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-[12px] font-semibold rounded-lg transition-colors active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retry
                  </button>
                )}
              </div>
            </div>
          ) : isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="space-y-2 text-gray-800 break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h4 className="text-[16px] font-bold text-[#14532D] mt-2.5 mb-1 tracking-tight">{children}</h4>
                  ),
                  h2: ({ children }) => (
                    <h4 className="text-[15.5px] font-bold text-[#14532D] mt-2 mb-1 tracking-tight">{children}</h4>
                  ),
                  h3: ({ children }) => (
                    <h5 className="text-[14.5px] font-bold text-[#14532D] mt-2 mb-1 tracking-tight flex items-center gap-1.5">
                      {children}
                    </h5>
                  ),
                  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 space-y-1 my-1.5">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 space-y-1 my-1.5">{children}</ol>
                  ),
                  li: ({ children }) => <li className="text-[14px] leading-snug">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-bold text-[#0f3b1c]">{children}</strong>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-2 rounded-xl border border-gray-200 shadow-2xs">
                      <table className="min-w-full divide-y divide-gray-200 text-[13px]">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-[#f0fdf4] font-semibold text-[#14532D]">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-3 py-2 text-left font-semibold tracking-tight">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-3 py-2 border-t border-gray-100 text-gray-700 leading-normal">{children}</td>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 text-[#16a34a] px-1 py-0.5 rounded text-[13px] font-mono">
                      {children}
                    </code>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <span
            className={`text-[10.5px] text-gray-400 px-1 font-medium ${
              isUser ? "self-end text-right" : "self-start text-left"
            }`}
          >
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
