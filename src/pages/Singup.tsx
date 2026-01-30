import { Outlet } from "react-router";

const Singup = () => {
    
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 min-w-screen">
            <Outlet />
        </div>
    );
};

export default Singup;
