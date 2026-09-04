"use client";

import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AssistantPage() {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-brand-deep">Kisan AI Assistant</h1>
          <p className="text-sm text-gray-500">Ask me anything about your crops</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4">
        {/* AI Message */}
        <div className="flex gap-3 max-w-[85%]">
          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center shrink-0 mt-1">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="bg-brand-soft/50 p-3 rounded-2xl rounded-tl-none text-brand-deep text-sm leading-relaxed">
            Hello Kasif! I noticed your Wheat Field A is running low on moisture. Would you like me to adjust the irrigation schedule?
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-1">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div className="bg-brand-primary text-white p-3 rounded-2xl rounded-tr-none text-sm leading-relaxed">
            Yes, please set it to run for 30 minutes tonight.
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-gray-100 border-transparent rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all"
        />
        <Button size="icon" className="h-12 w-12 rounded-2xl shrink-0 bg-brand-primary text-white hover:bg-brand-primary/90">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
