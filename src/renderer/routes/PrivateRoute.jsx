import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { getToken } from "../redux/auth/authSelector.js";

const PrivateRoute = () => {
	const token = useSelector(getToken);

	return token ? <Outlet /> : <Navigate to="login" replace />;
};

export default PrivateRoute;
