import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useAuth } from "./store/auth/useAuth";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
    const checkAuth = useAuth(state => state.checkAuth);
    const refreshAccessToken = useAuth((state) => state.refreshAccessToken);
    useEffect(() => {
        const initAuth = async () => {
            const ok = await checkAuth();

            if (!ok) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    await checkAuth(); // 👈 THIS IS MISSING
                }
            }
        };

        initAuth();
    }, [checkAuth, refreshAccessToken]);

    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Singup />} />
            
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default App;
