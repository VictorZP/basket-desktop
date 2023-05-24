import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";

import { setNavBar } from "./functions.js";

import { TOOLTIPS } from "../../../common/constants/index.js";

const AppNavBar = ({ mainTitle, isOpen, handleSMOpen, theme }) => {
	const NavBar = setNavBar(theme, isOpen);

	return (
		<NavBar position="fixed" open={isOpen}>
			<Toolbar>
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
