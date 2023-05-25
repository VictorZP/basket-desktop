import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
	StyledTableCell,
	StyledTableRow,
} from "../../helpers/reusableComponents/tableComponents.js";

const MSCyberTable = ({ cyberList }) => {
	return (
		<Box sx={{ px: 3 }}>
			<TableContainer component={Paper} sx={{ maxWidth: 600 }}>
				<Table sx={{ minWidth: 350 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Название</StyledTableCell>
							<StyledTableCell align="right"></StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cyberList.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell component="th" scope="row">
									{row.cyberName}
								</StyledTableCell>
								<StyledTableCell>Settings</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default MSCyberTable;
