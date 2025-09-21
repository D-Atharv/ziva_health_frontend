import { Navbar } from "@/components/Navbar"; // Ensure this path is correct

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* The 'children' will be the actual page component (e.g., events, create, etc.) */}
      <div className="flex-grow w-full">{children}</div>
    </div>
  );
}
