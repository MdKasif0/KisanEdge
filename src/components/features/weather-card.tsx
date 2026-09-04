import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Thermometer, Wind } from "lucide-react";

interface WeatherCardProps {
  temp: number;
  condition: string;
  humidity: number;
}

export function WeatherCard({ temp, condition, humidity }: WeatherCardProps) {
  return (
    <Card className="bg-gradient-to-br from-brand-primary to-brand-deep text-white border-0 shadow-lg">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium">Current Weather</p>
            <h2 className="text-4xl font-bold mt-1">{temp}°C</h2>
            <p className="text-white/90 text-sm font-medium mt-1">{condition}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {condition === "Sunny" ? (
              <span className="text-2xl">☀️</span>
            ) : condition.includes("Rain") ? (
              <span className="text-2xl">🌧️</span>
            ) : (
              <span className="text-2xl">⛅</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-white/90 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-brand-soft" />
            <span>{humidity}%</span>
          </div>
          <div className="w-px h-4 bg-white/30" />
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-brand-soft" />
            <span>Feels {temp + 2}°</span>
          </div>
          <div className="w-px h-4 bg-white/30" />
          <div className="flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-brand-soft" />
            <span>12 km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
