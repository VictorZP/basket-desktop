import React from "react";

import { Box, Divider } from "@mui/material";

import Parser from "../components/ParserComponents/Parser";
import Filter from "../components/ParserComponents/Filter";

const ParserPage = () => {
	return (
		<Box component="section">
			<Parser />
			<Divider />
			<Filter />
		</Box>
	);
};

export default ParserPage;
