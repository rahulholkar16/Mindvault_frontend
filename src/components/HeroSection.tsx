import { ArrowRight } from "lucide-react";
import HeroImage from "../images/HeroImage.png";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useAuth } from "../store/auth/useAuth";

const HeroSection = () => {
    const nevigate = useNavigate();
    const isAuthenticated = useAuth((state) => state.status);
    return (
        <div className="text-white w-full mx-auto px-6 py-10">
            <div className="flex w-full items-center justify-between px-4 gap-10">
                <div className="w-3/4">
                    <h2 className="text-6xl font-bold mb-6 leading-tight text-start">
                        Your Personal{" "}
                        <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Knowledge Hub
                        </span>
                    </h2>
                    <p className="text-slate-300 text-xl text-start mb-8 leading-relaxed">
                        Capture, organize, and connect your thoughts. Build a
                        second brain that grows with you and helps you think
                        better.
                    </p>
                </div>
                <img src={HeroImage} />
            </div>
            <div className="flex gap-5 px-4 items-center">
                <Button
                    text={
                        isAuthenticated === "authenticated"
                            ? "Get Started Free"
                            : "Sing In"
                    }
                    color="primary"
                    size="large"
                    disabled={false}
                    onClick={
                        isAuthenticated === "authenticated"
                            ? () => nevigate("/dashboard")
                            : () => nevigate("/register")
                    }
                >
                    <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </Button>

                {isAuthenticated === "unauthenticated" && (
                    <Button
                        text="Login"
                        color="secondary"
                        size="large"
                        disabled={false}
                        onClick={() => nevigate("/login")}
                    />
                )}
            </div>
        </div>
    );
};

export default HeroSection;