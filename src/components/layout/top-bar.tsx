import Link from "next/link";
import { UserCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex h-14 items-center justify-between px-4 max-w-md mx-auto">
        <Link href="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="font-bold text-xl text-brand-deep tracking-tight">KisanEdge</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-gray-500 rounded-full">
              <Settings className="w-5 h-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-brand-primary rounded-full bg-brand-soft">
              <UserCircle className="w-6 h-6" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
