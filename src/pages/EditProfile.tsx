import { useAuth } from "../store/auth/useAuth";
import NoProfile from "../images/noProfile.png";
import { EditProfileTab } from "../data";
import { useState } from "react";
import { Link, Outlet } from "react-router";

const EditProfile = () => {
    const avatar = useAuth((s) => s.user?.avatar);
    const name = useAuth((s) => s.user?.name);
    const [activeTab, setActiveTab] = useState("Profile");
    return (
        <div className="flex h-screen bg-gray-900 w-full">
            <div className="mx-auto p-6 w-[80%]">
                <div className="border border-gray-600/50 h-full flex">
                    <div className="border-r border-gray-600/50 w-1/4 h-full p-2">
                        <div className="flex flex-col items-center gap-8 w-full justify-center">
                            <div className="text-center">
                                <div className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1">
                                    <img
                                        src={avatar || NoProfile}
                                        className="rounded-full h-full w-full"
                                        fetchPriority="high"
                                    />
                                </div>
                                <p className="text-2xl font-medium text-white">
                                    {name}
                                </p>
                            </div>

                            <div className="text-start w-full text-white">
                                {EditProfileTab.map((tab) => (
                                    <div
                                        key={tab.title}
                                        onClick={() => setActiveTab(tab.title)}
                                        className={`p-2 cursor-pointer hover:bg-gray-600 ${
                                            activeTab === tab.title
                                                ? "bg-gray-600"
                                                : ""
                                        }`}
                                    >
                                        <Link to={tab.onClick} className="w-full block">{tab.title}</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
