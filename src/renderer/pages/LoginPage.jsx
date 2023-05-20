import * as React from "react";
const { useState, useEffect } = React;

const ipcRenderer = window.require("electron").ipcRenderer;

import LoginScreen from "../components/LoginScreen";

import { LOGIN_PAGE } from "../../common/constants/index";
import { CHANNELS } from "../../common/constants/channels";

const LoginPage = () => {
	const [logError, setLogError] = useState(false);
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
