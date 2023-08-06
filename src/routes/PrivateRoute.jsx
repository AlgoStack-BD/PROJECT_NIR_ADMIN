import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { Alert } from "@mui/material";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(user?.token)
    if (loading) {
        return <progress className="w-100 text-center">Loading...</progress>;
    }
    if (user?.isAdmin != true) {
        return <Alert severity="warning">Warning..Unauthorized login recognized..</Alert>;
    }
    if (user?.isAdmin == true) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
