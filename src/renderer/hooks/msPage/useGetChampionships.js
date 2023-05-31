import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { getToken } from "../../redux/auth/authSelector.js";
import {
	handleAddChamp,
	setChampLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getChampAddStatus,
	getExpandedVal,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useGetChampionships = (setList) => {
	const token = useSelector(getToken);
	const isChampAdd = useSelector(getChampAddStatus);
	const expanded = useSelector(getExpandedVal);
	const dispatch = useDispatch();

	useEffect(() => {
		if (expanded === MATCHES_SETTINGS.CHAMPIONSHIP_TABLE.ACCORDION_NAME) {
			dispatch(setChampLoadingStatus(true));
			ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL, {
				token,
			});

			ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL, (event, arg) => {
				dispatch(setChampLoadingStatus(false));
				if (
					arg?.message === MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR ||
					arg?.error === "referenceError"
				) {
					enqueueSnackbar(arg?.message, {
						variant: "error",
					});
					dispatch(handleAddChamp(false));
					return;
				} else if (arg?.error) {
					enqueueSnackbar(arg?.message, {
						variant: "error",
					});
					dispatch(handleAddChamp(false));
					return;
				}
				setList(arg.list);
				dispatch(handleAddChamp(false));
			});
		}
	}, [expanded, isChampAdd]);
};
