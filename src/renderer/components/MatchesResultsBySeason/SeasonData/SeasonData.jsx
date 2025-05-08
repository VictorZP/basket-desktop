import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TablePagination, IconButton } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

import SeasonsResultsDataTable from "../SeasonsResultsDataTable/SeasonsDataTable.jsx";
import DelModal from "../../DelModal/DelModal.jsx";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.jsx";

import { useGetResultsBySeasonData } from "../../../hooks/matchesResultsBySeasonData/useGetResultsBySeasonData.js";

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
	refresh,
} from "../../../redux/resultsBySeason/resultsBySeasonSlice.js";
import {
	getOnClickLoading,
	getIsDataLoading,
} from "../../../redux/resultsBySeason/resultsBySeasonSelector.js";

import "./styles.css";
import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants";
import { STATUS, MODAL_DEL, STAT_MESSAGES } from "../../../constants";

const SeasonData = () => {
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

	useGetResultsBySeasonData(setDataList);

	useEffect(() => {
		return () => {
			refresh();
		};
	});

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
		const type = e.currentTarget.id.split("_")[0];
		const dataId = e.currentTarget.id.split("_")[1];

		setIsLoading(true);
		setSelectedResult({
			type,
			dataId,
		});

		try {
			const responseData = await ipcRenderer.invoke(
				CHANNELS.MATCHES_STATS_BY_SEASON.DOWNLOAD_MATCHES_STATS_BY_SEASON,
				{
					dataId,
				}
			);

			if (responseData?.status === STATUS.ERROR) {
				enqueueSnackbar(
					responseData?.message ?? STAT_MESSAGES.ON_DOWNLOAD_DATA_ERR,
					{
						variant: "error",
					}
				);
				return;
			}

			if (responseData?.status === STATUS.FINISHED) {
				enqueueSnackbar(
					responseData?.message ?? STAT_MESSAGES.ON_DOWNLOAD_SUCCESS,
					{
						variant: "success",
					}
				);
			}
		} catch (err) {
			enqueueSnackbar(err?.message ?? STAT_MESSAGES.ON_DOWNLOAD_DATA_ERR, {
				variant: "error",
			});
		} finally {
			setIsLoading(false);
			setSelectedResult({
				type: "",
				dataId: "",
			});
		}
	};

	//	Modal open handler
	const openModal = (e) => {
		const type = e.currentTarget.id?.split("_")?.at(0);
		const dataId = e.currentTarget.id?.split("_")?.at(1);

		const payload = {
			pageType: MODAL_DEL.PAGE_TYPE_RESULTS_BY_SEASON,
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
		try {
			const res = await ipcRenderer.invoke(
				CHANNELS.MATCHES_STATS_BY_SEASON.DELETE_MATCHES_STATS_BY_SEASON,
				selectedResult.dataId
			);

			if (res?.statusText !== "OK") {
				enqueueSnackbar(res?.message ?? STAT_MESSAGES.ON_DELETE_ERR, {
					variant: "error",
				});
				return;
			}

			dispatch(handleClickRequest(true));
			enqueueSnackbar(res?.message ?? STAT_MESSAGES.ON_DELETE_SUCCESS, {
				variant: "success",
			});
		} catch (err) {
			enqueueSnackbar(err?.message ?? STAT_MESSAGES.ON_DELETE_ERR, {
				variant: "error",
			});
			return;
		} finally {
			dispatch(handleModalDelClose());
			setSelectedResult({
				type: "",
				dataId: "",
			});
		}
	};

	const handleClose = () => {
		dispatch(handleModalDelClose());
		dispatch(handleOnClickLoading(false));
		!isOpen && dispatch(refreshModalDel());
	};

	const seasonsResultsTableProps = {
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
						<SeasonsResultsDataTable {...seasonsResultsTableProps} />
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

export default SeasonData;
