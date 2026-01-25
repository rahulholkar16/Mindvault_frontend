import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Dashboard from "./pages/Dashboard";

const App = () => {
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
