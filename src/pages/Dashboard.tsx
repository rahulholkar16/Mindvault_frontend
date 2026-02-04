import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { useContent } from '../store/content/useContent.ts';
import SidebarSkeleton from "../components/skeleton/SidebarSkeleton.tsx";
import EditorSkeleton from "../components/skeleton/EditorSkeleton.tsx";
import DashboardSkeleton from "../components/skeleton/DashboardSkeleton.tsx";
import CardSkeleton from "../components/skeleton/CardSkeleton.tsx";
import Profile from "../components/Profile.tsx";
import ErrorOverlay from "../components/ErrorCard/ErrorOverlay/ErrorOverlay.tsx";
import DashboardNavbar from "../components/DashboardNavbar/DashboardButton.tsx";
const Sidebar = lazy(() => import("../components/Sidebar"));
const Card = lazy(() => import("../components/Card"));
const NoteEditor = lazy(() => import("../components/NoteEditor"));

const Dashboard = () => {
    const { content, status, fetchAll } = useContent();
    const [addForm, setAddForm] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);


    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if (window.twttr) return;
        const s = document.createElement("script");
        s.src = "https://platform.twitter.com/widgets.js";
        s.async = true;
        document.body.appendChild(s);
    }, []);   

    const toggleSidebar = useCallback(() => setIsSidebarOpen((s) => !s), []);
    
    return (
        <div className="flex h-screen bg-gray-900 w-full overflow-hidden">
            <ErrorOverlay />
            <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onToggle={toggleSidebar}
                    onProfileOpen={(state) => setProfileOpen(state)}
                />
            </Suspense>
            <div className="text-white p-6 py-5 w-full overflow-y-auto">
                <DashboardNavbar setAddForm={() => setAddForm(true)} />

                {addForm ? (
                    <Suspense fallback={<EditorSkeleton />}>
                        <NoteEditor
                            setAddForm={setAddForm}
                            isSidebarOpen={isSidebarOpen}
                        />
                    </Suspense>
                ) : status === "loading" ? (
                    <DashboardSkeleton />
                ) : profileOpen ? (
                    <Profile profileOpen={profileOpen} />
                ) : (
                    <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                        {content?.map((item) => (
                            <Suspense
                                key={item._id}
                                fallback={<CardSkeleton />}
                            >
                                <Card
                                    title={item.title}
                                    type={item.type}
                                    description={item.description}
                                    url={item.url}
                                    date={item.createdAt}
                                    isOpen={profileOpen}
                                />
                            </Suspense>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
