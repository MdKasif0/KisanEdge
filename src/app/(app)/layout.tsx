import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-1 pb-20 w-full max-w-md mx-auto relative">{children}</main>
      <BottomNav />
    </div>
  );
}
