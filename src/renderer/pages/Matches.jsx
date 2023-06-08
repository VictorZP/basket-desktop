import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";

import LoadingSpinner from "../components/LoadingSpinner";

import { CONSTANTS } from "../constants/matchesPage.js";

const Matches = () => {
	return (
		<Box sx={{ outline: "1px solid red" }}>
			<Box>
				<Typography variant="h5">{CONSTANTS.ADD_URL.TITLE}</Typography>
				<Button variant="outlined" size="small">
					{CONSTANTS.ADD_URL.BTN_OPEN}
				</Button>
				<Suspense fallback={<LoadingSpinner height={"calc(100vh - 128px)"} />}>
					<Outlet />
				</Suspense>
			</Box>
		</Box>
	);
};

export default Matches;
