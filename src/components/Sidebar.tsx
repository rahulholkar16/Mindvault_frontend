import { Brain, Plus, Menu, X, LogOut } from "lucide-react";
import type { SidebarProp } from "../types";
import { sidebar } from "../data/index.tsx";
const Sidebar: React.FC<SidebarProp> = ({ isOpen, onToggle }) => {
    return (
        <>
            <button
                onClick={onToggle}
                className="fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg shadow-lg hover:bg-slate-700 transition-colors lg:hidden text-slate-400"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div
                className={`fixed items-start px-5 lg:relative lg:w-64 w-16 inset-y-0 left-0 z-40 bg-slate-800 border-r border-slate-700 flex flex-col py-6 transition-all duration-300 ${
                    isOpen ? "translate-x-0 w-[55%]" : "w-16 lg:translate-x-0 "
                }`}
            >
                <div className="flex flex-col gap-6 flex-1 w-full">
                    <div className="p-3 w-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                        <Brain size={24} className="text-white" />
                    </div>
                    {sidebar.map((item, index) => (
                        <button
                            key={index}
                            //   onClick={onCreateNote}
                            className={`p-3 mt-2 transition-all hover:scale-105 active:scale-95 text-white 
                                ${isOpen ? "" : "overflow-hidden"}`}
                            title={item.title}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                {item.title}
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    //   onClick={handleSignOut}
                    className="p-3 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-xl transition-all hover:scale-105 active:scale-95"
                    title="Sign Out"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </>
    );
};

export default Sidebar;
