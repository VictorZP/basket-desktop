import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TablePagination, IconButton } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

import BettingResultsDataTable from "../BettingResultsDataTable";
import DelModal from "../../DelModal/DelModal.jsx";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.jsx";

import { useGetBettingResultsData } from "../../../hooks/bettingResultsData/useGetBettingResultsData.js";

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
} from "../../../redux/bettingResultsData/bettingResultsDataSlice.js";
import {
	getOnClickLoading,
	getIsDataLoading,
} from "../../../redux/bettingResultsData/bettingResultsDataSelector.js";
import createBettingResultsXlsxFile from "../../../helpers/functions/bettingResults";

import "./styles.css";
import { TEXT } from "./text.js";
import { MODAL_DEL } from "../../../constants";
import { CHANNELS, BETTING_RESULTS } from "../../../../common/constants";

const BettingResultsData = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [dataList, setDataList] = useState([]);
	const [selectedResult, setSelectedResult] = useState({
		type: "",
		dataId: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const isOpen = useSelector(isMDOpen);
	const isDelLoading = useSelector(getOnClickLoading);
	const isDataLoading = useSelector(getIsDataLoading);
	const dispatch = useDispatch();

	useGetBettingResultsData(setDataList);

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

	//  Download data handler
	const handleClick = async (e) => {
		const type = e.currentTarget.id?.split("_")?.at(0);
		const dataId = e.currentTarget.id?.split("_")?.at(1);

		setIsLoading(true);
		setSelectedResult({
			type,
			dataId,
		});

		const res = await ipcRenderer.invoke(
			CHANNELS.BETTING_RESULTS.DOWNLOAD_RESULTS,
			{
				bettingResultsId: dataId,
			}
		);

		if (res?.statusText !== "OK") {
			enqueueSnackbar(res?.message ?? BETTING_RESULTS.ON_ERROR_DOWNLOAD, {
				variant: "error",
			});
			return;
		}

		//	Creating exel file according to the received data
		await createBettingResultsXlsxFile(res);

		setIsLoading(false);
		setSelectedResult({
			type: "",
			dataId: "",
		});
	};

	//	Modal open handler
	const openModal = (e) => {
		const type = e.currentTarget.id?.split("_")?.at(0);
		const dataId = e.currentTarget.id?.split("_")?.at(1);

		const payload = {
			pageType: MODAL_DEL.PAGE_TYPE_LINES_DATA,
			descriptionExtend: TEXT.MODAL_DEL_TEXT,
			elemId: dataId,
		};

		setSelectedResult({
			type,
			dataId,
		});

		dispatch(handleOnClickLoading(true));
		dispatch(setModalDelData(payload));
		dispatch(handleModalDelOpen());
	};

	const handleDelete = async () => {
		const res = await ipcRenderer.invoke(
			CHANNELS.BETTING_RESULTS.DELETE_RESULTS,
			selectedResult.dataId
		);

		if (res?.statusText !== "OK") {
			enqueueSnackbar(res?.message ?? BETTING_RESULTS.ON_ERROR_DELETE, {
				variant: "error",
			});
			return;
		}

		dispatch(handleClickRequest(true));
		dispatch(handleModalDelClose());

		enqueueSnackbar(res?.message ?? BETTING_RESULTS.ON_SUCCESS_DELETE, {
			variant: "success",
		});

		setSelectedResult({
			type: "",
			dataId: "",
		});
	};

	const handleClose = () => {
		dispatch(handleModalDelClose());
		dispatch(handleOnClickLoading(false));
		!isOpen && dispatch(refreshModalDel());
	};

	const bettingResultsTableProps = {
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

	const delModalProps = {
		handleClose,
		handleDelete,
	};

	return (
		<>
			<Box sx={{ px: 3, pt: 1, pb: 4, mb: 2 }}>
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
						<BettingResultsDataTable {...bettingResultsTableProps} />
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
			<DelModal {...delModalProps} />
		</>
	);
};

export default BettingResultsData;
