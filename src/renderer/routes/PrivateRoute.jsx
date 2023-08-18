import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import LoadingSpinner from "../components/LoadingSpinner";

import { CHANNELS } from "../../common/constants/channels.js";
import { getToken } from "../redux/auth/authSelector.js";
import { setToken } from "../redux/auth/authSlice.js";

const PrivateRoute = () => {
	const token = useSelector(getToken);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const getTokenStorage = async () => {
			try {
				const res = await ipcRenderer.invoke(CHANNELS.STORAGE.GET_TOKEN);

				if (!res?.token) {
					setIsLoading(false);
					return;
				}

				const tokenVerified = await ipcRenderer.invoke(
					CHANNELS.AUTH.CHECK_TOKEN,
					{ token: res?.token }
				);

				if (
					tokenVerified?.statusCode !== 200 &&
					tokenVerified?.statusText !== "OK"
				) {
					const message = `${tokenVerified?.message} Код: ${tokenVerified?.statusCode}`;
					enqueueSnackbar(message, {
						variant: "error",
					});
					setIsLoading(false);
					return;
				}

				setIsLoggedIn(res?.token);
				dispatch(setToken(res?.token));
				setIsLoading(false);
			} catch (error) {
				enqueueSnackbar(error?.message, {
					variant: "error",
				});
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
		return <LoadingSpinner height={"100vh"} />;
	} else if (!isLoading && isLoggedIn) {
		return <Outlet />;
	} else if (!isLoading && !isLoggedIn) {
		return <Navigate to="login" replace />;
	}
};

export default PrivateRoute;
