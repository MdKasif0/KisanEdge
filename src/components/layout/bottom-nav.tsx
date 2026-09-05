"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Scan, Sparkles, CloudSun, User, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  if (pathname === "/scan" || pathname === "/results") {
    return null;
  }

  const navItems = [
    { icon: Home, label: "Home", aria: "Home", href: "/home" },
    { icon: Sparkles, label: "AI", aria: "KisanEdge AI", href: "/assistant" },
    { icon: Scan, label: "Scan", aria: "Scan your plant", href: "/scan", isPrimary: true },
    { icon: CloudSun, label: "Environment", aria: "Environment and weather", href: "/environment" },
    { icon: User, label: "Profile", aria: "Profile", href: "/profile" },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-5 left-4 right-4 z-50 max-w-[420px] mx-auto pb-safe pointer-events-none">
      <div className="relative w-full h-[76px]">
        {/* Navigation Container */}
        <nav 
          className="absolute bottom-0 w-full h-full flex items-center justify-between px-2 bg-white/95 backdrop-blur-lg border border-[#E5E7EB] rounded-[32px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] pointer-events-auto"
        >
          {/* Top highlight detail */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 rounded-t-[32px] pointer-events-none" />

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isPrimary) {
              return (
                <div key={item.href} className="w-[20%] flex flex-col items-center justify-end h-full pb-1.5 relative pointer-events-none">
                  <div className="absolute -top-[22px] pointer-events-auto">
                    <Link
                      href={item.href}
                      className="flex items-center justify-center w-[60px] h-[60px] bg-[#16A34A] rounded-full shadow-[0_8px_24px_-4px_rgba(22,163,74,0.4)] text-white hover:bg-[#15803d] transition-all duration-200 active:scale-95 group relative z-10"
                      aria-label={item.aria}
                    >
                      <div className="relative flex items-center justify-center">
                        <Icon className="w-7 h-7 stroke-[2]" />
                        <Leaf className="w-3 h-3 absolute stroke-[2.5] fill-white/20" />
                      </div>
                      {/* Active outer glow for scan */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-[#16A34A]/30 scale-[1.15] animate-pulse" />
                      )}
                    </Link>
                  </div>
                  <span className={cn(
                    "text-[12px] font-semibold tracking-tight pointer-events-auto z-10 relative mt-auto",
                    isActive ? "text-[#16A34A]" : "text-[#14532D]"
                  )}>
                    {item.label}
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.aria}
                className="w-[20%] h-full flex flex-col items-center justify-center gap-1 transition-transform duration-150 active:scale-[0.97] pointer-events-auto group"
              >
                <div className={cn(
                  "relative flex items-center justify-center w-12 h-[32px] rounded-full transition-colors duration-200",
                  isActive ? "bg-[#F0FDF4]" : "bg-transparent group-hover:bg-gray-50"
                )}>
                  <Icon className={cn(
                    "w-[24px] h-[24px] transition-colors duration-200",
                    isActive ? "stroke-[2.5px] text-[#16A34A]" : "stroke-[2px] text-[#94A3B8]"
                  )} />
                </div>
                <span className={cn(
                  "text-[11px] tracking-tight transition-colors duration-200",
                  isActive ? "font-semibold text-[#16A34A]" : "font-medium text-[#94A3B8]"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
