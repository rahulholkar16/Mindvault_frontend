import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { useContent } from "../store/content/useContent";
import SidebarSkeleton from "../components/skeleton/SidebarSkeleton";
import EditorSkeleton from "../components/skeleton/EditorSkeleton";
import DashboardSkeleton from "../components/skeleton/DashboardSkeleton";
import CardSkeleton from "../components/skeleton/CardSkeleton";
import Profile from "../components/Profile";
import ErrorOverlay from "../components/ErrorCard/ErrorOverlay/ErrorOverlay";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";

const Sidebar = lazy(() => import("../components/Sidebar"));
const Card = lazy(() => import("../components/Card"));
const NoteEditor = lazy(() => import("../components/NoteEditor"));

const Dashboard = () => {
    const content = useContent((s) => s.content);
    const status = useContent((s) => s.status);
    const fetchAll = useContent((s) => s.fetchAll);

    const [addForm, setAddForm] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleSidebar = useCallback(() => setIsSidebarOpen((s) => !s), []);

    const openAddForm = useCallback(() => setAddForm(true), []);
    const closeAddForm = useCallback(() => setAddForm(false), []);

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
                    onProfileOpen={setProfileOpen}
                />
            </Suspense>

            <div className="text-white p-6 py-5 w-full overflow-y-auto">
                <DashboardNavbar setAddForm={openAddForm} />

                {addForm ? (
                    <Suspense fallback={<EditorSkeleton />}>
                        <NoteEditor
                            setAddForm={closeAddForm}
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