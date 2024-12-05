import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ChampionshipModalContainer = styled(Box)(() => ({
	display: "flex",
	minWidth: "900px",
	minHeight: "750px",
	width: "100%",
	height: "100%",
	padding: "24px",
	justifyContent: "center",
	alignItems: "center",
}));

export const ChampionshipModalInnerBox = styled(Box)(() => ({
	width: "900px",
	height: "750px",
	padding: "20px",
	borderRadius: "10px",
	background: "#fff",
}));
