import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WeatherCard } from "@/components/features/weather-card";
import { CropCard } from "@/components/features/crop-card";
import { MOCK_WEATHER, MOCK_PLANTS, MOCK_ALERTS } from "@/lib/mock-data";
import { ArrowRight, AlertTriangle, ScanLine } from "lucide-react";

export default function HomePage() {
  const recentAlerts = MOCK_ALERTS.slice(0, 2);
  const myPlants = MOCK_PLANTS.slice(0, 3);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-brand-deep">Good Morning, Kasif!</h1>
        <p className="text-gray-500">Let's check on your farm today.</p>
      </div>

      {/* Weather Summary */}
      <WeatherCard {...MOCK_WEATHER} />

      {/* Quick Action - Scan */}
      <div className="bg-brand-soft rounded-2xl p-5 flex items-center justify-between shadow-sm border border-brand-primary/10">
        <div>
          <h3 className="font-semibold text-brand-deep mb-1">Detect Disease</h3>
          <p className="text-sm text-brand-deep/70">Scan a leaf for instant AI analysis</p>
        </div>
        <Link href="/scan">
          <Button size="icon" className="rounded-xl shadow-md h-12 w-12 shrink-0">
            <ScanLine className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Recent Alerts */}
      {recentAlerts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-brand-deep">Recent Alerts</h2>
            <Link href="/alerts" className="text-brand-primary text-sm font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex gap-3">
                <div className="bg-orange-100 p-2 rounded-full h-fit shrink-0">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900 text-sm">{alert.title}</h4>
                  <p className="text-orange-800/80 text-xs mt-1 leading-relaxed">{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* My Farm / Plants */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-brand-deep">My Crops</h2>
          <Link href="/farm" className="text-brand-primary text-sm font-medium flex items-center gap-1">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {myPlants.map(plant => (
            <Link key={plant.id} href={`/plants/${plant.id}`}>
              <CropCard plant={plant} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
