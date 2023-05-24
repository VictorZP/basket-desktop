import React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import MSCyberForm from "../components/MSCyberForm/MSCyberForm.jsx";

const MatchesSettings = () => {
	return (
		<Box component="section">
			<MSCyberForm />
			<Divider sx={{ width: "100w" }} />
		</Box>
	);
};

export default MatchesSettings;
