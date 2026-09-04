"use client";

import Link from "next/link";
import { UserCircle, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/store/user-store";

import { usePathname } from "next/navigation";

export function TopBar() {
  const { location, name, role } = useUser();
  const pathname = usePathname();

  // Hide TopBar on pages that have their own custom headers
  if (pathname === "/home" || pathname === "/scan" || pathname === "/results") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f8faf9]/90 backdrop-blur-md border-b border-gray-100">
      <div className="flex flex-col px-4 sm:px-6 pt-3 pb-2 max-w-md mx-auto">
        <div className="flex h-12 items-center justify-between">
          <div className="flex flex-col">
            <Link href="/home" className="flex items-center gap-1.5">
              <span className="font-bold text-[22px] text-[#0e3b1c] tracking-tight">KisanEdge</span>
            </Link>
            <div className="flex items-center gap-1 mt-0.5 text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/alerts">
              <Button variant="ghost" size="icon" className="relative text-gray-500 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                <span className="sr-only">Alerts</span>
              </Button>
            </Link>
            <Link href="/profile">
              <div className="w-9 h-9 rounded-full bg-[#dcfce7] flex items-center justify-center border border-[#16a34a]/20">
                <span className="text-[#16a34a] font-bold text-sm">{name.charAt(0)}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
