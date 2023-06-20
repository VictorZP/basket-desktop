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

import {
	MATCHES_SETTINGS,
	MODAL_DEL,
} from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useDeleteChampionship = () => {
	const pageType = useSelector(getMDPageType);
	const isModalDLoading = useSelector(isMDLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isModalDLoading && pageType === MODAL_DEL.PAGE_TYPE_CHAMP) {
			ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_DEL, (event, arg) => {
				if (arg?.statusText !== "OK") {
					enqueueSnackbar(
						arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR_CHAMP_DEL,
						{
							variant: "error",
						}
					);
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
				ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL);
			});
			return () => {
				ipcRenderer.removeAllListeners(CHANNELS.APP_CHAMP.APP_CHAMP_DEL);
			};
		}
	}, [isModalDLoading]);
};
