import React from "react";
import PropTypes from "prop-types";

import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { StyledTableRow } from "../../../helpers/reusableComponents/tableComponents.js";

import { LINES_DATA } from "../../../constants/lines.js";

const LinesDataTable = ({ dataList = [] }) => {
	return (
		<Table>
			<TableHead>
				<TableRow sx={{ backgroundColor: "#3f51b5" }}>
					<TableCell sx={{ color: "white", width: 60 }}>
						{LINES_DATA.HEADER_NAMES.at(0)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 200 }}>
						{LINES_DATA.HEADER_NAMES.at(1)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 220 }} align="center">
						{LINES_DATA.HEADER_NAMES.at(2)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 150 }} align="center">
						{LINES_DATA.HEADER_NAMES.at(3)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 150 }} align="center">
						{LINES_DATA.HEADER_NAMES.at(4)}
					</TableCell>
					<TableCell sx={{ color: "white" }}>
						{LINES_DATA.HEADER_NAMES.at(5)}
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody
				sx={{
					borderLeft: "1px solid #e0e0e0",
					borderRight: "1px solid #e0e0e0",
				}}
			>
				{dataList?.map((row, index) => (
					<StyledTableRow key={row.id}></StyledTableRow>
				))}
			</TableBody>
		</Table>
	);
};

LinesDataTable.propTypes = {
	dataList: PropTypes.array,
};

export default LinesDataTable;
