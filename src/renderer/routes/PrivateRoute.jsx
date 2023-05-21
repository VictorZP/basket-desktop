import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ipcRenderer = window.require("electron").ipcRenderer;

import Box from "@mui/material/Box";

import { CHANNELS } from "../../common/constants/channels.js";
import { getToken } from "../redux/auth/authSelector.js";
import { setToken } from "../redux/auth/authSlice.js";

const PrivateRoute = () => {
	const token = useSelector(getToken);
	const [isLoggedIn, setIsLoggedIn] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const getTokenStorage = async () => {
			try {
				const res = await ipcRenderer.invoke(CHANNELS.STORAGE.GET_TOKEN);
				if (res?.token) {
					setIsLoggedIn(res?.token);
					dispatch(setToken(res?.token));
					setIsLoading(false);
				}
			} catch (error) {
				console.log("error: ", error);
				return;
			}
		};

		if (token) {
			setIsLoggedIn(token);
			setIsLoading(false);
		} else {
			getTokenStorage();
		}
	}, []);

	if (isLoading && !isLoggedIn) {
		//Loading spinner in future
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<p>loading</p>
			</Box>
		);
	} else if (!isLoading && isLoggedIn) {
		return <Outlet />;
	} else if (!isLoading && !isLoggedIn) {
		return <Navigate to="login" replace />;
	}
};

export default PrivateRoute;
