"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff } from "lucide-react";

interface AIInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function AIInput({
  onSend,
  isLoading,
  disabled = false,
  placeholder = "Ask KisanEdge AI...",
}: AIInputProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Adjust textarea height automatically up to max 120px
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const canSend = input.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="flex gap-2 items-end max-w-[600px] mx-auto w-full">
      <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-1.5 flex items-end shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus-within:border-[#16a34a] focus-within:ring-2 focus-within:ring-[#16a34a]/20 transition-all">
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={toggleListening}
          disabled={disabled || isLoading}
          title={isListening ? "Listening... click to stop" : "Voice input"}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
            isListening
              ? "bg-red-50 text-red-600 animate-pulse"
              : "bg-gray-50 text-gray-500 hover:text-[#16a34a] hover:bg-[#16a34a]/10"
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5 text-red-500" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={input}
          rows={1}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder={disabled ? "Offline..." : placeholder}
          className="flex-1 bg-transparent border-none px-3 py-2 text-[15px] focus:outline-none placeholder:text-gray-400 resize-none max-h-[120px] leading-relaxed disabled:opacity-60"
        />

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSend}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
            canSend
              ? "bg-[#16a34a] text-white shadow-sm hover:bg-[#15803d] active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
          }`}
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
