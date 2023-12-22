import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import "./styles.css";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TablePagination } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";

import ParserDataTable from "../ParserDataTable";
import DelModal from "../../DelModal/DelModal.jsx";

import { useGetParcerData } from "../../../hooks/parcerData";

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
} from "../../../redux/parcerData/parcerDataSlice.js";
import { getOnClickLoading } from "../../../redux/parcerData/parcerDataSelector.js";
import { createWarningFile } from "../../../helpers/functions/parcer/createWarningFile.js";
import { createXlsxDoc } from "../../../helpers/functions/parcer/createXlsxDoc.js";

import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";
import { MODAL_DEL } from "../../../constants/modaldel.js";
import { PARCER_DATA } from "../../../constants/parcer.js";

const ParserData = () => {
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
	const dispatch = useDispatch();

	useGetParcerData(setDataList);

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

	//	Обработчик загрузки данных
	const handleClick = async (e) => {
		const type = e.currentTarget.id?.split("_")?.at(0);
		const dataId = e.currentTarget.id?.split("_")?.at(1);
		setIsLoading(true);
		setSelectedResult({
			type,
			dataId,
		});

		const res = await ipcRenderer.invoke(CHANNELS.PARCER_DATA.DOWNLOAD, {
			type,
			dataId,
		});

		if (res?.statusText !== "OK") {
			enqueueSnackbar(arg?.message ?? PARCER_DATA.ON_ERROR_DOWNLOAD, {
				variant: "error",
			});
			return;
		}

		let downloadRes = null;

		switch (res.type) {
			case "success":
				downloadRes = await createXlsxDoc(res.data, res.title);
				break;
			case "error":
				downloadRes = await createWarningFile(res.data, res.title);
				break;

			default:
				enqueueSnackbar(PARCER_DATA.UNKNOWN_FORMAT, {
					variant: "error",
				});
				break;
		}

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
			pageType: MODAL_DEL.PAGE_TYPE_PARCER_DATA,
			descriptionExtend: "результатов парсера",
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

	const handleClose = () => {
		dispatch(handleModalDelClose());
		dispatch(handleOnClickLoading(false));
		!isOpen && dispatch(refreshModalDel());
	};

	const handleDelete = async (e) => {
		const res = await ipcRenderer.invoke(
			CHANNELS.PARCER_DATA.DELETE,
			selectedResult.dataId
		);

		if (res?.statusText !== "OK") {
			enqueueSnackbar(res?.message ?? PARCER_DATA.ON_ERROR_DELETE, {
				variant: "error",
			});
			return;
		}

		dispatch(handleClickRequest(true));
		dispatch(handleModalDelClose());

		enqueueSnackbar(res?.message ?? PARCER_DATA.SUCCESS_DELETE, {
			variant: "success",
		});

		setSelectedResult({
			type: "",
			dataId: "",
		});
	};

	const tableProps = {
		page,
		rowsPerPage,
		handleClick,
		openModal,
		selectedResult,
		isLoading,
		isDelLoading,
		dataList: visibleRows,
	};

	const delModalProps = {
		handleClose,
		handleDelete,
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
				<div className="pdt-container pdt-container__radius">
					<div className="pdt-container__inner ">
						<ParserDataTable {...tableProps} />
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
					</div>
				</div>
			</Box>
			<DelModal {...delModalProps} />
		</>
	);
};

export default ParserData;
