import { MOCK_PLANTS } from "@/lib/mock-data";
import { CropCard } from "@/components/features/crop-card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FarmPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-deep">My Farm</h1>
        <Button size="icon" className="rounded-full w-10 h-10">
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {MOCK_PLANTS.map(plant => (
          <CropCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
}
