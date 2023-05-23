import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";

import AppNavBar from "../components/AppNavBar";
import SideMenu from "../components/SideMenu";
import { setDrawerHeader } from "../components/SideMenu/functions.js";

const HomePage = () => {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [mainTitle, setMainTitle] = useState("Добро пожаловать");

	const DrawerHeader = setDrawerHeader(theme);

	const handleSMOpen = () => {
		setIsOpen(true);
	};

	const handleSMClose = () => {
		setIsOpen(false);
	};

	const appNavBarProps = {
		mainTitle,
		isOpen,
		theme,
		handleSMOpen,
	};

	const sideMenuProps = {
		isOpen,
		theme,
		handleSMClose,
		setMainTitle,
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppNavBar {...appNavBarProps} />
			<SideMenu {...sideMenuProps} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Outlet />
			</Box>
		</Box>
	);
};

export default HomePage;
