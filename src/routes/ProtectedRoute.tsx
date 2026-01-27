import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth/useAuth.js";

const ProtectedRoute = () => {
    const isAuthenticated = useAuth((s) => s.isAuthenticated);
    const isLoading = useAuth((s) => s.loading);

    if (isLoading) return <p>Loading...</p>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
