import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { setToken } from "../redux/auth/authSlice.js";

import LoginScreen from "../components/LoginScreen";

import { LOGIN_PAGE } from "../constants/loginPage.js";
import { CHANNELS } from "../../common/constants/channels.js";

const LoginPage = () => {
	const [logError, setLogError] = useState(false);
	const [errorMessage, setErrorMessage] = useState({
		email: " ",
		password: "",
	});
	const dispatch = useDispatch();

	const { ERR_MESSAGES } = LOGIN_PAGE;

	const handleSubmit = async (e) => {
		e?.preventDefault();
		const data = new FormData(e.currentTarget);
		const reqData = {
			email: data.get("email"),
			password: data.get("password"),
		};
		ipcRenderer.send(CHANNELS.AUTH.LOGIN, reqData);
	};

	useEffect(() => {
		ipcRenderer.on(CHANNELS.AUTH.LOGIN, (event, arg) => {
			console.log("🚀 ~ arg:", arg);
			if (
				arg.statusCode === 400 &&
				(arg.message === ERR_MESSAGES.EMAIL_FORMAT ||
					arg.message === ERR_MESSAGES.EMAIL_REQUIRED)
			) {
				setErrorMessage({
					email: arg?.message ?? ERR_MESSAGES.ON_LOGIN,
					password: ERR_MESSAGES.ON_LOGIN,
				});
				setLogError(true);
				return;
			} else if (
				arg.statusCode === 400 &&
				arg.message === ERR_MESSAGES.PASSWORD_REQUIRED
			) {
				setErrorMessage({
					email: ERR_MESSAGES.ON_LOGIN,
					password: arg?.message ?? ERR_MESSAGES.ON_LOGIN,
				});
				setLogError(true);
				return;
			} else if (arg.statusCode === 401) {
				setErrorMessage({
					email: arg?.message ?? ERR_MESSAGES.ON_LOGIN,
					password: arg?.message ?? ERR_MESSAGES.ON_LOGIN,
				});
				setLogError(true);
				return;
			} else if (arg.statusCode !== 200) {
				enqueueSnackbar(`${ERR_MESSAGES.SERVER_ERR}. ${arg.message}`, {
					variant: "error",
				});
			}

			dispatch(setToken(arg?.token));
			setLogError(false);
		});

		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	const loginScreenProps = {
		errorMessage,
		logError,
		handleSubmit,
		setLogError,
	};

	return <LoginScreen {...loginScreenProps} />;
};

export default LoginPage;
