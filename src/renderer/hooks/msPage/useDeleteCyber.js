import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { getToken } from "../../redux/auth/authSelector.js";

import {
	handleModalDelClose,
	refreshModalDel,
} from "../../redux/modalDelete/modalDelSlice.js";
import {
	getMDPageType,
	isMDLoading,
} from "../../redux/modalDelete/modalDelSelector.js";

import {
	MATCHES_SETTINGS,
	MODAL_DEL,
} from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useDeleteCyber = () => {
	const token = useSelector(getToken);
	const pageType = useSelector(getMDPageType);
	const isModalDLoading = useSelector(isMDLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isModalDLoading && pageType === MODAL_DEL.PAGE_TYPE_C) {
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
