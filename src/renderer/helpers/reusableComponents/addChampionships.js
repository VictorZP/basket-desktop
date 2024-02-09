import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledChampSettingsBox = styled(Box)(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "repeat(4, minmax(150px, 230px)) 130px 150px 40px",
	gridAutoRows: "minmax(50px, auto)",
	gap: 10,
	alignItems: "center",
	padding: "10px 0px",
	maxWidth: "1300px",
}));
