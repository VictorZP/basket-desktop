import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { getToken } from "../redux/auth/authSelector.js";

const PublicRoute = () => {
	const token = useSelector(getToken);
	return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
