import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { Box, Divider } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import ParserSettingForm from "../components/ParserSettingsComponents/ParserSettingForm";
import ParserSettingsUrlList from "../components/ParserSettingsComponents/ParserSettingsUrlList";
import FilterSettings from "../components/ParserSettingsComponents/FilterSettings";
import DelModal from "../components/DelModal/DelModal.jsx";

import {
	handleModalDelOpen,
	handleModalDelClose,
	setLoading,
	setModalDelData,
	refreshModalDel,
} from "../redux/modalDelete/modalDelSlice.js";
import {
	isMDOpen,
	getMDPageType,
	isMDLoading,
	getMDElemId,
} from "../redux/modalDelete/modalDelSelector.js";

import { MODAL_DEL } from "../constants/modaldel.js";
import { BTN_NAME } from "../constants/parcer.js";
import { CHANNELS } from "../../common/constants/channels.js";

const TEXT = {
	DESC_EXTENDED: "всех ссылок парсера",
	FILTER_EXTENDED: "чемпионата из фильтра",
	ERR_MESSAGE: "Ошибка при удаление списка ссылок.",
	SUCCESS_MESSAGE: "Ссылки удалены.",
};

const ParserSettings = () => {
	const [isOnUpd, setIsOnUpd] = useState(false);
	const [isFilterDel, setIsFilterDel] = useState(false);
	const isOpen = useSelector(isMDOpen);
	const pageType = useSelector(getMDPageType);
	const isModalDLoading = useSelector(isMDLoading);
	const id = useSelector(getMDElemId);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isModalDLoading && pageType === MODAL_DEL.PAGE_TYPE_PARCER_URL) {
			ipcRenderer.on(CHANNELS.PARSER.DELETE_URLS, (event, arg) => {
				if (arg?.statusText !== "OK") {
					enqueueSnackbar(arg?.message ?? TEXT.ERR_MESSAGE, {
						variant: "error",
					});
					return;
				}

				dispatch(handleModalDelClose());
				dispatch(refreshModalDel());
				enqueueSnackbar(arg?.message ?? TEXT.SUCCESS_MESSAGE, {
					variant: "success",
				});
				setIsOnUpd(!isOnUpd);
				ipcRenderer.send(CHANNELS.PARSER.GET_URL);
			});
			return () => {
				ipcRenderer.removeAllListeners(CHANNELS.PARSER.DELETE_URLS);
			};
		} else if (
			isModalDLoading &&
			pageType === MODAL_DEL.PAGE_TYPE_FILTER_CHAMP
		) {
			ipcRenderer.on(CHANNELS.PARSER.FILTER_DELETE_CHAMP, (event, arg) => {
				if (arg?.statusText !== "OK") {
					enqueueSnackbar(arg?.message ?? TEXT.ERR_MESSAGE, {
						variant: "error",
					});
					return;
				}
				setIsFilterDel((prev) => !prev);
				dispatch(handleModalDelClose());
				dispatch(refreshModalDel());
				enqueueSnackbar(arg?.message ?? TEXT.SUCCESS_MESSAGE, {
					variant: "success",
				});
			});
			return () => {
				ipcRenderer.removeAllListeners(CHANNELS.PARSER.FILTER_DELETE_CHAMP);
			};
		}
	}, [isModalDLoading]);

	const openModalDel = (e) => {
		const id = e?.currentTarget?.id?.split("_")[1] ?? "";
		const btnName = e?.currentTarget?.name ?? "";
		const payload = {
			pageType: "",
			descriptionExtend: "",
			elemId: "",
		};

		switch (btnName) {
			case BTN_NAME.DEL_URL:
				payload.pageType = MODAL_DEL.PAGE_TYPE_PARCER_URL;
				payload.descriptionExtend = TEXT.DESC_EXTENDED;
				payload.elemId = id;
				break;
			case BTN_NAME.DEL_CHAMP:
				payload.pageType = MODAL_DEL.PAGE_TYPE_FILTER_CHAMP;
				payload.descriptionExtend = TEXT.FILTER_EXTENDED;
				payload.elemId = id;

			default:
				break;
		}

		dispatch(setModalDelData(payload));
		dispatch(handleModalDelOpen());
	};

	const handleDelete = async () => {
		dispatch(setLoading());
		if (pageType === MODAL_DEL.PAGE_TYPE_PARCER_URL) {
			ipcRenderer.send(CHANNELS.PARSER.DELETE_URLS);
		} else if (pageType === MODAL_DEL.PAGE_TYPE_FILTER_CHAMP) {
			ipcRenderer.send(CHANNELS.PARSER.FILTER_DELETE_CHAMP, { id });
		}
	};

	const handleClose = () => {
		dispatch(handleModalDelClose());
		!isOpen && dispatch(refreshModalDel());
	};

	const delModalProps = {
		handleClose,
		handleDelete,
	};
	const urlListProps = {
		isOnUpd,
		isOnDelete: isModalDLoading && pageType === MODAL_DEL.PAGE_TYPE_PARCER_URL,
		setIsOnUpd,
		openModalDel,
	};
	const filterProps = {
		isFilterDel,
		openModalDel,
	};

	return (
		<Box component="section">
			<ParserSettingForm />
			<Divider />
			<ParserSettingsUrlList {...urlListProps} />
			<Divider />
			<FilterSettings {...filterProps} />
			<DelModal {...delModalProps} />
		</Box>
	);
};

export default ParserSettings;
