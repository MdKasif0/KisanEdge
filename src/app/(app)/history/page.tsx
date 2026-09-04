import { MOCK_ALERTS } from "@/lib/mock-data";
import { History, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold text-brand-deep">Scan History</h1>
      
      <div className="flex flex-col gap-3">
        <Card className="hover:border-brand-primary transition-colors cursor-pointer">
          <CardContent className="p-4 flex gap-4 items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden relative shrink-0">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-900 truncate">Late Blight Detected</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">Today</span>
              </div>
              <p className="text-sm text-gray-600 truncate">Tomato (Roma)</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
