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
