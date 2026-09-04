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
