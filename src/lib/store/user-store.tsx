"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "@/lib/storage";

export type UserRole = "farmer" | "home";
export type SupportedLanguage = "en" | "hi" | "mr";

interface UserContextType {
  role: UserRole;
  crops: string[];
  location: string;
  name: string;
  language: SupportedLanguage;
  setRole: (r: UserRole) => void;
  setLanguage: (lang: SupportedLanguage) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("farmer");
  const [crops, setCrops] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("Pune, MH");
  const [name, setName] = useState<string>("Kasif");
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [isMounted, setIsMounted] = useState(false);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    storage.set("kisanedge_language", lang);
  };

  useEffect(() => {
    const savedRole = storage.get<UserRole>("kisanedge_role", "farmer");
    const savedLanguage = storage.get<SupportedLanguage>("kisanedge_language", "en");
    const savedCrops = storage.get<string[]>("kisanedge_crops", []);
    const savedLoc = storage.get<{city?: string, state?: string} | null>("kisanedge_location", null);
    
    setRole(savedRole);
    setLanguageState(savedLanguage);
    setCrops(savedCrops);
    if (savedLoc?.city) {
      setLocation(`${savedLoc.city}, ${savedLoc.state || "India"}`);
    }
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ role, crops, location, name, language, setRole, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
