import React from "react";

import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@mui/material";

import { StyledTableRow } from "../../../helpers/reusableComponents/tableComponents.js";

const headerNames = ["№", "Дата", "Рузельтат", "Ошибки", ""];

const ParserDataTable = ({ page, rowsPerPage, dataList = [] }) => {
	const countNumber = 1 + page * rowsPerPage;
	return (
		<Table>
			<TableHead>
				<TableRow sx={{ backgroundColor: "#3f51b5" }}>
					<TableCell sx={{ color: "white", width: 60 }}>
						{headerNames.at(0)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 200 }}>
						{headerNames.at(1)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 220 }}>
						{headerNames.at(2)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 220 }}>
						{headerNames.at(3)}
					</TableCell>
					<TableCell sx={{ color: "white" }}>{headerNames.at(4)}</TableCell>
				</TableRow>
			</TableHead>
			<TableBody
				sx={{
					borderLeft: "1px solid #e0e0e0",
					borderRight: "1px solid #e0e0e0",
				}}
			>
				{dataList?.map((row, index) => (
					<StyledTableRow key={row.id}>
						<TableCell>{index + countNumber}</TableCell>
						<TableCell>{row?.title ?? ""}</TableCell>
						<TableCell>{row?.successDataValue ?? ""}</TableCell>
						<TableCell>{row?.errorDataValue ?? ""}</TableCell>
						<TableCell></TableCell>
					</StyledTableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ParserDataTable;
