"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold text-brand-deep">Settings</h1>
      
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Preferences</h2>
          <Card>
            <CardContent className="p-0 divide-y divide-gray-100">
              <div className="flex items-center justify-between p-4">
                <span className="font-medium text-gray-700">Language</span>
                <span className="text-brand-primary">English</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-medium text-gray-700">Units</span>
                <span className="text-brand-primary">Metric (°C)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Notifications</h2>
          <Card>
            <CardContent className="p-0 divide-y divide-gray-100">
              <div className="flex items-center justify-between p-4">
                <span className="font-medium text-gray-700">Push Notifications</span>
                <div className="w-11 h-6 bg-brand-primary rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-medium text-gray-700">Weather Alerts</span>
                <div className="w-11 h-6 bg-brand-primary rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
