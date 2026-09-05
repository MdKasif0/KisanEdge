export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
}

export interface SensorContext {
  connected: boolean;
  soilMoisture?: number;
  soilMoistureStatus?: string;
  soilTemperature?: number;
  airTemperature?: number;
  humidity?: number;
  lightLevel?: string;
  lastUpdated?: string;
}

export interface WeatherContext {
  temperature?: number;
  condition?: string;
  humidity?: number;
  rainProbability?: number;
  windSpeed?: number;
  forecast?: { day: string; temp: number; condition: string }[];
}

export interface DiseaseScanContext {
  crop?: string;
  condition?: string;
  confidence?: number;
  severity?: string;
  reasons?: string[];
  healthScore?: number;
  recommendation?: string;
}

export interface AIContext {
  role?: "farmer" | "home_grower" | "home";
  language?: string;
  location?: string;
  crop?: string;
  crops?: string[];
  cropStage?: string;
  plant?: string;
  sensor?: SensorContext;
  weather?: WeatherContext;
  diseaseRisk?: string;
  latestScan?: DiseaseScanContext;
}

export interface ChatRequest {
  message: string;
  conversation?: {
    role: ChatRole;
    content: string;
  }[];
  context?: AIContext;
}

export interface ChatResponse {
  success: boolean;
  message?: {
    role: "assistant";
    content: string;
  };
  error?: {
    code: string;
    message: string;
  };
}
