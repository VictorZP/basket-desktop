import * as React from "react";
const { useState, useEffect } = React;
import { useDispatch } from "react-redux";

const ipcRenderer = window.require("electron").ipcRenderer;

import { setToken } from "../redux/auth/authSlice.js";

import LoginScreen from "../components/LoginScreen";

import { LOGIN_PAGE } from "../../common/constants/index.js";
import { CHANNELS } from "../../common/constants/channels.js";

const LoginPage = () => {
	const [logError, setLogError] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e?.preventDefault();
		const data = new FormData(e.currentTarget);
		const reqData = {
			email: data.get("email"),
			password: data.get("password"),
		};
		await ipcRenderer.send(CHANNELS.AUTH.LOGIN, reqData);
	};

	useEffect(() => {
		ipcRenderer.on(CHANNELS.AUTH.LOGIN, (event, arg) => {
			if (arg === LOGIN_PAGE.ERR_MESSAGES.ON_LOGIN) {
				setLogError(true);
				return;
			}

			ipcRenderer.send(CHANNELS.STORAGE.SET_TOKEN, arg?.token);

			dispatch(setToken(arg?.token));
			setLogError(false);
		});

		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	const loginScreenProps = {
		logError,
		handleSubmit,
		setLogError,
	};

	return <LoginScreen {...loginScreenProps} />;
};

export default LoginPage;
