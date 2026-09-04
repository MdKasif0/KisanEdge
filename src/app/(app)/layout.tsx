import { BottomNav } from "@/components/layout/bottom-nav";
import { UserProvider } from "@/lib/store/user-store";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-[#f8faf9]">
        <main className="flex-1 pb-20 w-full max-w-md mx-auto relative">{children}</main>
        <BottomNav />
      </div>
    </UserProvider>
  );
}
