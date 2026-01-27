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
    useEffect(() => {
        checkAuth();
    }, []);

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
