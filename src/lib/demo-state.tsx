/**
 * KisanEdge Demo State
 * 
 * Single source of truth for the hackathon demo journey.
 * All modules reference this data to create the illusion
 * of a fully connected agricultural intelligence platform.
 * 
 * Demo scenario: Farmer "Kasif" in Pune, MH grows Tomato.
 * Today's scan detected Early Blight with 94% confidence.
 * Soil moisture is low (31%), humidity is high (82%),
 * and rain is expected Wednesday — all connected.
 */

import type { Diagnosis, Alert, HistoryScan, Field } from "./mock-data";

// ─── Sensor Readings ───────────────────────────────────
export const DEMO_SENSOR = {
  soilMoisture: 31,
  soilMoistureStatus: "Low" as const,
  soilTemp: 28,
  soilTempStatus: "Good" as const,
  humidity: 82,
  airTemp: 28,
  lightLevel: "Bright",
  lastUpdated: "2 mins ago",
  isConnected: true,
};

// ─── Weather ───────────────────────────────────────────
export const DEMO_WEATHER = {
  temp: 28,
  condition: "Sunny",
  humidity: 65,
  rainProbability: 10,
  windSpeed: 12,
  forecast: [
    { day: "Mon", temp: 28, icon: "☀️", condition: "Sunny" },
    { day: "Tue", temp: 29, icon: "🌤️", condition: "Mostly Sunny" },
    { day: "Wed", temp: 24, icon: "🌧️", condition: "Rain" },
    { day: "Thu", temp: 26, icon: "⛅", condition: "Partly Cloudy" },
    { day: "Fri", temp: 27, icon: "☀️", condition: "Sunny" },
    { day: "Sat", temp: 30, icon: "☀️", condition: "Hot" },
    { day: "Sun", temp: 28, icon: "⛅", condition: "Partly Cloudy" },
  ],
};

// ─── Today's Diagnosis ─────────────────────────────────
export const DEMO_DIAGNOSIS: Diagnosis = {
  disease: "Possible Early Blight detected",
  confidence: 94,
  severity: "Moderate",
  type: "disease",
  reasons: [
    "Target-like concentric rings on leaves",
    "Lower leaf yellowing (chlorosis)",
    "Brown lesions on stems",
    "Tomato crop context",
  ],
  healthScore: 68,
  environmentalRisk: {
    temp: `${DEMO_SENSOR.airTemp}°C`,
    humidity: `${DEMO_SENSOR.humidity}%`,
    moisture: DEMO_SENSOR.soilMoistureStatus,
    rain: "70%",
    riskLevel: "High disease risk",
    explanation:
      "High humidity and upcoming rainfall may create conditions highly favorable to fungal disease spread.",
  },
  recommendation:
    "Monitor affected plants closely, avoid unnecessary overhead irrigation, and follow locally approved crop-management guidance for fungal control.",
  nextSteps: [
    "Inspect nearby plants for similar symptoms",
    "Prune affected lower leaves to improve air circulation",
    "Monitor environmental conditions over the next 48 hours",
    "Consult an agricultural expert if symptoms rapidly worsen",
  ],
};

// ─── Connected Alerts ──────────────────────────────────
export const DEMO_ALERTS: Alert[] = [
  {
    id: "da1",
    title: "Early Blight risk increased in Tomato Field A",
    description: `Today's scan detected Early Blight with ${DEMO_DIAGNOSIS.confidence}% confidence. High humidity (${DEMO_SENSOR.humidity}%) is favorable for fungal spread.`,
    severity: "critical",
    date: "10 mins ago",
    category: "disease",
    relatedEntity: "Tomato Field A",
    action: "View Diagnosis",
    isRead: false,
  },
  {
    id: "da2",
    title: "Soil moisture critically low",
    description: `Soil moisture dropped to ${DEMO_SENSOR.soilMoisture}%. Tomato crops need irrigation soon.`,
    severity: "warning",
    date: "1 hour ago",
    category: "irrigation",
    relatedEntity: "Field A",
    action: "Turn on Irrigation",
    isRead: false,
  },
  {
    id: "da3",
    title: "Heavy rainfall expected Wednesday",
    description: "80% chance of heavy rain. Ensure proper drainage to prevent waterlogging.",
    severity: "warning",
    date: "3 hours ago",
    category: "weather",
    action: "View Forecast",
    isRead: false,
  },
  {
    id: "da4",
    title: "High temperatures may cause crop stress",
    description: "Temperatures expected to reach 34°C tomorrow. Monitor water needs.",
    severity: "warning",
    date: "1 day ago",
    category: "heat",
    relatedEntity: "All Crops",
    action: "Review Irrigation",
    isRead: true,
  },
  {
    id: "da5",
    title: "Aphid activity increasing",
    description: "Recent scans show rising aphid populations in Wheat Field B.",
    severity: "critical",
    date: "1 day ago",
    category: "pest",
    relatedEntity: "Wheat Field B",
    action: "Inspect Affected Plants",
    isRead: true,
  },
  {
    id: "da6",
    title: "Your Rose may need attention",
    description: "Last scan indicated potential nutrient deficiency.",
    severity: "info",
    date: "2 days ago",
    category: "care",
    relatedEntity: "Rose",
    action: "View Care Guide",
    isRead: true,
  },
  {
    id: "da7",
    title: "Water your Tulsi today",
    description: "It has been 3 days since last watering.",
    severity: "info",
    date: "3 days ago",
    category: "care",
    relatedEntity: "Tulsi",
    action: "Mark as Watered",
    isRead: true,
  },
  {
    id: "da8",
    title: "Humidity may increase fungal risk",
    description: "Indoor humidity above 70%. Ensure good ventilation for your indoor plants.",
    severity: "warning",
    date: "4 days ago",
    category: "weather",
    action: "Check Environment",
    isRead: true,
  },
];

// ─── Connected History ─────────────────────────────────
export const DEMO_HISTORY: HistoryScan[] = [
  {
    id: "dh1",
    date: "Today, 10:30 AM",
    crop: "Tomato",
    diagnosis: "Early Blight",
    confidence: 94,
    severity: "Moderate",
    healthScore: 68,
  },
  {
    id: "dh2",
    date: "Yesterday",
    crop: "Wheat",
    diagnosis: "Healthy",
    confidence: 98,
    severity: "Healthy",
    healthScore: 91,
  },
  {
    id: "dh3",
    date: "02 Sep 2026",
    crop: "Potato",
    diagnosis: "Late Blight Risk",
    confidence: 82,
    severity: "Severe",
    healthScore: 45,
  },
  {
    id: "dh4",
    date: "28 Aug 2026",
    crop: "Tomato",
    diagnosis: "Nitrogen Deficiency",
    confidence: 88,
    severity: "Early",
    healthScore: 76,
  },
];

// ─── Connected Fields ──────────────────────────────────
export const DEMO_FIELDS: Field[] = [
  {
    id: "f1",
    name: "Field A",
    crop: "Tomato",
    area: "2.5 Acres",
    sowingDate: "12 Aug 2026",
    growthStage: "Flowering",
    healthScore: 68, // Matches diagnosis
    alerts: 2,
    risk: "High", // Elevated due to Early Blight
    image: "🍅",
  },
  {
    id: "f2",
    name: "Field B",
    crop: "Wheat",
    area: "5.0 Acres",
    sowingDate: "05 Jul 2026",
    growthStage: "Vegetative Growth",
    healthScore: 91,
    alerts: 1,
    risk: "Low",
    image: "🌾",
  },
  {
    id: "f3",
    name: "Field C",
    crop: "Potato",
    area: "1.2 Acres",
    sowingDate: "20 Aug 2026",
    growthStage: "Germination",
    healthScore: 74,
    alerts: 1,
    risk: "High",
    image: "🥔",
  },
];

// ─── AI Assistant Contextual Responses ─────────────────
export function getContextualResponse(question: string): { text: React.ReactNode; delay: number } {
  const q = question.toLowerCase();

  if (q.includes("yellow") || q.includes("tomato")) {
    return {
      delay: 1800,
      text: createResponse({
        title: "Yellowing leaves (Chlorosis) in tomatoes is common and usually caused by:",
        bullets: [
          { bold: "Overwatering or poor drainage:", text: "Your sensor shows soil moisture at 31% (low), so this is less likely." },
          { bold: "Nitrogen deficiency:", text: "Leaves turn pale green then yellow from the bottom up." },
          { bold: "Early Blight:", text: `Your recent scan detected Early Blight with ${DEMO_DIAGNOSIS.confidence}% confidence — this is the most likely cause.` },
        ],
        actions: [
          "Check if lower leaves show concentric ring patterns",
          "Prune affected lower leaves to improve air circulation",
          "Apply a balanced NPK fertilizer if soil tests show deficiency",
        ],
        disclaimer: true,
      }),
    };
  }

  if (q.includes("water") || q.includes("irrigat")) {
    return {
      delay: 1500,
      text: createResponse({
        title: `Based on your current sensor data and weather forecast:`,
        bullets: [
          { bold: "Soil moisture:", text: `Currently at ${DEMO_SENSOR.soilMoisture}% — this is below optimal range (40-60%).` },
          { bold: "Weather:", text: "Rain expected Wednesday (80% probability). Light watering today is recommended." },
          { bold: "Temperature:", text: `${DEMO_SENSOR.airTemp}°C — moderate evaporation expected.` },
        ],
        actions: [
          "Water your Tomato Field A lightly today (15-20 mins)",
          "Skip watering tomorrow — rain expected Wednesday",
          "Recheck sensor readings Thursday morning",
        ],
        disclaimer: false,
      }),
    };
  }

  if (q.includes("spot") || q.includes("caus")) {
    return {
      delay: 1600,
      text: createResponse({
        title: "Based on your recent scan and environmental conditions:",
        bullets: [
          { bold: "Most likely:", text: `Early Blight (Alternaria solani) — detected today with ${DEMO_DIAGNOSIS.confidence}% confidence.` },
          { bold: "Environmental factors:", text: `High humidity (${DEMO_SENSOR.humidity}%) creates ideal conditions for fungal spread.` },
          { bold: "Risk level:", text: "High — rain expected Wednesday may accelerate spread." },
        ],
        actions: [
          "Remove and dispose of heavily spotted leaves",
          "Avoid overhead watering — water at the base",
          "Improve air circulation by spacing plants",
          "Consult a local agronomist for fungicide options",
        ],
        disclaimer: true,
      }),
    };
  }

  if (q.includes("rain") || q.includes("protect")) {
    return {
      delay: 1400,
      text: createResponse({
        title: "Heavy rain expected Wednesday — here's how to prepare:",
        bullets: [
          { bold: "Drainage:", text: "Clear all drainage channels in Field A and C." },
          { bold: "Disease risk:", text: `Your Tomato crop already has Early Blight — rain will increase spread risk significantly.` },
          { bold: "Soil impact:", text: "Current moisture is 31%. Rain will restore levels but may cause waterlogging if drainage is poor." },
        ],
        actions: [
          "Ensure drainage channels are clear by Tuesday evening",
          "Apply protective mulch around tomato plants",
          "Harvest any ripe produce before Wednesday",
          "Monitor for fungal spread 24-48 hours after rain",
        ],
        disclaimer: false,
      }),
    };
  }

  if (q.includes("moisture") || q.includes("soil")) {
    return {
      delay: 1300,
      text: createResponse({
        title: `Your soil moisture is currently at ${DEMO_SENSOR.soilMoisture}%:`,
        bullets: [
          { bold: "Status:", text: "Below optimal range. Tomatoes need 40-60% soil moisture during flowering." },
          { bold: "Soil temperature:", text: `${DEMO_SENSOR.soilTemp}°C — within acceptable range.` },
          { bold: "Forecast:", text: "Rain on Wednesday will likely bring moisture back to optimal levels." },
        ],
        actions: [
          "Light irrigation today (15-20 minutes, drip preferred)",
          "Check sensor again tomorrow morning",
          "Don't over-water — rain is coming Wednesday",
        ],
        disclaimer: false,
      }),
    };
  }

  // Default
  return {
    delay: 1500,
    text: createResponse({
      title: "Here's what I know about your current situation:",
      bullets: [
        { bold: "Recent scan:", text: `Early Blight detected on Tomato (${DEMO_DIAGNOSIS.confidence}% confidence).` },
        { bold: "Soil moisture:", text: `${DEMO_SENSOR.soilMoisture}% — needs watering.` },
        { bold: "Weather:", text: `${DEMO_WEATHER.temp}°C, ${DEMO_WEATHER.condition}. Rain expected Wednesday.` },
      ],
      actions: [
        "Ask me more specific questions for detailed guidance",
        "Try: 'Should I water today?' or 'How to protect from rain?'",
      ],
      disclaimer: true,
    }),
  };
}

// Intentionally importing React here for JSX in the response builder
import React from "react";

function createResponse({
  title,
  bullets,
  actions,
  disclaimer,
}: {
  title: string;
  bullets: { bold: string; text: string }[];
  actions: string[];
  disclaimer: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-[15px]">{title}</p>
      <ul className="list-disc pl-5 space-y-1 mt-1 text-[14px]">
        {bullets.map((b, i) => (
          <li key={i}>
            <strong className="text-gray-900">{b.bold}</strong> {b.text}
          </li>
        ))}
      </ul>
      <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl mt-1">
        <span className="font-semibold text-emerald-800 text-[13px] block mb-1">
          Recommended Actions:
        </span>
        <ol className="list-decimal pl-4 text-emerald-900 text-[13px] space-y-0.5">
          {actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </div>
      {disclaimer && (
        <p className="text-[11px] text-gray-500 italic mt-1 leading-tight">
          Note: I am an AI assistant, not a certified agronomist. Please verify
          treatments for commercial crops.
        </p>
      )}
    </div>
  );
}
