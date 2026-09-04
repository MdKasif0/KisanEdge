import { UserCircle, Settings, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col items-center mt-4 mb-2">
        <div className="w-24 h-24 bg-brand-soft rounded-full flex items-center justify-center mb-4">
          <UserCircle className="w-12 h-12 text-brand-primary" />
        </div>
        <h1 className="text-2xl font-bold text-brand-deep">Kasif</h1>
        <p className="text-gray-500">Premium Farmer</p>
      </div>

      <div className="flex flex-col gap-3">
        <Card>
          <CardContent className="p-0 divide-y divide-gray-100">
            <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-700">App Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </Link>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="font-medium text-red-600">Sign Out</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
