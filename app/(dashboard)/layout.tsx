"use client";

import BackgroundAnimation from "@/components/BackgroundAnimation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster"
const DashboardLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
                <Toaster />
            </div>
            <BackgroundAnimation />
        </div>
    );
}
export default DashboardLayout;