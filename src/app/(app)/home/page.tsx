"use client";

import { useUser } from "@/lib/store/user-store";
import { FarmerDashboard } from "@/components/dashboard/farmer-dashboard";
import { HomeGrowerDashboard } from "@/components/dashboard/home-grower-dashboard";

export default function HomePage() {
  const { role } = useUser();

  if (role === "farmer") {
    return <FarmerDashboard />;
  }

  return <HomeGrowerDashboard />;
}
