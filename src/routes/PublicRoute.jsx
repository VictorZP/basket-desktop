import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
	const isLoggedIn = false;
	console.log("public");
	return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
