import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/auth/useAuth";

const ProtectedRoute = () => {
    const isAuthenticated = useAuth((s) => s.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
