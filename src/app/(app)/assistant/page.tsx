"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  MapPin,
  CloudSun,
  Activity,
  Sprout,
  ShieldAlert,
  Trash2,
  WifiOff,
} from "lucide-react";
import { useUser } from "@/lib/store/user-store";
import { useTranslation } from "@/lib/i18n/context";
import { DEMO_SENSOR, DEMO_WEATHER, DEMO_DIAGNOSIS } from "@/lib/demo-state";
import { storage } from "@/lib/storage";
import { ChatMessage, ChatResponse } from "@/types/ai";
import { buildClientAIContext } from "@/lib/ai/context";
import { AIMessage } from "@/components/ai/AIMessage";
import { AIInput } from "@/components/ai/AIInput";
import { AISuggestions } from "@/components/ai/AISuggestions";
import { AILoading } from "@/components/ai/AILoading";
import { AIError } from "@/components/ai/AIError";

const CHAT_STORAGE_KEY = "kisanedge_ai_chat";

export default function AssistantPage() {
  const { name, role, location, crops } = useUser();
  const { language } = useTranslation();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<string | null>(null);

  // Generate default welcome message
  const getWelcomeMessage = useCallback((): ChatMessage => {
    const isFarmer = role !== "home";
    const greeting = name ? `Hello ${name}!` : "Hello!";
    const contextNote = isFarmer
      ? `I'm KisanEdge AI, your agricultural assistant powered by real-time intelligence. I'm monitoring your fields in ${location || "Pune, MH"} with soil moisture at ${DEMO_SENSOR.soilMoisture}%. How can I help your crops today?`
      : `I'm KisanEdge AI, your intelligent plant-care assistant. I'm tracking your plants in ${location || "Pune, MH"} at ${DEMO_WEATHER.temp}°C. How can I help your plants thrive today?`;

    return {
      id: "welcome-msg",
      role: "assistant",
      content: `${greeting} ${contextNote}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  }, [name, role, location]);

  // Check online/offline status
  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOnline = () => {
      setIsOffline(false);
      setErrorState(null);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setErrorState("You're offline. Connect to the internet to use KisanEdge AI.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Restore chat from localStorage on mount
  useEffect(() => {
    const saved = storage.get<ChatMessage[] | null>(CHAT_STORAGE_KEY, null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      setMessages(saved);
    } else {
      setMessages([getWelcomeMessage()]);
    }
    setIsMounted(true);
  }, [getWelcomeMessage]);

  // Persist chat to localStorage on change
  useEffect(() => {
    if (isMounted && messages.length > 0) {
      storage.set(CHAT_STORAGE_KEY, messages);
    }
  }, [messages, isMounted]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Clear chat action
  const handleClearChat = () => {
    if (window.confirm("Clear this conversation and start fresh?")) {
      const welcome = getWelcomeMessage();
      setMessages([welcome]);
      storage.set(CHAT_STORAGE_KEY, [welcome]);
      setErrorState(null);
      lastUserMessageRef.current = null;
    }
  };

  // Send message to real Groq API
  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // Check offline
    if (isOffline || !navigator.onLine) {
      setErrorState("You're offline. Connect to the internet to use KisanEdge AI.");
      return;
    }

    setErrorState(null);
    lastUserMessageRef.current = trimmed;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Optimistically append user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build client context object (no credentials or secrets!)
      const aiContext = buildClientAIContext({
        role,
        location,
        crops,
        language,
        name,
      });

      // Prepare conversation history (exclude initial welcome greeting for cleaner model memory)
      const historyTurns = messages
        .filter((m) => m.id !== "welcome-msg")
        .slice(-10)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          conversation: historyTurns,
          context: aiContext,
        }),
      });

      const data: ChatResponse = await res.json();

      if (!res.ok || !data.success || !data.message) {
        const errorMsg =
          data.error?.message ||
          "Sorry, KisanEdge AI is temporarily unavailable. Please try again.";
        throw new Error(errorMsg);
      }

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.message.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      lastUserMessageRef.current = null;
    } catch (err: any) {
      console.error("[KisanEdge AI Frontend Error]:", err);
      const userFriendlyError =
        err?.message || "Sorry, KisanEdge AI is temporarily unavailable. Please try again.";
      setErrorState(userFriendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastUserMessageRef.current) {
      handleSend(lastUserMessageRef.current);
    }
  };

  const cropDisplay = crops.length > 0 ? crops.slice(0, 2).join(", ") : "Tomato, Wheat";

  return (
    <div className="flex flex-col h-full bg-[#f8faf9] relative min-h-screen">
      {/* Sticky Header */}
      <header
        className="bg-white sticky top-0 z-20 border-b border-gray-100 shadow-2xs"
        style={{ paddingTop: "calc(var(--safe-top, 0px) + 20px)" }}
      >
        <div className="max-w-md mx-auto px-4 pb-3.5 flex flex-col">
          <div className="flex items-center justify-between h-[44px]">
            <div className="flex items-center gap-3">
              <img
                src="/icon-512x512.png"
                alt="KisanEdge AI"
                className="w-[38px] h-[38px] rounded-[12px] object-cover shadow-2xs border border-gray-100/80"
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-[19px] font-bold text-[#14532D] leading-tight tracking-tight flex items-center gap-1.5">
                  KisanEdge AI <Sparkles className="w-4 h-4 text-[#16A34A]" />
                </h1>
                <p className="text-[12px] text-gray-500 font-medium tracking-tight">
                  Real agricultural intelligence
                </p>
              </div>
            </div>

            {/* Header action button */}
            <div className="flex items-center gap-1.5">
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Live Context Pills */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mt-3 pb-1">
            <ContextPill icon={MapPin} text={location} color="blue" />
            <ContextPill
              icon={CloudSun}
              text={`${DEMO_WEATHER.temp}° ${DEMO_WEATHER.condition}`}
              color="amber"
            />
            <ContextPill icon={Sprout} text={cropDisplay} color="emerald" />
            <ContextPill
              icon={Activity}
              text={`Moisture: ${DEMO_SENSOR.soilMoisture}%`}
              color="indigo"
            />
            <ContextPill icon={ShieldAlert} text="Early Blight detected" color="red" />
          </div>
        </div>
      </header>

      {/* Offline Banner */}
      {isOffline && (
        <div className="sticky top-[108px] z-10 bg-amber-500 text-white text-xs font-semibold py-1.5 px-4 flex items-center justify-center gap-2 shadow-xs">
          <WifiOff className="w-3.5 h-3.5" />
          <span>You&apos;re offline. Connect to the internet to use KisanEdge AI.</span>
        </div>
      )}

      {/* Chat Messages Area */}
      <main className="flex-1 max-w-md mx-auto w-full overflow-y-auto flex flex-col gap-4 p-4 pb-48">
        {messages.map((msg) => (
          <AIMessage key={msg.id} message={msg} />
        ))}

        {/* Loading State */}
        {isLoading && <AILoading />}

        {/* Error State with Retry */}
        {errorState && (
          <AIError
            error={errorState}
            isOffline={isOffline}
            onRetry={lastUserMessageRef.current ? handleRetry : undefined}
          />
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input & Suggestions Fixed Area */}
      <div className="fixed bottom-[74px] sm:bottom-[80px] left-0 right-0 bg-gradient-to-t from-[#f8faf9] via-[#f8faf9]/95 to-transparent pt-4 pb-2 px-4 z-30 pointer-events-none">
        <div className="max-w-md mx-auto flex flex-col gap-2 pointer-events-auto">
          {/* Context-aware Quick Suggestions */}
          <AISuggestions
            role={role}
            onSelect={(prompt) => handleSend(prompt)}
            disabled={isLoading || isOffline}
          />

          {/* Chat Input */}
          <AIInput
            onSend={handleSend}
            isLoading={isLoading}
            disabled={isOffline}
            placeholder={
              isOffline
                ? "Connect to internet to chat..."
                : "Ask KisanEdge AI (e.g. leaf spots, irrigation)..."
            }
          />
        </div>
      </div>
    </div>
  );
}

function ContextPill({
  icon: Icon,
  text,
  color,
}: {
  icon: any;
  text: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
    red: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <div
      className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full border ${colorMap[color]} text-[11px] font-semibold whitespace-nowrap`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{text}</span>
    </div>
  );
}
