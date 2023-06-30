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
import { MODAL_DEL } from "../../constants/modaldel";
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
				ipcRenderer.send(CHANNELS.TEAM_NAME.GET_ALL_NAMES);
			});
			return () => {
				ipcRenderer.removeAllListeners(CHANNELS.APP_CHAMP.APP_CHAMP_DEL);
			};
		}
	}, [isModalDLoading]);
};
