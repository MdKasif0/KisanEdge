"use client";

import { AlertTriangle, CheckCircle, ArrowRight, ShieldCheck, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Result Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-brand-deep">Late Blight Detected</h1>
        <p className="text-gray-500 mt-1">Confidence: 94% • Tomato (Roma)</p>
      </div>

      {/* Image Preview */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-black aspect-video">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
        {/* Mock Bounding Box */}
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[50%] border-2 border-red-500 rounded-lg bg-red-500/20" />
      </div>

      {/* Severity & Info */}
      <Card>
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="text-gray-600 font-medium">Severity</span>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">High</span>
          </div>
          <div>
            <h3 className="font-semibold text-brand-deep mb-2">About this disease</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Late blight is a potentially devastating disease that can infect potatoes and tomatoes. 
              It is caused by the water mold Phytophthora infestans. It thrives in cool, moist weather.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div>
        <h2 className="text-lg font-bold text-brand-deep mb-3">AI Recommendations</h2>
        <div className="flex flex-col gap-3">
          <Card className="border-brand-primary/20 bg-brand-soft/30">
            <CardContent className="p-4 flex gap-4 items-start">
              <div className="bg-white p-2 rounded-lg shrink-0 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-brand-deep">Apply Fungicide</h4>
                <p className="text-sm text-gray-600 mt-1">Apply a copper-based fungicide immediately to prevent spread to healthy plants.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex gap-4 items-start">
              <div className="bg-gray-100 p-2 rounded-lg shrink-0">
                <Droplets className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-brand-deep">Reduce Moisture</h4>
                <p className="text-sm text-gray-600 mt-1">Water at the base of the plant to keep leaves dry. Avoid overhead watering.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-4">
        <Link href="/home">
          <Button className="w-full h-14 text-lg">Save to History</Button>
        </Link>
        <Link href="/scan">
          <Button variant="outline" className="w-full h-14 text-lg bg-white">Scan Another Plant</Button>
        </Link>
      </div>
    </div>
  );
}
