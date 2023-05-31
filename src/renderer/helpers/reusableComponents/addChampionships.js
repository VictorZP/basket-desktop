import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledChampSettingsBox = styled(Box)(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "repeat(5, minmax(150px, 210px)) 10% 5%",
	columnGap: 10,
	alignItems: "center",
	padding: "10px 0px",
}));
