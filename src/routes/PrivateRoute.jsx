import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Navigate, useLocation, useNavigate } from "react-router";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const from = location.pathname;

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (!user) {
        return (
            <Navigate
                state={{ from: location.pathname }}
                to="/login"
            ></Navigate>
        );
    }

    if (loading) {
        return;
    }

    return children;
};

export default PrivateRoute;
