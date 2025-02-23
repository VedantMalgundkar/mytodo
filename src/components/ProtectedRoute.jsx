import { useContext } from "react";
import { AuthContext } from "../context/Authcontext.jsx";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, authOnly = true }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
        return <Navigate to="/todo" />;
    }

    if (authOnly && !user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
