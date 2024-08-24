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

import { BETTING_RESULTS_CONSTANTS } from "../../../constants";

const BettingResultsDataTable = ({
	page,
	openModal,
	isLoading,
	handleClick,
	rowsPerPage,
	isDelLoading,
	isDataLoading,
	dataList = [],
	selectedResult,
}) => {
	const { RESULTS_DATA } = BETTING_RESULTS_CONSTANTS;
	const countNumber = 1 + page * rowsPerPage;
	return (
		<Table>
			<TableHead>
				<TableRow sx={{ backgroundColor: "#3f51b5" }}>
					<TableCell sx={{ color: "white", width: 60 }}>
						{RESULTS_DATA.HEADER_NAMES.at(0)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 150 }} align="center">
						{RESULTS_DATA.HEADER_NAMES.at(1)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 130 }} align="center">
						{RESULTS_DATA.HEADER_NAMES.at(2)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 130 }} align="center">
						{RESULTS_DATA.HEADER_NAMES.at(3)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 140 }} align="center">
						{RESULTS_DATA.HEADER_NAMES.at(4)}
					</TableCell>
					<TableCell sx={{ color: "white", minWidth: 140 }}>
						{RESULTS_DATA.HEADER_NAMES.at(5)}
					</TableCell>
				</TableRow>
			</TableHead>
			{!isDataLoading ? (
				<TableBody
					sx={{
						borderLeft: "1px solid #e0e0e0",
						borderRight: "1px solid #e0e0e0",
					}}
				>
					{dataList?.map((row, index) => (
						<StyledTableRow key={row.resultsId}>
							<TableCell>{index + countNumber}</TableCell>
							<TableCell align="center">{row?.createdAt ?? ""}</TableCell>
							<TableCell align="center">{row?.startDate ?? ""}</TableCell>
							<TableCell align="center">{row?.endDate ?? ""}</TableCell>
							<TableCell align="center">
								<LoadingButton
									id={`download_${row.resultsId}`}
									variant="outlined"
									size="small"
									loadingPosition="start"
									startIcon={<FileDownloadIcon />}
									loading={
										isLoading &&
										selectedResult.type === "download" &&
										selectedResult.dataId === row.resultsId
									}
									onClick={handleClick}
									disabled={row?.successDataValue === 0}
								>
									{RESULTS_DATA.BTN_DOWNLOAD}
								</LoadingButton>
							</TableCell>
							<TableCell align="center">
								<LoadingButton
									color="error"
									id={`delete_${row.resultsId}`}
									variant="outlined"
									size="small"
									loadingPosition="start"
									startIcon={<DeleteIcon />}
									loading={
										isDelLoading &&
										selectedResult.type === "delete" &&
										selectedResult.dataId === row.resultsId
									}
									onClick={openModal}
								>
									{RESULTS_DATA.BTN_DELETE}
								</LoadingButton>
							</TableCell>
						</StyledTableRow>
					))}
				</TableBody>
			) : (
				""
			)}
		</Table>
	);
};

BettingResultsDataTable.propTypes = {
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
	isLoading: PropTypes.bool,
	isDelLoading: PropTypes.bool,
	isDataLoading: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
	openModal: PropTypes.func.isRequired,
	selectedResult: PropTypes.shape({
		dataId: PropTypes.string,
	}),
	dataList: PropTypes.arrayOf(
		PropTypes.shape({
			resultsId: PropTypes.string.isRequired,
			createdAt: PropTypes.string.isRequired,
			startDate: PropTypes.string,
			endDate: PropTypes.string,
		})
	),
};

export default BettingResultsDataTable;
