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

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.jsx";
import { StyledTableRow } from "../../../helpers/reusableComponents/tableComponents.js";

import { LINES_DATA } from "../../../constants/lines.js";

const LinesDataTable = ({
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
	const countNumber = 1 + page * rowsPerPage;
	return (
		<Table>
			<TableHead>
				<TableRow sx={{ backgroundColor: "#3f51b5" }}>
					<TableCell sx={{ color: "white", width: 60 }}>
						{LINES_DATA.HEADER_NAMES.at(0)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 130 }} align="center">
						{LINES_DATA.HEADER_NAMES.at(1)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 195 }} align="center">
						{LINES_DATA.HEADER_NAMES.at(2)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 90 }} align="center">
						{LINES_DATA.HEADER_NAMES.at(3)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 130 }} align="center">
						{LINES_DATA.HEADER_NAMES.at(4)}
					</TableCell>
					<TableCell sx={{ color: "white", minWidth: 137 }}>
						{LINES_DATA.HEADER_NAMES.at(5)}
					</TableCell>
					<TableCell sx={{ color: "white", minWidth: 137 }}>
						{LINES_DATA.HEADER_NAMES.at(6)}
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
						<StyledTableRow key={row.linesId}>
							<TableCell>{index + countNumber}</TableCell>
							<TableCell align="center">{row?.title ?? ""}</TableCell>
							<TableCell align="center">{row?.createdAt ?? ""}</TableCell>
							<TableCell align="center">{row?.start ?? ""}</TableCell>
							<TableCell align="center">{row?.end ?? ""}</TableCell>
							<TableCell align="center">
								<LoadingButton
									id={`download_${row.linesId}`}
									variant="outlined"
									size="small"
									loadingPosition="start"
									startIcon={<FileDownloadIcon />}
									loading={
										isLoading &&
										selectedResult.type === "download" &&
										selectedResult.dataId === row.linesId
									}
									onClick={handleClick}
									disabled={row?.successDataValue === 0}
								>
									{LINES_DATA.BTN_DOWNLOAD}
								</LoadingButton>
							</TableCell>
							<TableCell align="center">
								<LoadingButton
									color="error"
									id={`delete_${row.linesId}`}
									variant="outlined"
									size="small"
									loadingPosition="start"
									startIcon={<DeleteIcon />}
									loading={
										isDelLoading &&
										selectedResult.type === "delete" &&
										selectedResult.dataId === row.linesId
									}
									onClick={openModal}
								>
									{LINES_DATA.BTN_DELETE}
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

LinesDataTable.propTypes = {
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
			linesId: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			createdAt: PropTypes.string.isRequired,
			start: PropTypes.string,
			end: PropTypes.string,
		})
	),
};

export default LinesDataTable;
