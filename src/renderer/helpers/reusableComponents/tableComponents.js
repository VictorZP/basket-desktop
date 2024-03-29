import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { indigo } from "@mui/material/colors";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		padding: "8px 10px",
		backgroundColor: indigo[500],
		color: theme.palette.common.white,
		fontSize: 16,
	},
	[`&.${tableCellClasses.body}`]: {
		padding: "8px 10px",
		fontSize: 14,
	},
	"&:first-of-type": {
		width: 170,
	},

	"&:nth-of-type(2)": {
		width: 160,
	},

	"&:nth-of-type(3)": {
		width: 250,
	},

	"&:nth-of-type(4)": {
		width: 250,
	},
	"&:nth-of-type(4)": {
		width: 230,
	},

	"&:nth-of-type(6)": {
		width: 140,
	},

	"&:last-of-type": {
		width: 105,
	},
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	"&:last-child td, &:last-child th": {
		border: 0,
	},
	"&:hover, &:focus": { backgroundColor: indigo[50] },
}));
