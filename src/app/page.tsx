"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const hasOnboarded = storage.get("kisanedge_onboarded", false);
    if (hasOnboarded) {
      router.replace("/home");
    } else {
      router.replace("/onboarding");
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-brand-primary">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
