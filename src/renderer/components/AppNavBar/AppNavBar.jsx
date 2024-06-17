import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

const ipcRenderer = window.require("electron").ipcRenderer;

import MenuIcon from "@mui/icons-material/Menu";
import {
	Box,
	Toolbar,
	Typography,
	IconButton,
	Tooltip,
	Button,
} from "@mui/material";

import { setNavBar } from "./functions.js";

import { CHANNELS } from "../../../common/constants/channels.js";
import { TOOLTIPS, STATUS } from "../../../common/constants/index.js";

const AUTH_BTN_TEXT = {
	LOGIN: "Войти",
	LOGOUT: "Выйти",
};

const AppNavBar = ({ mainTitle, isOpen, handleSMOpen, theme }) => {
	const [isAuth, setIsAuth] = useState(false);
	const NavBar = setNavBar(theme, isOpen);

	useEffect(() => {
		const checkAuth = async () => {
			const response = await ipcRenderer.invoke(
				CHANNELS.MICROSOFT.IS_USER_AUTHENTICATED
			);
			setIsAuth(response.isAuthenticated);
		};
		checkAuth();
	}, [isAuth]);

	const handleClicked = async () => {
		const response = await ipcRenderer.invoke(CHANNELS.MICROSOFT.LOGIN);

		if (response.status === STATUS.ERROR) {
			enqueueSnackbar(response?.message, {
				variant: "error",
			});
			return;
		}

		if (response.status === STATUS.SUCCESS) {
			setIsAuth(true);
		}
	};

	const handleLogOut = async () => {
		const logOutResponse = await ipcRenderer.invoke(CHANNELS.MICROSOFT.LOGOUT);

		if (logOutResponse.status === STATUS.ERROR) {
			enqueueSnackbar(logOutResponse?.message, {
				variant: "error",
			});
			return;
		}

		if (logOutResponse.status === STATUS.SUCCESS) {
			setIsAuth(false);
		}
	};

	return (
		<NavBar position="fixed" open={isOpen}>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Box display="flex" alignItems="center">
					<Tooltip title={TOOLTIPS.NAVBAR_MENU} placement="right">
						<IconButton
							color="inherit"
							aria-label="open application navigation"
							onClick={handleSMOpen}
							edge="start"
							sx={{
								marginRight: 5,
								...(isOpen && { display: "none" }),
							}}
						>
							<MenuIcon />
						</IconButton>
					</Tooltip>
					<Typography variant="h6" noWrap component="div">
						{mainTitle}
					</Typography>
				</Box>
				<Box display="flex" alignItems="center" width="100px">
					<Button
						variant="contained"
						color={`${isAuth ? "error" : "success"}`}
						fullWidth
						onClick={isAuth ? handleLogOut : handleClicked}
					>
						{!isAuth ? AUTH_BTN_TEXT.LOGIN : AUTH_BTN_TEXT.LOGOUT}
					</Button>
				</Box>
			</Toolbar>
		</NavBar>
	);
};

AppNavBar.propTypes = {
	mainTitle: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	handleSMOpen: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
};

export default AppNavBar;
