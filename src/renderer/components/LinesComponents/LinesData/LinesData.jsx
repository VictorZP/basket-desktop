import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TablePagination, IconButton } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

import LinesDataTable from "../LinesDataTable";
import DelModal from "../../DelModal/DelModal.jsx";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.jsx";

import { useGetLinesData } from "../../../hooks/linesData/useGetLinesData.js";

import {
	handleModalDelOpen,
	handleModalDelClose,
	setModalDelData,
	refreshModalDel,
} from "../../../redux/modalDelete/modalDelSlice.js";
import { isMDOpen } from "../../../redux/modalDelete/modalDelSelector.js";
import {
	handleClickRequest,
	handleOnClickLoading,
} from "../../../redux/linesData/linesDataSlice.js";
import {
	getOnClickLoading,
	getIsDataLoading,
} from "../../../redux/linesData/linesDataSelector.js";

import "./styles.css";
import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";
import { MODAL_DEL } from "../../../constants/modaldel.js";
import { LINES_DATA } from "../../../constants/lines.js";

const LinesData = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [dataList, setDataList] = useState([]);
	const [selectedResult, setSelectedResult] = useState({
		dataId: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const isOpen = useSelector(isMDOpen);
	const isDelLoading = useSelector(getOnClickLoading);
	const isDataLoading = useSelector(getIsDataLoading);
	const dispatch = useDispatch();

	useGetLinesData(setDataList);

	const visibleRows = useMemo(
		() => dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[dataList, page, rowsPerPage]
	);

	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleClick = (e) => {};

	//	Открытиые модалки для удаления
	const openModal = () => {};

	const linesTableProps = {
		page,
		rowsPerPage,
		handleClick,
		openModal,
		selectedResult,
		isLoading,
		isDataLoading,
		isDelLoading,
		dataList: visibleRows,
	};

	return (
		<>
			<Box sx={{ px: 3, py: 1, mb: 2 }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						mb: 2,
						gap: 2,
					}}
				>
					<Typography variant="h5">{TEXT.TITLE}</Typography>
					<IconButton
						size="small"
						color="primary"
						onClick={() => {
							dispatch(handleClickRequest(true));
						}}
					>
						<SyncIcon />
					</IconButton>
				</Box>
				<div className="ldt-container ldt-container__radius">
					<div className="pdt-container__inner">
						<LinesDataTable {...linesTableProps} />
						{isDataLoading ? (
							<div className="loading-height">
								<LoadingSpinner />
							</div>
						) : (
							<TablePagination
								sx={{ border: "1px solid #e0e0e0" }}
								rowsPerPageOptions={[10, 15, 20]}
								component="div"
								count={dataList?.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleChangeRowsPerPage}
								labelRowsPerPage={TEXT.PAGINATION}
							/>
						)}
					</div>
				</div>
			</Box>
		</>
	);
};

export default LinesData;
