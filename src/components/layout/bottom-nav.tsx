"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, Sprout, CloudRain, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";
import { TranslationKey } from "@/lib/i18n/translations";

const navItems: { icon: any; labelKey: TranslationKey; href: string; isPrimary?: boolean }[] = [
  { icon: Home, labelKey: "nav.home", href: "/home" },
  { icon: Sprout, labelKey: "nav.farm", href: "/farm" },
  { icon: ScanLine, labelKey: "nav.scan", href: "/scan", isPrimary: true },
  { icon: CloudRain, labelKey: "nav.weather", href: "/weather" },
  { icon: Bell, labelKey: "nav.alerts", href: "/alerts" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe">
      <nav className="flex items-center justify-around px-2 h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const label = t(item.labelKey);

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex flex-col items-center justify-center w-14 h-14 bg-brand-primary rounded-full shadow-lg text-white hover:bg-brand-primary/90 transition-transform active:scale-95"
              >
                <Icon className="w-6 h-6" />
                <span className="sr-only">{label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                isActive ? "text-brand-primary" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium text-center leading-tight truncate w-full px-1">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
