"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, Sprout, Leaf, Bell, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";
import { useUser } from "@/lib/store/user-store";
import { TranslationKey } from "@/lib/i18n/translations";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { role } = useUser();

  if (pathname === "/scan" || pathname === "/results") {
    return null;
  }

  const navItems: { icon: any; label: string; href: string; isPrimary?: boolean }[] = [
    { icon: Home, label: "Home", href: "/home" },
    role === "farmer" 
      ? { icon: Sprout, label: "Farm", href: "/farm" }
      : { icon: Leaf, label: "Plants", href: "/plants" },
    { icon: ScanLine, label: "Scan", href: "/scan", isPrimary: true },
    { icon: Bell, label: "Alerts", href: "/alerts" },
    { icon: UserCircle, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.02)] pb-safe">
      <nav className="flex items-center justify-around px-2 h-[72px] max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <div key={item.href} className="relative h-full flex items-center justify-center w-16">
                <Link
                  href={item.href}
                  className="absolute bottom-6 flex flex-col items-center justify-center w-[56px] h-[56px] bg-[#16a34a] rounded-full shadow-[0_8px_20px_rgba(22,163,74,0.35)] text-white hover:bg-[#15803d] transition-transform active:scale-95"
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                  <span className="sr-only">{item.label}</span>
                </Link>
                <span className="absolute bottom-2 text-[11px] font-medium text-gray-500">{item.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                isActive ? "text-[#16a34a]" : "text-[#64748b] hover:text-[#14532D]"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              <span className={cn("text-[11px] font-medium text-center leading-tight truncate w-full px-1", isActive ? "font-bold" : "")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
