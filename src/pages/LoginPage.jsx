import * as React from "react";
const { useState, useEffect } = React;

const ipcRenderer = window.require("electron").ipcRenderer;

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { LOGIN_PAGE } from "../constants/index.js";
import { CHANNELS } from "../constants/channels.js";

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

	const sectionSX = {
		display: "flex",
		height: "100vh",
		justifyContent: "center",
		alignItems: "center",
	};
	const boxSX = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	};
	const formSX = {
		display: "flex",
		flexDirection: "column",
		width: 300,
		alignItems: "center",
	};
	const buttonSX = {
		mt: 3,
		mb: 2,
		width: 200,
	};

	return (
		<Container component="section" maxWidth="xs" sx={sectionSX}>
			<Box sx={boxSX}>
				<Typography component="h1" variant="h5">
					{LOGIN_PAGE.TITLE}
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={formSX}>
					<TextField
						error={logError}
						margin="normal"
						required
						fullWidth
						id="email"
						label={LOGIN_PAGE.LABEL.EMAIL}
						name="email"
						autoComplete="email"
						autoFocus
						helperText={logError && LOGIN_PAGE.ERR_MESSAGES.ON_LOGIN}
					/>

					<TextField
						error={logError}
						margin="normal"
						required
						fullWidth
						name="password"
						label={LOGIN_PAGE.LABEL.PASSWORD}
						type="password"
						id="password"
						autoComplete="current-password"
						helperText={logError && LOGIN_PAGE.ERR_MESSAGES.ON_LOGIN}
						onBlur={() => {
							setLogError(false);
						}}
					/>

					<Button type="submit" variant="contained" sx={buttonSX}>
						{LOGIN_PAGE.BUTTON.LOGIN}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;
