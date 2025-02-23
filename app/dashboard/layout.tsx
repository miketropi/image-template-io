import { Sidebar } from "lucide-react";
import SidebarNav from "../components/SidebarNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="grid grid-cols-8 gap-5 min-h-screen">
        {/* Left Sidebar */}
        <div className="col-span-2 bg-gray-50 shadow-sm p-6 rounded-xl">
          <div className="space-y-4">
            <SidebarNav />
          </div>
        </div>

        {/* Main Content */}
        <main className="col-span-6 bg-gray-50 rounded-lg">
          {children}
        </main>
      </div>
    </div>
  );
}