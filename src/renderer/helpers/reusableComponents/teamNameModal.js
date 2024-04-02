import { styled } from "@mui/material/styles";
import Box, { boxClasses } from "@mui/material/Box";

export const TeamModalContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	minWidth: "900px",
	minHeight: "650px",
	width: "100%",
	height: "100%",
	padding: "24px",
	justifyContent: "center",
	alignItems: "center",
}));

export const TeamModalInnerBox = styled(Box)(({ theme }) => ({
	width: "900px",
	height: "650px",
	padding: "20px",
	borderRadius: "10px",
	background: "#fff",
}));
