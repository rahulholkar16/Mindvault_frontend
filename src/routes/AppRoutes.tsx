import { Route, Routes } from "react-router";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Welcome = lazy(() => import("../pages/Welcome"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Singup"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
