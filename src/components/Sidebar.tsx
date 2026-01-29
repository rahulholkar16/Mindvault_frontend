import { memo, useCallback } from "react";
import { Brain, Menu, X, LogOut } from "lucide-react";
import type { SidebarProp } from "../types";
import { sidebar } from "../data";
import { useAuth } from "../store/auth/useAuth";
import { useContent } from "../store/content/useContent";

const Sidebar: React.FC<SidebarProp> = ({ isOpen, onToggle }) => {
    const logout = useAuth((s) => s.logout);

    const fetchAll = useContent((s) => s.fetchAll);
    const fetchByType = useContent((s) => s.fetchByType);

    const dataFetch = useCallback(
        async (type: string) => {
            if (type === "tag" || type === "all") {
                await fetchAll();
                return;
            }
            await fetchByType(type);
        },
        [fetchAll, fetchByType],
    );

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
                <div className="flex flex-col gap-4 flex-1 w-full">
                    <div className="p-3 w-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                        <Brain size={24} className="text-white" />
                    </div>

                    {sidebar.map((item) => (
                        <button
                            key={item.type} // ✅ stable key, no css change
                            onClick={() => dataFetch(item.type)}
                            className={`p-3 mt-2 transition-transform hover:scale-105 active:scale-95 focus:shadow-lg focus:border focus:rounded-lg text-white
                ${item?.type === "all" ? "focus:focus:shadow-lg focus:border focus:rounded-lg" : ""}
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
                    onClick={logout}
                    className="p-3 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-xl transition-all hover:scale-105 active:scale-95"
                    title="Sign Out"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </>
    );
};

export default memo(Sidebar);
