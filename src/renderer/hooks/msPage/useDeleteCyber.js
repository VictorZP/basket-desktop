import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { getToken } from "../../redux/auth/authSelector.js";

import {
	handleModalDelClose,
	refreshModalDel,
} from "../../redux/modalDelete/modalDelSlice.js";
import { isMDLoading } from "../../redux/modalDelete/modalDelSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useDeleteCyber = () => {
	const token = useSelector(getToken);
	const isModalDLoading = useSelector(isMDLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isModalDLoading) {
			ipcRenderer.once(CHANNELS.CYBER.DEL_CYBER, (event, arg) => {
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
};
