import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Activity } from "lucide-react";
import { type Plant } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function CropCard({ plant }: { plant: Plant }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="w-16 h-16 bg-brand-soft rounded-xl flex items-center justify-center text-3xl shrink-0 mr-4">
            {plant.image}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-brand-deep truncate">{plant.name}</h4>
            <p className="text-sm text-gray-500 mb-2">{plant.type}</p>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Activity className="w-3.5 h-3.5" />
                <span className={cn(
                  "font-medium",
                  plant.healthScore >= 90 ? "text-green-600" : 
                  plant.healthScore >= 70 ? "text-orange-500" : "text-red-600"
                )}>
                  {plant.healthScore}% Health
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Droplets className="w-3.5 h-3.5" />
                <span>{plant.lastWatered}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
