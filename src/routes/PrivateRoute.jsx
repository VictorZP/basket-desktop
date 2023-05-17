import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const isLoggedIn = false;
	console.log("private");
	return isLoggedIn ? <Outlet /> : <Navigate to="login" replace />;
};

export default PrivateRoute;
