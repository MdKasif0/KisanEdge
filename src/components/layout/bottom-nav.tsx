"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, Sprout, Leaf, CloudSun, UserCircle, Bot, Wrench } from "lucide-react";
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
    { icon: Home, label: t("nav.home"), href: "/home" },
    { icon: Bot, label: t("nav.assistant"), href: "/assistant" },
    { icon: ScanLine, label: t("nav.scan"), href: "/scan", isPrimary: true },
    { icon: CloudSun, label: t("nav.weather"), href: "/environment" },
    { icon: UserCircle, label: t("nav.profile"), href: "/profile" },
  ];

  const primaryItem = navItems.find((item) => item.isPrimary);
  const PrimaryIcon = primaryItem?.icon;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-4 sm:right-4 z-50 max-w-[400px] mx-auto pb-safe pointer-events-none">
      <div className="relative w-full h-[64px] sm:h-[72px]">
        <nav 
          className="flex items-center justify-around px-1 sm:px-2 h-full bg-white/60 backdrop-blur-xl border border-black/5 rounded-[32px] sm:rounded-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-auto"
          style={{
            WebkitMaskImage: "radial-gradient(circle at 50% 12px, transparent 42px, black 43px)",
            maskImage: "radial-gradient(circle at 50% 12px, transparent 42px, black 43px)"
          }}
        >
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isPrimary) {
              // Empty spacer where the cutout is
              return <div key={item.href} className="w-16 sm:w-20 shrink-0" />;
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-12 sm:w-14 h-full gap-1 transition-all",
                  isActive ? "text-[#16A34A]" : "text-[#94A3B8] hover:text-[#64748B]"
                )}
              >
                <Icon className={cn("w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </Link>
            );
          })}
        </nav>

        {/* The unmasked floating primary button */}
        {primaryItem && PrimaryIcon && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 pointer-events-auto">
            <Link
              href={primaryItem.href}
              className="flex flex-col items-center justify-center w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] bg-[#16A34A] rounded-full shadow-[0_4px_16px_rgba(22,163,74,0.4)] text-white hover:bg-[#15803d] transition-transform active:scale-95 group"
            >
              <PrimaryIcon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2] group-hover:scale-110 transition-transform" />
              <span className="sr-only">{primaryItem.label}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
