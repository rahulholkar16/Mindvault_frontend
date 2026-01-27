import {
    Brain,
    ArrowLeft,
    Mail,
    Lock,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { useAuth } from "../store/auth/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

const Singup = () => {
    const { register, loading, error, success } = useAuth();
    const nevigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email || !password || !name) {
            setLocalError("Please fill in all fields");
            return;
        }
        if (password.length < 6) {
            setLocalError("Password must be at least 6 characters");
            return;
        }
        await register(email, password, name);
        setEmail("");
        setPassword("");
        setName("");
        nevigate("/login");
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <button
                      onClick={() => nevigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
                            <Brain size={24} />
                        </div>
                        <h1 className="text-2xl font-bold">Second Brain</h1>
                    </div>

                    <h2 className="text-2xl font-bold mb-2 text-center">
                        Create account
                    </h2>
                    <p className="text-slate-400 text-center mb-8">
                        Join us to start building your second brain
                    </p>

                    {success && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 flex gap-3">
                            <CheckCircle
                                size={20}
                                className="text-green-400 shrink-0 mt-0.5"
                            />
                            <p className="text-green-300 text-sm">
                                Account created! Redirecting to sign in...
                            </p>
                        </div>
                    )}

                    {(error || localError) && !success && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex gap-3">
                            <AlertCircle
                                size={20}
                                className="text-red-400 shrink-0 mt-0.5"
                            />
                            <p className="text-red-300 text-sm">
                                {error || localError}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Name
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{" "}
                            <button
                                onClick={() => nevigate("/login")}
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singup;
