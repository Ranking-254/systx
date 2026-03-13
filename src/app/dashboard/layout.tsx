import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-black min-h-screen">
      {/* You might want a different, simpler Navbar for the Dashboard */}
      <div className="max-w-[1600px] mx-auto">
        {children}
      </div>
    </section>
  );
}