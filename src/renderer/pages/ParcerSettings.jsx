import React from "react";

import Box from "@mui/material/Box";

import ParserSettingForm from "../components/ParserSettingsComponents/ParserSettingForm";

const ParserSettings = () => {
	return (
		<Box component="section">
			<Box>
				<ParserSettingForm />
			</Box>
		</Box>
	);
};

export default ParserSettings;
