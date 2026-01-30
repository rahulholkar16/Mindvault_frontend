import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/auth/useAuth";

const ProtectedRoute = () => {
    const status = useAuth((s) => s.status);

    if (status !== "authenticated") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
