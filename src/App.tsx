import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";

const App = () => {
    useEffect(() => {
        if (!window.twttr) {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Singup />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default App;
