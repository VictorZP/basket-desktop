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
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { StyledTableRow } from "../../../helpers/reusableComponents/tableComponents.js";

import { PARCER_DATA } from "../../../constants/parcer.js";

const ParserDataTable = ({
	page,
	rowsPerPage,
	selectedResult,
	isLoading,
	handleClick,
	dataList = [],
}) => {
	const countNumber = page * rowsPerPage;
	return (
		<Table>
			<TableHead>
				<TableRow sx={{ backgroundColor: "#3f51b5" }}>
					<TableCell sx={{ color: "white", width: 60 }}>
						{PARCER_DATA.HEADER_NAMES.at(0)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 200 }}>
						{PARCER_DATA.HEADER_NAMES.at(1)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 220 }} align="center">
						{PARCER_DATA.HEADER_NAMES.at(2)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 220 }} align="center">
						{PARCER_DATA.HEADER_NAMES.at(3)}
					</TableCell>
					<TableCell sx={{ color: "white" }}>
						{PARCER_DATA.HEADER_NAMES.at(4)}
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
					<StyledTableRow key={row.id}>
						<TableCell>{index + countNumber}</TableCell>
						<TableCell>{row?.title ?? ""}</TableCell>
						<TableCell align="center">
							<LoadingButton
								id={`success_${row.id}`}
								variant="outlined"
								size="small"
								loadingPosition="start"
								startIcon={<FileDownloadIcon />}
								loading={
									isLoading &&
									selectedResult.type === "success" &&
									selectedResult.dataId === row.id
								}
								onClick={handleClick}
								disabled={row?.successDataValue === 0}
							>
								{PARCER_DATA.BTN_LOAD}
							</LoadingButton>
						</TableCell>
						<TableCell align="center">
							<LoadingButton
								id={`error_${row.id}`}
								variant="outlined"
								size="small"
								loadingPosition="start"
								startIcon={<FileDownloadIcon />}
								loading={
									isLoading &&
									selectedResult.type === "error" &&
									selectedResult.dataId === row.id
								}
								onClick={handleClick}
								disabled={row?.errorDataValue === 0}
							>
								{PARCER_DATA.BTN_LOAD}
							</LoadingButton>
						</TableCell>
						<TableCell></TableCell>
					</StyledTableRow>
				))}
			</TableBody>
		</Table>
	);
};

ParserDataTable.propTypes = {
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
	selectedResult: PropTypes.shape({
		type: PropTypes.string,
		dataId: PropTypes.string,
	}),
	isLoading: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
	dataList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			successDataValue: PropTypes.number.isRequired,
			errorDataValue: PropTypes.number.isRequired,
		})
	),
};

export default ParserDataTable;
