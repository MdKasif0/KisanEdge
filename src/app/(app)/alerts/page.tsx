import { MOCK_ALERTS } from "@/lib/mock-data";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold text-brand-deep">Alerts</h1>
      <div className="flex flex-col gap-3">
        {MOCK_ALERTS.map(alert => (
          <Card key={alert.id} className={
            alert.severity === "critical" ? "border-red-200 bg-red-50" :
            alert.severity === "warning" ? "border-orange-200 bg-orange-50" :
            "border-blue-200 bg-blue-50"
          }>
            <CardContent className="p-4 flex gap-4">
              <div className="shrink-0 mt-1">
                {alert.severity === "critical" && <ShieldAlert className="w-6 h-6 text-red-600" />}
                {alert.severity === "warning" && <AlertTriangle className="w-6 h-6 text-orange-600" />}
                {alert.severity === "info" && <Info className="w-6 h-6 text-blue-600" />}
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{alert.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{alert.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
