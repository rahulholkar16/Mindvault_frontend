import { Brain } from "lucide-react";
const Navbar = () => {
    return (
        <div className="bg-gray-900 text-white sticky top-0">
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
                        <Brain size={24} />
                    </div>
                    <span className="text-xl font-bold">Second Brain</span>
                </div>
                <button
                    // onClick={onSignIn}
                    className="px-6 py-2 text-slate-300 hover:text-white transition-colors"
                >
                    Sign In
                </button>
            </nav>
        </div>
    );
};

export default Navbar;
