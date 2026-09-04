import { WeatherCard } from "@/components/features/weather-card";
import { MOCK_WEATHER } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";

export default function WeatherPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold text-brand-deep">Weather Intelligence</h1>
      
      <WeatherCard {...MOCK_WEATHER} />

      <div>
        <h2 className="text-lg font-bold text-brand-deep mb-3">7-Day Forecast</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-gray-100">
            {MOCK_WEATHER.forecast.map((day, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <span className="font-medium text-gray-700 w-16">{day.day}</span>
                <span className="text-2xl">{day.icon}</span>
                <span className="font-semibold text-gray-900 w-16 text-right">{day.temp}°C</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
