import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

import { drawerWidth } from "../SideMenu/functions.js";

const setNavBar = (theme, isOpen) => {
	return styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== "open",
	})(() => ({
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(isOpen && {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));
};

export { setNavBar };
