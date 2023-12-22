import React from "react";

import { Box, Divider } from "@mui/material";

import Parser from "../components/ParserComponents/Parser";
import Filter from "../components/ParserComponents/Filter";
import ParserData from "../components/ParserComponents/ParserData";

const ParserPage = () => {
	return (
		<Box component="section">
			<Parser />
			<ParserData />
			<Divider />
			<Filter />
		</Box>
	);
};

export default ParserPage;
