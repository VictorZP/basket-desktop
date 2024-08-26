import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleAddTeam,
	refreshTeamNames,
	setTeamLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";

import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";

// Hook for handle team add response
export const useHandleTeamAdd = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.on(CHANNELS.TEAM_NAME.ADD_NAME, (e, arg) => {
			if (arg?.statusText !== "Created") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				dispatch(setTeamLoadingStatus(false));
				return;
			}

			dispatch(setTeamLoadingStatus(false));
			dispatch(handleAddTeam(true));
			enqueueSnackbar(arg?.message ?? TEAM_NAMES_FORM.ADDED, {
				variant: "success",
			});

			dispatch(refreshTeamNames());
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.TEAM_NAME.ADD_NAME);
		};
	}, []);
};
