import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { handleAddTeam } from "../../redux/matchSettings/matchSettingsSlice.js";

import { CHANNELS } from "../../../common/constants/channels.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

// Hook for handle team add response
export const useHandleTeamAdd = (setIsLoading, setTeamNames, initialData) => {
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
				setIsLoading(false);
				return;
			}
			dispatch(handleAddTeam(true));
			enqueueSnackbar(arg?.message ?? TEAM_NAMES_FORM.ADDED, {
				variant: "success",
			});
			setTeamNames(initialData);
			setIsLoading(false);
		});
	}, []);
};
