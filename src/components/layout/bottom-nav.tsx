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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe">
      <nav className="flex items-center justify-around px-2 h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex flex-col items-center justify-center w-14 h-14 bg-[#16a34a] rounded-full shadow-[0_8px_16px_rgba(22,163,74,0.3)] text-white hover:bg-[#15803d] transition-transform active:scale-95"
              >
                <Icon className="w-6 h-6 stroke-[2.5]" />
                <span className="sr-only">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                isActive ? "text-[#16a34a]" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-semibold text-center leading-tight truncate w-full px-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
