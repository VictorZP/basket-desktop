import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleAddTeam,
	handleEditTeam,
	refreshTeamData,
} from "../../redux/matchSettings/matchSettingsSlice.js";

import { CHANNELS } from "../../../common/constants/channels.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

// Handler for after editing team
export const useHandleAfterTeamEdit = (
	initialTeamData,
	initialChampData,
	setTeamNames,
	setSelectedChamp,
	setIsLoading,
	setCyberId
) => {
	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.on(CHANNELS.TEAM_NAME.EDIT_NAME, (event, arg) => {
			if (arg?.statusCode === 409) {
				enqueueSnackbar(arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.EXIST, {
					variant: "warning",
				});
				setIsLoading(false);
				return;
			}
			if (arg?.statusText !== "OK") {
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
			dispatch(handleEditTeam(false));
			dispatch(refreshTeamData());

			enqueueSnackbar(TEAM_NAMES_FORM.UPDATED, { variant: "success" });
			setTeamNames(initialTeamData);
			setSelectedChamp(initialChampData);
			setCyberId("");
			setIsLoading(false);
		});
	}, []);
};
