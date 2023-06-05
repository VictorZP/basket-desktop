import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledTeamNamesForm = styled(Box)(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(150px, 210px))",
	columnGap: 10,
	alignItems: "center",
	padding: "10px 0px",
}));
