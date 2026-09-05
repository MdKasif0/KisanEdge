export type Plant = {
  id: string;
  name: string;
  type: string;
  status: "healthy" | "needs-attention" | "critical";
  healthScore: number;
  lastWatered: string;
  image: string;
};

export type Weather = {
  temp: number;
  condition: string;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  forecast: { day: string; temp: number; icon: string; condition: string }[];
};

export type AlertCategory = "disease" | "pest" | "irrigation" | "weather" | "heat" | "flood" | "care" | "sensor";

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  date: string;
  category: AlertCategory;
  relatedEntity?: string;
  action?: string;
  isRead?: boolean;
};

export const MOCK_PLANTS: Plant[] = [
  {
    id: "p1",
    name: "Tomato (Roma)",
    type: "Crop",
    status: "healthy",
    healthScore: 92,
    lastWatered: "Today, 8:00 AM",
    image: "🍅",
  },
  {
    id: "p2",
    name: "Monstera Deliciosa",
    type: "Indoor",
    status: "needs-attention",
    healthScore: 78,
    lastWatered: "2 days ago",
    image: "🌿",
  },
  {
    id: "p3",
    name: "Wheat Field A",
    type: "Crop",
    status: "critical",
    healthScore: 45,
    lastWatered: "5 days ago",
    image: "🌾",
  },
];

// Re-export from connected demo state
import { DEMO_WEATHER, DEMO_ALERTS, DEMO_HISTORY, DEMO_FIELDS } from "./demo-state";

export const MOCK_WEATHER: Weather = DEMO_WEATHER;

export const MOCK_ALERTS: Alert[] = DEMO_ALERTS;

export const MOCK_FARMER_INSIGHTS = [
  {
    id: "f1",
    title: "Weather Alert",
    description: "Rain expected in 18 hours. Review irrigation.",
    icon: "cloud",
    color: "indigo"
  },
  {
    id: "f2",
    title: "Disease Risk",
    description: "High humidity may increase fungal disease risk on Tomato crops.",
    icon: "warning",
    color: "orange"
  },
  {
    id: "f3",
    title: "Heat Stress",
    description: "Hot conditions may increase water stress in Field A.",
    icon: "sun",
    color: "amber"
  }
];

export const MOCK_HOME_INSIGHTS = [
  {
    id: "h1",
    title: "Care Watch",
    description: "Your Rose may need attention. Last scan indicated potential nutrient deficiency.",
    icon: "warning",
    color: "orange"
  },
  {
    id: "h2",
    title: "Watering",
    description: "Water your Tulsi today. It has been 3 days since last watering.",
    icon: "droplet",
    color: "blue"
  },
  {
    id: "h3",
    title: "Weather Impact",
    description: "Humidity conditions may increase fungal risk for indoor plants.",
    icon: "cloud",
    color: "indigo"
  }
];

export type Diagnosis = {
  disease: string;
  confidence: number;
  severity: "Healthy" | "Early" | "Moderate" | "Severe";
  type: "disease" | "pest" | "nutrient" | "healthy";
  reasons: string[];
  healthScore: number;
  environmentalRisk: {
    temp: string;
    humidity: string;
    moisture: string;
    rain: string;
    riskLevel: string;
    explanation: string;
  };
  recommendation: string;
  nextSteps: string[];
};

export const MOCK_DIAGNOSES: Record<string, Diagnosis> = {
  tomato: { 
    disease: "Possible Early Blight detected", 
    confidence: 94, 
    severity: "Moderate", 
    type: "disease",
    reasons: ["Target-like concentric rings on leaves", "Lower leaf yellowing (chlorosis)", "Brown lesions on stems", "Tomato crop context"],
    healthScore: 68,
    environmentalRisk: {
      temp: "26°C",
      humidity: "82%",
      moisture: "High",
      rain: "70%",
      riskLevel: "High disease risk",
      explanation: "High humidity and upcoming rainfall may create conditions highly favorable to fungal disease spread."
    },
    recommendation: "Monitor affected plants closely, avoid unnecessary overhead irrigation, and follow locally approved crop-management guidance for fungal control.",
    nextSteps: [
      "Inspect nearby plants for similar symptoms",
      "Prune affected lower leaves to improve air circulation",
      "Monitor environmental conditions over the next 48 hours",
      "Consult an agricultural expert if symptoms rapidly worsen"
    ]
  },
  potato: { 
    disease: "Possible Late Blight detected", 
    confidence: 91, 
    severity: "Severe", 
    type: "disease",
    reasons: ["Dark, water-soaked leaf spots", "White fungal growth on undersides", "Rapid tissue necrosis", "Potato crop context"],
    healthScore: 45,
    environmentalRisk: {
      temp: "22°C",
      humidity: "88%",
      moisture: "Very High",
      rain: "90%",
      riskLevel: "Critical disease risk",
      explanation: "Cool, extremely moist conditions are highly conducive to rapid Phytophthora infestans (Late Blight) progression."
    },
    recommendation: "Immediate action required. Remove and destroy heavily infected foliage, ensure excellent drainage, and seek approved chemical intervention guidelines.",
    nextSteps: [
      "Isolate affected areas immediately",
      "Avoid handling wet plants to prevent spread",
      "Apply approved protective sprays to healthy foliage",
      "Contact your local agricultural extension for emergency guidance"
    ]
  },
  default_healthy: { 
    disease: "No major visible disease detected", 
    confidence: 96, 
    severity: "Healthy", 
    type: "healthy",
    reasons: ["Consistent green leaf coloration", "No visible necrotic spots", "Normal leaf shape and texture"],
    healthScore: 92,
    environmentalRisk: {
      temp: "24°C",
      humidity: "60%",
      moisture: "Optimal",
      rain: "20%",
      riskLevel: "Low disease risk",
      explanation: "Current environmental conditions are optimal for plant growth and do not highly favor pathogen development."
    },
    recommendation: "Continue current care routine. Maintain consistent watering and observe plants periodically.",
    nextSteps: [
      "Maintain current irrigation schedule",
      "Rescan in 7-10 days to track ongoing health",
      "Log any changes in growth patterns"
    ]
  },
  default_disease: { 
    disease: "Possible Fungal Infection detected", 
    confidence: 87, 
    severity: "Early", 
    type: "disease",
    reasons: ["Minor leaf spotting", "Slight discoloration on edges", "Fungal patterns observed"],
    healthScore: 78,
    environmentalRisk: {
      temp: "25°C",
      humidity: "75%",
      moisture: "Moderate",
      rain: "40%",
      riskLevel: "Moderate disease risk",
      explanation: "Moderate humidity could allow existing fungal spores to slowly progress if ventilation is poor."
    },
    recommendation: "Improve air circulation around the plant and ensure leaves dry quickly after watering.",
    nextSteps: [
      "Check soil drainage",
      "Remove isolated affected leaves",
      "Monitor closely over the next week"
    ]
  }
};

// --- New Mock Data for Details & History ---

export type Field = {
  id: string;
  name: string;
  crop: string;
  area: string;
  sowingDate: string;
  growthStage: string;
  healthScore: number;
  alerts: number;
  risk: string;
  image: string;
};

export const MOCK_FIELDS: Field[] = DEMO_FIELDS;

export type DetailedPlant = {
  id: string;
  name: string;
  healthScore: number;
  waterStatus: string;
  sunlightStatus: string;
  diseaseStatus: string;
  image: string;
};

export const MOCK_HOME_PLANTS: DetailedPlant[] = [
  {
    id: "p1",
    name: "Tulsi",
    healthScore: 92,
    waterStatus: "Due today",
    sunlightStatus: "Adequate",
    diseaseStatus: "Healthy",
    image: "🌿"
  },
  {
    id: "p2",
    name: "Rose",
    healthScore: 78,
    waterStatus: "Watered yesterday",
    sunlightStatus: "Needs more light",
    diseaseStatus: "Attention",
    image: "🌹"
  },
  {
    id: "p3",
    name: "Monstera",
    healthScore: 88,
    waterStatus: "Good for 3 days",
    sunlightStatus: "Adequate",
    diseaseStatus: "Healthy",
    image: "🪴"
  }
];

export type HistoryScan = {
  id: string;
  date: string;
  crop: string;
  diagnosis: string;
  confidence: number;
  severity: "Healthy" | "Early" | "Moderate" | "Severe";
  healthScore: number;
  imagePath?: string;
};

export const MOCK_HISTORY: HistoryScan[] = DEMO_HISTORY;
