import { AIContext } from "@/types/ai";
import { DEMO_SENSOR, DEMO_WEATHER, DEMO_DIAGNOSIS } from "@/lib/demo-state";
import { storage } from "@/lib/storage";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  pa: "Punjabi",
  te: "Telugu",
  ta: "Tamil",
  bn: "Bengali",
  gu: "Gujarati",
};

export interface ClientContextParams {
  role?: "farmer" | "home";
  location?: string;
  crops?: string[];
  language?: string;
  name?: string;
}

/**
 * Builds structured context object from client state, stores, and sensor readings.
 * Ensures no private credentials or keys are included.
 */
export function buildClientAIContext(params: ClientContextParams): AIContext {
  const isFarmer = params.role !== "home";
  const userLangCode = params.language || storage.get<string>("kisanedge_lang", "en");
  const languageName = LANGUAGE_NAMES[userLangCode] || userLangCode || "English";

  // Check if sensor is explicitly disconnected in storage
  const isSensorConnected = storage.get<boolean>("kisanedge_sensor_connected", DEMO_SENSOR.isConnected);

  const primaryCrop = params.crops && params.crops.length > 0
    ? params.crops[0]
    : (isFarmer ? "Tomato" : "Indoor Plant");

  return {
    role: isFarmer ? "farmer" : "home_grower",
    language: languageName,
    location: params.location || "Pune, Maharashtra, India",
    crop: primaryCrop,
    crops: params.crops && params.crops.length > 0 ? params.crops : [primaryCrop],
    cropStage: isFarmer ? "Vegetative / Flowering" : "Active Growth",
    plant: isFarmer ? undefined : primaryCrop,
    sensor: {
      connected: isSensorConnected,
      soilMoisture: isSensorConnected ? DEMO_SENSOR.soilMoisture : undefined,
      soilMoistureStatus: isSensorConnected ? DEMO_SENSOR.soilMoistureStatus : undefined,
      soilTemperature: isSensorConnected ? DEMO_SENSOR.soilTemp : undefined,
      airTemperature: isSensorConnected ? DEMO_SENSOR.airTemp : undefined,
      humidity: isSensorConnected ? DEMO_SENSOR.humidity : undefined,
      lightLevel: isSensorConnected ? DEMO_SENSOR.lightLevel : undefined,
      lastUpdated: isSensorConnected ? DEMO_SENSOR.lastUpdated : undefined,
    },
    weather: {
      temperature: DEMO_WEATHER.temp,
      condition: DEMO_WEATHER.condition,
      humidity: DEMO_WEATHER.humidity,
      rainProbability: DEMO_WEATHER.rainProbability,
      windSpeed: DEMO_WEATHER.windSpeed,
    },
    diseaseRisk: DEMO_DIAGNOSIS.environmentalRisk.riskLevel || "High",
    latestScan: {
      crop: "Tomato",
      condition: DEMO_DIAGNOSIS.disease,
      confidence: DEMO_DIAGNOSIS.confidence,
      severity: DEMO_DIAGNOSIS.severity,
      healthScore: DEMO_DIAGNOSIS.healthScore,
      reasons: DEMO_DIAGNOSIS.reasons,
      recommendation: DEMO_DIAGNOSIS.recommendation,
    },
  };
}
