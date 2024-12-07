import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	refreshSelectedChamp,
	handleAddChamp,
	handleEditChamp,
	refreshChampData,
	refreshChampNames,
	setChampLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";

import ModalHandler from "../../helpers/classes/modal.js";

import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";

// Handler for after editing championship
export const useHandleAfterChampionshipEdit = () => {
	const { CHAMPIONSHIP_FORM, ERR_MESSAGES } = MATCHES_SETTINGS;

	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT, (event, arg) => {
			if (arg?.statusCode === 409) {
				enqueueSnackbar(arg?.message ?? ERR_MESSAGES.EXIST, {
					variant: "warning",
				});
				dispatch(setChampLoadingStatus(false));
				return;
			}
			if (arg?.statusText !== "Created") {
				enqueueSnackbar(arg?.message ?? ERR_MESSAGES.ON_ERROR, {
					variant: "error",
				});
				dispatch(setChampLoadingStatus(false));
				return;
			}

			ModalHandler.closeModal(dispatch);

			dispatch(handleAddChamp(true));
			dispatch(handleEditChamp(false));
			dispatch(refreshChampData());
			dispatch(refreshSelectedChamp());

			enqueueSnackbar(CHAMPIONSHIP_FORM.CHAMP_UPDATED, { variant: "success" });

			dispatch(refreshChampNames());
			dispatch(setChampLoadingStatus(false));
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT);
		};
	});
};
