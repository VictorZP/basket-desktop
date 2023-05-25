import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import MSCyberForm from "../components/MSCyberForm/MSCyberForm.jsx";
import MSCyberTable from "../components/MSCyberTable/MSCyberTable.jsx";
import DelModal from "../components/DelModal";

import { getToken } from "../redux/auth/authSelector.js";
import { getAddStatus } from "../redux/matchSettings/matchSettingSelector.js";
import { onAdd } from "../redux/matchSettings/matchSettingsSlice.js";
import {
	handleModalDelOpen,
	handleModalDelClose,
	setLoading,
	setModalDelData,
	refreshModalDel,
} from "../redux/modalDelete/modalDelSlice.js";
import {
	isMDOpen,
	getMDElemId,
	isMDLoading,
} from "../redux/modalDelete/modalDelSelector.js";

import { MATCHES_SETTINGS, MODAL_DEL } from "../../common/constants/index.js";
import { CHANNELS } from "../../common/constants/channels.js";

const MatchesSettings = () => {
	const [cyberList, setCyberList] = useState([]);
	const token = useSelector(getToken);
	const isOnAdd = useSelector(getAddStatus);
	const isOpen = useSelector(isMDOpen);
	const id = useSelector(getMDElemId);
	const isModalDLoading = useSelector(isMDLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.send(CHANNELS.CYBER.GET_ALL_CYBER, { token });
		ipcRenderer.on(CHANNELS.CYBER.GET_ALL_CYBER, (event, arg) => {
			if (arg.error) {
				enqueueSnackbar(arg?.message, {
					variant: "error",
				});
				return;
			}

			setCyberList(arg.list);
		});
		dispatch(onAdd(false));
	}, [isOnAdd]);

	useEffect(() => {
		if (isModalDLoading) {
			ipcRenderer.on(CHANNELS.CYBER.DEL_CYBER, (event, arg) => {
				if (arg.error || arg === MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR) {
					enqueueSnackbar(arg?.message, {
						variant: "error",
					});
					return;
				}
				dispatch(handleModalDelClose());
				dispatch(refreshModalDel());
				enqueueSnackbar(arg, {
					variant: "success",
				});
				ipcRenderer.send(CHANNELS.CYBER.GET_ALL_CYBER, { token });
			});
		}
	}, [isModalDLoading]);

	useEffect(() => {
		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	const openModalDel = (e) => {
		const id = e?.currentTarget?.id?.split("_")[1];
		const btnName = e?.currentTarget?.name;

		switch (btnName) {
			case MATCHES_SETTINGS.CYBER_TABLE.DEL_BTN_N:
				const cyberName = cyberList.find((el) => {
					return el?.id === id;
				})?.cyberName;
				const payload = {
					pageType: MODAL_DEL.PAGE_TYPE_C,
					descriptionExtend: cyberName,
					elemId: id,
				};
				dispatch(setModalDelData(payload));
				break;

			default:
				break;
		}

		dispatch(handleModalDelOpen());
	};

	const handleDelete = async (e) => {
		dispatch(setLoading());
		ipcRenderer.send(CHANNELS.CYBER.DEL_CYBER, { token, id });
	};

	const handleEdit = (e) => {
		const id = e?.currentTarget?.id?.split("_")[1];
		const btnName = e?.currentTarget?.name;
	};

	const handleClose = () => {
		dispatch(handleModalDelClose());
		!isOpen && dispatch(refreshModalDel());
	};

	const cyberTableProps = {
		cyberList,
		handleDelete: openModalDel,
		handleEdit,
	};
	const delModalProps = {
		handleClose,
		handleDelete,
	};

	return (
		<Box component="section">
			<MSCyberForm />
			<MSCyberTable {...cyberTableProps} />
			<Divider sx={{ width: "100w" }} />
			<DelModal {...delModalProps} />
		</Box>
	);
};

export default MatchesSettings;
