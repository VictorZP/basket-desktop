import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Tooltip,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { SIDE_MENU, TOOLTIPS } from "../../../common/constants/index.js";

import { setDrawer, setDrawerHeader } from "./functions.js";

const SideMenu = ({ isOpen, theme, handleSMClose }) => {
	const navigate = useNavigate();
	const Drawer = setDrawer(theme);
	const DrawerHeader = setDrawerHeader(theme);

	const handleClick = (pName) => {
		navigate(`/${pName}`);
	};

	const iconsArr = [<HomeIcon />, <BarChartIcon />, <EditNoteIcon />];

	return (
		<Drawer variant="permanent" open={isOpen}>
			<DrawerHeader>
				<Tooltip title={TOOLTIPS.NAVBAR_MENU_MIN}>
					<IconButton onClick={handleSMClose}>
						<ChevronLeftIcon />
					</IconButton>
				</Tooltip>
			</DrawerHeader>
			<Divider />
			<List>
				{SIDE_MENU.MATCH_LIST.map(({ TITLE, PAGE_NAME }, index) => (
					<ListItem key={PAGE_NAME} disablePadding sx={{ display: "block" }}>
						<Tooltip title={isOpen ? "" : TITLE} placement="right">
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: isOpen ? "initial" : "center",
									px: 2.5,
								}}
								onClick={() => handleClick(PAGE_NAME)}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: isOpen ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{iconsArr[index]}
								</ListItemIcon>
								<ListItemText
									primary={TITLE}
									sx={{ opacity: isOpen ? 1 : 0 }}
								/>
							</ListItemButton>
						</Tooltip>
					</ListItem>
				))}
			</List>
			<Divider />
		</Drawer>
	);
};

SideMenu.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	theme: PropTypes.object.isRequired,
	handleSMClose: PropTypes.func.isRequired,
};

export default SideMenu;
