import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";

import AppNavBar from "../components/AppNavBar";
import SideMenu from "../components/SideMenu";
import { SIDE_MENU } from "../../common/constants/index.js";
import { setDrawerHeader } from "../components/SideMenu/functions.js";

const initTitle = "Добро пожаловать";

const HomePage = () => {
	const theme = useTheme();
	let location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [mainTitle, setMainTitle] = useState("");

	useEffect(() => {
		let title = "";
		if (location.pathname !== "/") {
			const currentPage = location.pathname?.split("/")[1] ?? "";
			const page = SIDE_MENU.MATCH_LIST?.find((el) => {
				return el?.PAGE_NAME === currentPage;
			});

			title = page?.TITLE ?? initTitle;
		} else {
			title = initTitle;
		}
		setMainTitle(title);
	}, [location]);

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
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppNavBar {...appNavBarProps} />
			<SideMenu {...sideMenuProps} />
			<Box component="main" sx={{ flexGrow: 1, paddingY: 3 }}>
				<DrawerHeader />
				<Outlet />
			</Box>
		</Box>
	);
};

export default HomePage;
