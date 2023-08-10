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
} from "../redux/modalDelete/modalDelSelector.js";

import { MODAL_DEL } from "../constants/modaldel.js";
import { CHANNELS } from "../../common/constants/channels.js";

const TEXT = {
	DESC_EXTENDED: "всех ссылок парсера",
	ERR_MESSAGE: "Ошибка при удаление списка ссылок.",
	SUCCESS_MESSAGE: "Ссылки удалены.",
};

const ParserSettings = () => {
	const [isOnUpd, setIsOnUpd] = useState(false);
	const isOpen = useSelector(isMDOpen);
	const pageType = useSelector(getMDPageType);
	const isModalDLoading = useSelector(isMDLoading);
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
		}
	}, [isModalDLoading]);

	const openModalDel = () => {
		const payload = {
			pageType: MODAL_DEL.PAGE_TYPE_PARCER_URL,
			descriptionExtend: TEXT.DESC_EXTENDED,
			elemId: "",
		};

		dispatch(setModalDelData(payload));
		dispatch(handleModalDelOpen());
	};

	const handleDelete = async () => {
		dispatch(setLoading());
		ipcRenderer.send(CHANNELS.PARSER.DELETE_URLS);
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
		isOnDelete: isModalDLoading,
		setIsOnUpd,
		openModalDel,
	};

	return (
		<Box component="section">
			<ParserSettingForm />
			<Divider />
			<ParserSettingsUrlList {...urlListProps} />
			<Divider />
			<FilterSettings />
			<DelModal {...delModalProps} />
		</Box>
	);
};

export default ParserSettings;
