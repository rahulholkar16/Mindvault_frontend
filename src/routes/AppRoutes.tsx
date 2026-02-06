import { Route, Routes } from "react-router";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
const Profile = lazy(() => import("../components/Profile"));
const NoteEditor = lazy(() => import("../components/NoteEditor"));
// import ShareProfileCom from "../components/ShareProfileCom/ShareProfile";
const DashboardContent = lazy(() => import("../components/DashboardContent/DashboardContent"));
const ProfileSelector = lazy(() => import("../components/ProfileSelector/ProfileSelector"));
const RegistrationForm = lazy(() => import("../components/RegistrationForm/RegistrationForm"));
const Welcome = lazy(() => import("../pages/Welcome"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Singup"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />}>
                <Route index element={<RegistrationForm />} />
                <Route path="change-pic" element={<ProfileSelector />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DashboardContent />}/>
                    <Route path=":type" element={<DashboardContent />}/>
                    <Route path="profile" element={<Profile />} />
                    <Route path="create" element={<NoteEditor />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
