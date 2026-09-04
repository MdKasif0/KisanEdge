"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, Sprout, Leaf, CloudSun, UserCircle } from "lucide-react";
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
    { icon: CloudSun, label: "Env", href: "/environment" },
    { icon: UserCircle, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 max-w-[400px] mx-auto pb-safe pointer-events-none">
      <nav className="flex items-center justify-around px-2 h-[72px] bg-white/90 backdrop-blur-xl border border-black/5 rounded-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] relative pointer-events-auto">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <div key={item.href} className="relative h-full flex items-center justify-center w-20">
                {/* The Cutout Illusion using a thick border matching the app background */}
                <Link
                  href={item.href}
                  className="absolute -top-5 flex flex-col items-center justify-center w-[72px] h-[72px] bg-[#16A34A] rounded-full border-[6px] border-[#F8FAF9] shadow-[0_4px_16px_rgba(22,163,74,0.4)] text-white hover:bg-[#15803d] transition-transform active:scale-95 group"
                >
                  <Icon className="w-8 h-8 stroke-[2] group-hover:scale-110 transition-transform" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </div>
            );
          }

          // Distribute items evenly around the center
          const isLeft = idx < 2;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-14 h-full gap-1 transition-all",
                isActive ? "text-[#16A34A]" : "text-[#94A3B8] hover:text-[#64748B]"
              )}
            >
              <Icon className={cn("w-[26px] h-[26px]", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
