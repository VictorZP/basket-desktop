import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleModalDelClose,
	refreshModalDel,
} from "../../redux/modalDelete/modalDelSlice.js";
import {
	getMDPageType,
	isMDLoading,
} from "../../redux/modalDelete/modalDelSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { MODAL_DEL } from "../../constants/modaldel.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useDeleteCyber = () => {
	const pageType = useSelector(getMDPageType);
	const isModalDLoading = useSelector(isMDLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isModalDLoading && pageType === MODAL_DEL.PAGE_TYPE_C) {
			ipcRenderer.on(CHANNELS.CYBER.DEL_CYBER, (event, arg) => {
				if (arg?.statusText !== "OK" && arg?.statusCode !== 409) {
					enqueueSnackbar(
						arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR_C_DEL,
						{
							variant: "error",
						}
					);
					return;
				} else if (arg?.statusText !== "OK" && arg?.statusCode === 409) {
					enqueueSnackbar(arg?.message, {
						variant: "warning",
					});
					return;
				}
				dispatch(handleModalDelClose());
				dispatch(refreshModalDel());
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.SUCCESS_MESSAGES.DELETED,
					{
						variant: "success",
					}
				);
				ipcRenderer.send(CHANNELS.CYBER.GET_ALL_CYBER);
			});
			return () => {
				ipcRenderer.removeAllListeners(CHANNELS.CYBER.DEL_CYBER);
			};
		}
	}, [isModalDLoading]);
};
