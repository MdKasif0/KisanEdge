import { redirect } from "next/navigation";

export default function RootPage() {
  // In a real app, check if user is onboarded, else redirect to /onboarding
  redirect("/home");
}
