import { Route, Routes } from "react-router";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../pages/EditProfile";
import ProfileEdit from "../components/EditProfileComponents/ProfileEdit";
import EditPhoto from "../components/EditProfileComponents/EditPhoto";
import EditPrivacyAndSetting from "../components/EditProfileComponents/EditPrivacyAndSetting";
const Profile = lazy(() => import("../components/Profile"));
const NoteEditor = lazy(() => import("../components/NoteEditor"));
const ShareProfileCom = lazy(() => import("../components/ShareProfileCom/ShareProfile"));
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
                    <Route index element={<DashboardContent />} />
                    <Route path=":type" element={<DashboardContent />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="create" element={<NoteEditor />} />
                    <Route path="user/:token" element={<ShareProfileCom />} />
                </Route>

                <Route path="/edit-profile" element={<EditProfile />}>
                    <Route index element={<ProfileEdit />} />
                    <Route path="edit-photo" element={<EditPhoto />} />
                    <Route
                        path="edit-privacy-security"
                        element={<EditPrivacyAndSetting />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
