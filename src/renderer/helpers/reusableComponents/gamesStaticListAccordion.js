import React from "react";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiListItem from "@mui/material/ListItem";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";

import { grey } from "@mui/material/colors";

const borderColor = grey[100];

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&:before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === "dark"
			? "rgba(255, 255, 255, .05)"
			: "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: 0,
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
	paddingTop: 0,
	paddingBottom: 0,
	alignItems: "stretch",

	"&:not(:last-child)": {
		borderBottom: `1px solid ${grey[200]}`,
	},
}));

const Box = styled(MuiBox)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	overflow: "hidden",
	width: "8%",
	padding: 8,
	flexGrow: 1,
	"&:not(:last-child)": {
		borderRight: `1px solid  ${grey[200]}`,
	},
}));

export { Accordion, AccordionSummary, AccordionDetails, ListItem, Box };
