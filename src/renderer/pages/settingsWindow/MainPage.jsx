import React from "react";

import { Box, Typography, Divider } from "@mui/material";

import AddressSettings from "../../components/SettingsWindow/AddressSettings";

import { SETTINGS_TEXT } from "../../constants/settingsWindow.js";

const MainPage = () => {
	return (
		<Box
			component="section"
			gap={2}
			py={2}
			display="flex"
			flexDirection="column"
		>
			<Typography variant="h5" px={2}>
				{SETTINGS_TEXT.TITLE}
			</Typography>
			<AddressSettings />
			<Divider />
		</Box>
	);
};

export default MainPage;
