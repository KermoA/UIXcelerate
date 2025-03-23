import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
