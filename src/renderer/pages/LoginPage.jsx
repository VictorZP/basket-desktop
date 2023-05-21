import * as React from "react";
const { useState, useEffect } = React;
import { useDispatch } from "react-redux";

const ipcRenderer = window.require("electron").ipcRenderer;

import { token } from "../redux/auth/authSlice.js";

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
		// Listen for the event
		ipcRenderer.on(CHANNELS.AUTH.LOGIN, (event, arg) => {
			if (arg === LOGIN_PAGE.ERR_MESSAGES.ON_LOGIN) {
				setLogError(true);
				return;
			}

			dispatch(token(arg?.token));
			setLogError(false);
		});
		// Clean the listener after the component is dismounted
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
