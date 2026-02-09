import { useAuth } from "../store/auth/useAuth";
import NoProfile from "../images/noProfile.png";
import { EditProfileTab } from "../data";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Button from "../components/Button";

const EditProfile = () => {
    const avatar = useAuth((s) => s.user?.avatar);
    const name = useAuth((s) => s.user?.name);
    const [activeTab, setActiveTab] = useState("Profile");
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-gray-900 w-full overflow-hidden">
            <div className="mx-auto p-4 sm:p-6 w-full max-w-6xl flex flex-col">
                {/* TOP BAR WITH BUTTONS */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <Button
                        text="Back"
                        size="small"
                        color="secondary"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={18} />
                    </Button>

                    <Button
                        text="Dashboard"
                        size="small"
                        color="primary"
                        onClick={() => navigate("/dashboard")}
                    >
                        <LayoutDashboard size={18} />
                    </Button>
                </div>

                {/* MAIN CARD */}
                <div className="border border-slate-700/50 rounded-2xl flex flex-1 overflow-hidden bg-slate-800/20 backdrop-blur">
                    {/* LEFT SIDEBAR */}
                    <div className="hidden md:flex md:w-1/4 border-r border-slate-700/50 p-4 flex-col items-center gap-6">
                        <div className="text-center">
                            <div className="rounded-full h-28 w-28 border-2 bg-slate-700 border-slate-600 p-1 mx-auto">
                                <img
                                    src={avatar || NoProfile}
                                    className="rounded-full h-full w-full object-cover"
                                    alt="Profile"
                                />
                            </div>
                            <p className="text-xl font-semibold text-white mt-3">
                                {name}
                            </p>
                        </div>

                        <div className="w-full text-white">
                            {EditProfileTab.map((tab) => (
                                <div
                                    key={tab.title}
                                    onClick={() => setActiveTab(tab.title)}
                                    className={`p-3 cursor-pointer rounded-lg transition-all ${
                                        activeTab === tab.title
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-slate-700"
                                    }`}
                                >
                                    <Link
                                        to={tab.onClick}
                                        className="w-full block"
                                    >
                                        {tab.title}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MOBILE TABS (TOP) */}
                    <div className="md:hidden border-b border-slate-700/50 p-3 overflow-x-auto flex gap-2">
                        {EditProfileTab.map((tab) => (
                            <button
                                key={tab.title}
                                onClick={() => setActiveTab(tab.title)}
                                className={`px-4 py-2 rounded-lg text-sm ${
                                    activeTab === tab.title
                                        ? "bg-blue-500 text-white"
                                        : "bg-slate-700/50 text-slate-300"
                                }`}
                            >
                                <Link to={tab.onClick}>{tab.title}</Link>
                            </button>
                        ))}
                    </div>

                    {/* RIGHT CONTENT (OUTLET) */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;