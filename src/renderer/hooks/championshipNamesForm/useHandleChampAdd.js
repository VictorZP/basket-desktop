import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleAddChamp,
	refreshChampData,
	setChampLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";

import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";

// Hook for handle champ add response
export const useHandleChampAdd = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, (e, arg) => {
			console.log(arg);
			if (arg?.statusText !== "Created") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				dispatch(setChampLoadingStatus(false));
				return;
			}

			dispatch(setChampLoadingStatus(false));
			dispatch(handleAddChamp(true));
			enqueueSnackbar(
				arg?.message ?? MATCHES_SETTINGS.CHAMPIONSHIP_FORM.CHAMP_ADDED,
				{
					variant: "success",
				}
			);

			dispatch(refreshChampData());
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.APP_CHAMP.APP_CHAMP_ADD);
		};
	});
};
