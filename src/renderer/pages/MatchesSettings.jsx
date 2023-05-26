import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const ipcRenderer = window.require("electron").ipcRenderer;

import MSCyberForm from "../components/MSCyberForm/MSCyberForm.jsx";
import MSCyberTable from "../components/MSCyberTable/MSCyberTable.jsx";
import DelModal from "../components/DelModal";

import { getToken } from "../redux/auth/authSelector.js";
import {
	handleEditCyber,
	setCyberData,
	refreshCyberData,
} from "../redux/matchSettings/matchSettingsSlice.js";
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
} from "../redux/modalDelete/modalDelSelector.js";

import { useGetAllCyber, useDeleteCyber } from "../hooks/msPage";

import { MATCHES_SETTINGS, MODAL_DEL } from "../../common/constants/index.js";
import { CHANNELS } from "../../common/constants/channels.js";

const MatchesSettings = () => {
	const [cyberList, setCyberList] = useState([]);
	const token = useSelector(getToken);
	const isOpen = useSelector(isMDOpen);
	const id = useSelector(getMDElemId);
	const dispatch = useDispatch();

	useGetAllCyber(setCyberList);
	useDeleteCyber();

	useEffect(() => {
		return () => {
			ipcRenderer.removeAllListeners();
			dispatch(refreshCyberData());
			dispatch(handleEditCyber(false));
		};
	}, []);

	const openModalDel = (e) => {
		const id = e?.currentTarget?.id?.split("_")[1] ?? "";
		const btnName = e?.currentTarget?.name ?? "";
		const payload = {
			pageType: "",
			descriptionExtend: "",
			elemId: "",
		};

		switch (btnName) {
			case MATCHES_SETTINGS.CYBER_TABLE.DEL_BTN_N:
				const cyberName = cyberList.find((el) => {
					return el?.id === id;
				})?.cyberName;

				payload.pageType = MODAL_DEL.PAGE_TYPE_C;
				payload.descriptionExtend = cyberName;
				payload.elemId = id;
				break;

			default:
				break;
		}

		if (payload?.elemId) {
			dispatch(setModalDelData(payload));
			dispatch(handleModalDelOpen());
		}
	};

	const handleDelete = async (e) => {
		dispatch(setLoading());
		ipcRenderer.send(CHANNELS.CYBER.DEL_CYBER, { token, id });
	};

	const handleEdit = (e) => {
		const id = e?.currentTarget?.id?.split("_")[1];
		const btnName = e?.currentTarget?.name;

		switch (btnName) {
			case MATCHES_SETTINGS.CYBER_TABLE.EDIT_BTN_N:
				const cyberName = cyberList.find((el) => {
					return el?.id === id;
				})?.cyberName;
				const payload = {
					id,
					name: cyberName,
				};

				dispatch(setCyberData(payload));
				dispatch(handleEditCyber(true));
				break;

			default:
				break;
		}
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
			<Box>
				<MSCyberForm />
				<MSCyberTable {...cyberTableProps} />
			</Box>

			<Divider />
			<Box>Championships</Box>
			<Divider />
			<Box>Teams names</Box>
			<DelModal {...delModalProps} />
		</Box>
	);
};

export default MatchesSettings;
