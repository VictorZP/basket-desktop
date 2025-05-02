import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TablePagination, IconButton } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

import HalvesStatisticsDataTable from "../HalvesStatisticsDataTable";
import DelModal from "../../DelModal/DelModal.jsx";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.jsx";

import { useGetHalvesStatisticsData } from "../../../hooks/halvesStatisticsData";

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
} from "../../../redux/halvesStatsData/halvesStatsDataSlice.js";
import {
	getOnClickLoading,
	getIsDataLoading,
} from "../../../redux/halvesStatsData/halvesStatsDataSelector.js";

import { createHalvesCompareXlsxFile } from "../../../helpers/functions/statistics";

import "./styles.css";
import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";
import { MODAL_DEL } from "../../../constants/modaldel.js";
import { MESSAGES } from "../../../constants/statistics.js";

const HalvesStatisticsData = () => {
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

	useGetHalvesStatisticsData(setDataList);

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

	// Обработчик загрузки данных
	const handleClick = async (e) => {
		const type = e.currentTarget.id?.split("_")?.at(0);
		const dataId = e.currentTarget.id?.split("_")?.at(1);

		setIsLoading(true);
		setSelectedResult({
			type,
			dataId,
		});

		const res = await ipcRenderer.invoke(
			CHANNELS.HALVES_STATISTICS.DOWNLOAD_HALVES_STATISTICS,
			{
				compareId: dataId,
			}
		);

		if (res?.statusText !== "OK") {
			enqueueSnackbar(res?.message ?? MESSAGES.ON_DOWNLOAD_LINES_ERR, {
				variant: "error",
			});
			return;
		}

		//	Creating exel file according to the received data
		await createHalvesCompareXlsxFile(res);

		setIsLoading(false);
		setSelectedResult({
			type: "",
			dataId: "",
		});
	};

	//	Открытиые модалки для удаления
	const openModal = (e) => {
		const type = e.currentTarget.id?.split("_")?.at(0);
		const dataId = e.currentTarget.id?.split("_")?.at(1);

		const payload = {
			pageType: MODAL_DEL.PAGE_TYPE_HALVES_STATISTICS_DATA,
			descriptionExtend: "статистики на выбранную дату",
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
			CHANNELS.HALVES_STATISTICS.DELETE_HALVES_STATISTICS,
			selectedResult.dataId
		);
		if (res?.statusText !== "OK") {
			enqueueSnackbar(res?.message ?? MESSAGES.ON_DELETE_ERR, {
				variant: "error",
			});
			return;
		}
		dispatch(handleClickRequest(true));
		dispatch(handleModalDelClose());
		enqueueSnackbar(res?.message ?? MESSAGES.ON_DELETE_SUCCESS, {
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

	const tableProps = {
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
						<HalvesStatisticsDataTable {...tableProps} />

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

export default HalvesStatisticsData;
