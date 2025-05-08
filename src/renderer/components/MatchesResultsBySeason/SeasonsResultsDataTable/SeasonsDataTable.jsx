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

import { MATCHES_RESULTS_BY_SEASON_CONSTANTS } from "../../../constants/index.js";

const SeasonsResultsDataTable = ({
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
	const { RESULTS_DATA } = MATCHES_RESULTS_BY_SEASON_CONSTANTS;
	const countNumber = 1 + page * rowsPerPage;

	return (
		<Table>
			<TableHead>
				<TableRow sx={{ backgroundColor: "#3f51b5" }}>
					<TableCell sx={{ color: "white", width: 60 }}>
						{RESULTS_DATA.HEADER_NAMES.at(0)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 170 }} align="center">
						{RESULTS_DATA.HEADER_NAMES.at(1)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 150 }} align="center">
						{RESULTS_DATA.HEADER_NAMES.at(2)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 150 }} align="center">
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
							<TableCell align="center">
								{Intl.DateTimeFormat("ru-RU", {
									day: "2-digit",
									month: "2-digit",
									year: "2-digit",
									hour: "2-digit",
									minute: "2-digit",
								}).format(new Date(row.createdAt)) ?? ""}
							</TableCell>
							<TableCell align="center">{row?.start ?? ""}</TableCell>
							<TableCell align="center">{row?.end ?? ""}</TableCell>
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

SeasonsResultsDataTable.propTypes = {
	page: PropTypes.number.isRequired,
	openModal: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	handleClick: PropTypes.func.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	isDelLoading: PropTypes.bool.isRequired,
	isDataLoading: PropTypes.bool.isRequired,
	dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
	selectedResult: PropTypes.shape({
		type: PropTypes.string.isRequired,
		dataId: PropTypes.string.isRequired,
	}).isRequired,
};

export default SeasonsResultsDataTable;
