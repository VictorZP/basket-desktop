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

const TABLE_PROPS = {
	BTN_DOWNLOAD: "Скачать",
	BTN_DELETE: "Удалить",
	HEADER_NAMES: [
		"№",
		"Дата формирования",
		"Начальная дата",
		"Конечная дата",
		"",
		"",
	],
};

const HalvesStatisticsDataTable = ({
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
						{TABLE_PROPS.HEADER_NAMES.at(0)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 170 }} align="center">
						{TABLE_PROPS.HEADER_NAMES.at(1)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 150 }} align="center">
						{TABLE_PROPS.HEADER_NAMES.at(2)}
					</TableCell>
					<TableCell sx={{ color: "white", width: 150 }} align="center">
						{TABLE_PROPS.HEADER_NAMES.at(3)}
					</TableCell>
					<TableCell sx={{ color: "white", minWidth: 140 }}>
						{TABLE_PROPS.HEADER_NAMES.at(4)}
					</TableCell>
					<TableCell sx={{ color: "white", minWidth: 140 }}>
						{TABLE_PROPS.HEADER_NAMES.at(6)}
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
						<StyledTableRow key={row.compareId}>
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
									id={`download_${row.compareId}`}
									variant="outlined"
									size="small"
									loadingPosition="start"
									startIcon={<FileDownloadIcon />}
									loading={
										isLoading &&
										selectedResult.type === "download" &&
										selectedResult.compareId === row.compareId
									}
									onClick={handleClick}
									disabled={row?.successDataValue === 0}
								>
									{TABLE_PROPS.BTN_DOWNLOAD}
								</LoadingButton>
							</TableCell>
							<TableCell align="center">
								<LoadingButton
									color="error"
									id={`delete_${row.compareId}`}
									variant="outlined"
									size="small"
									loadingPosition="start"
									startIcon={<DeleteIcon />}
									loading={
										isDelLoading &&
										selectedResult.type === "delete" &&
										selectedResult.compareId === row.compareId
									}
									onClick={openModal}
								>
									{TABLE_PROPS.BTN_DELETE}
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

HalvesStatisticsDataTable.propTypes = {
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
			compareId: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			createdAt: PropTypes.string.isRequired,
		})
	),
};

export default HalvesStatisticsDataTable;
