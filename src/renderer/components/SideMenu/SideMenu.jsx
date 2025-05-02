import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Tooltip,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import EditNoteIcon from "@mui/icons-material/EditNote";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import DataThresholdingOutlinedIcon from "@mui/icons-material/DataThresholdingOutlined";

import { SIDE_MENU, TOOLTIPS } from "../../../common/constants/index.js";

import { setDrawer, setDrawerHeader } from "./functions.js";

const SideMenu = ({ isOpen, theme, handleSMClose }) => {
	const navigate = useNavigate();
	const Drawer = setDrawer(theme);
	const DrawerHeader = setDrawerHeader(theme);

	const handleClick = (pName) => {
		navigate(`/${pName}`);
	};

	const iconsArr = [
		<HomeIcon />,
		<BarChartIcon />,
		<ViewTimelineIcon />,
		<QueryStatsIcon />,
		<DataThresholdingOutlinedIcon />,
		<EditNoteIcon />,
	];
	const parserIconsArr = [<ScreenSearchDesktopIcon />, <EditNoteIcon />];

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
				{SIDE_MENU.MATCH_LIST.map(({ TITLE, PAGE_NAME }, index) => {
					if (
						PAGE_NAME !== "active_games" &&
						PAGE_NAME !== "manual_results" &&
						PAGE_NAME !== "form_halves_statistics"
					)
						return (
							<ListItem
								key={PAGE_NAME}
								disablePadding
								sx={{ display: "block" }}
							>
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
						);
				})}
			</List>
			<Divider />
			<List>
				{SIDE_MENU.PARSER_LIST.map(({ TITLE, PAGE_NAME }, index) => {
					return (
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
										{parserIconsArr[index]}
									</ListItemIcon>
									<ListItemText
										primary={TITLE}
										sx={{ opacity: isOpen ? 1 : 0 }}
									/>
								</ListItemButton>
							</Tooltip>
						</ListItem>
					);
				})}
			</List>
		</Drawer>
	);
};

SideMenu.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	theme: PropTypes.object.isRequired,
	handleSMClose: PropTypes.func.isRequired,
};

export default SideMenu;
