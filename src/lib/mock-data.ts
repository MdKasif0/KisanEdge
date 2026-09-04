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
  forecast: { day: string; temp: number; icon: string }[];
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  date: string;
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

export const MOCK_WEATHER: Weather = {
  temp: 28,
  condition: "Sunny",
  humidity: 65,
  forecast: [
    { day: "Mon", temp: 28, icon: "☀️" },
    { day: "Tue", temp: 29, icon: "🌤️" },
    { day: "Wed", temp: 24, icon: "🌧️" },
    { day: "Thu", temp: 26, icon: "⛅" },
  ],
};

export const MOCK_ALERTS: Alert[] = [
  {
    id: "a1",
    title: "Possible Late Blight Detected",
    description: "Camera scan detected early signs of Late Blight on Tomato (Roma).",
    severity: "critical",
    date: "2 hours ago",
  },
  {
    id: "a2",
    title: "High Heat Warning",
    description: "Temperatures expected to exceed 35°C tomorrow. Increase irrigation.",
    severity: "warning",
    date: "5 hours ago",
  },
  {
    id: "a3",
    title: "Fertilizer Schedule",
    description: "Time to apply nitrogen fertilizer to Wheat Field A.",
    severity: "info",
    date: "1 day ago",
  },
];

export const MOCK_FARMER_INSIGHTS = [
  {
    id: "f1",
    title: "Disease Risk",
    description: "High humidity may increase fungal disease risk on Tomato crops.",
    icon: "warning",
    color: "orange"
  },
  {
    id: "f2",
    title: "Soil Moisture",
    description: "Soil moisture is below your preferred range in Field B.",
    icon: "droplet",
    color: "blue"
  },
  {
    id: "f3",
    title: "Weather Alert",
    description: "Heavy rain expected tomorrow. Plan harvest accordingly.",
    icon: "cloud",
    color: "indigo"
  }
];

export const MOCK_HOME_INSIGHTS = [
  {
    id: "h1",
    title: "Watering",
    description: "Water your Tulsi. The top soil looks dry.",
    icon: "droplet",
    color: "blue"
  },
  {
    id: "h2",
    title: "Sunlight",
    description: "Rotate your Aloe Vera toward the window for even growth.",
    icon: "sun",
    color: "amber"
  },
  {
    id: "h3",
    title: "Care Watch",
    description: "Check your Rose plant for early fungal spots due to humidity.",
    icon: "warning",
    color: "orange"
  }
];

export type Diagnosis = {
  disease: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High";
  type: "disease" | "pest" | "nutrient" | "healthy";
};

export const MOCK_DIAGNOSES: Record<string, Diagnosis> = {
  tomato: { disease: "Possible Early Blight detected", confidence: 94, severity: "Moderate", type: "disease" },
  potato: { disease: "Possible Late Blight detected", confidence: 91, severity: "High", type: "disease" },
  apple: { disease: "Possible Apple Scab detected", confidence: 93, severity: "Moderate", type: "disease" },
  wheat: { disease: "Possible Wheat Rust detected", confidence: 89, severity: "High", type: "disease" },
  rice: { disease: "Possible Rice Blast detected", confidence: 92, severity: "High", type: "disease" },
  rose: { disease: "Possible Powdery Mildew detected", confidence: 88, severity: "Moderate", type: "disease" },
  hibiscus: { disease: "Possible Aphid Infestation detected", confidence: 95, severity: "Moderate", type: "pest" },
  money_plant: { disease: "Possible Nitrogen Deficiency", confidence: 85, severity: "Low", type: "nutrient" },
  default_healthy: { disease: "No major visible disease detected", confidence: 96, severity: "Low", type: "healthy" },
  default_disease: { disease: "Possible Fungal Infection detected", confidence: 87, severity: "Moderate", type: "disease" }
};
