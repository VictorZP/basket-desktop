import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TableBtnStack from "../TableBtnStack";

import {
	StyledTableCell,
	StyledTableRow,
} from "../../helpers/reusableComponents/tableComponents.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

const MSCyberTable = ({ cyberList, handleDelete, handleEdit }) => {
	const { CYBER_TABLE } = MATCHES_SETTINGS;

	const btnStackProps = {
		onEdit: handleEdit,
		onDelete: handleDelete,
		editBtnName: MATCHES_SETTINGS.CYBER_TABLE.EDIT_BTN_N,
		delBtnName: MATCHES_SETTINGS.CYBER_TABLE.DEL_BTN_N,
	};

	return (
		<Box sx={{ px: 3, py: 1 }}>
			<TableContainer component={Paper} sx={{ maxWidth: 450 }}>
				<Table sx={{ minWidth: 300 }} aria-label="cyber table">
					<TableHead>
						<TableRow>
							<StyledTableCell>{CYBER_TABLE.CELL_T}</StyledTableCell>
							<StyledTableCell align="right"></StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cyberList.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell component="th" scope="row">
									{row.cyberName}
								</StyledTableCell>
								<StyledTableCell>
									<TableBtnStack {...btnStackProps} btnId={row.id} />
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

MSCyberTable.propTypes = {
	cyberList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
	handleEdit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default MSCyberTable;
