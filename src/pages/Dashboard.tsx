import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { useContent } from "../store/content/useContent";
import SidebarSkeleton from "../components/skeleton/SidebarSkeleton";
import ErrorOverlay from "../components/ErrorCard/ErrorOverlay/ErrorOverlay";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";
import { Outlet } from "react-router";
const Sidebar = lazy(() => import("../components/Sidebar"));

const Dashboard = () => {
    const fetchAll = useContent((s) => s.fetchAll);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = useCallback(() => setIsSidebarOpen((s) => !s), []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    useEffect(() => {
        if (window.twttr) return;
        const s = document.createElement("script");
        s.src = "https://platform.twitter.com/widgets.js";
        s.async = true;
        document.body.appendChild(s);
    }, []);

    return (
        <div className="flex h-screen bg-gray-900 w-full overflow-hidden">
            <ErrorOverlay />
            <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onToggle={toggleSidebar}
                />
            </Suspense>

            <div className="text-white p-6 py-5 w-full overflow-y-auto relative">
                <DashboardNavbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;