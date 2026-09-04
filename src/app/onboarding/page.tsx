import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col h-screen bg-brand-primary">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md mb-8">
          <Leaf className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tight">KisanEdge</h1>
        <p className="text-lg text-white/90 mb-8 max-w-xs">
          Smart care for every plant. Detect. Understand. Protect.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-t-3xl pb-safe">
        <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
          <Link href="/home" className="w-full">
            <Button size="lg" className="w-full text-lg h-14">Get Started</Button>
          </Link>
          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
