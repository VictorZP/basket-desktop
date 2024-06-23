import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleAddTeam,
	handleEditTeam,
	refreshTeamData,
	refreshTeamNames,
	setTeamLoadingStatus,
	refreshSelectedChamp,
} from "../../redux/matchSettings/matchSettingsSlice.js";

import ModalHandler from "../../helpers/classes/modal.js";

import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";

// Handler for after editing team
export const useHandleAfterTeamEdit = () => {
	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.on(CHANNELS.TEAM_NAME.EDIT_NAME, (event, arg) => {
			if (arg?.statusCode === 409) {
				enqueueSnackbar(arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.EXIST, {
					variant: "warning",
				});
				dispatch(setTeamLoadingStatus(false));
				return;
			}
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				dispatch(setTeamLoadingStatus(false));
				return;
			}

			ModalHandler.closeModal(dispatch);

			dispatch(handleAddTeam(true));
			dispatch(handleEditTeam(false));
			dispatch(refreshTeamData());
			dispatch(refreshSelectedChamp());

			enqueueSnackbar(TEAM_NAMES_FORM.UPDATED, { variant: "success" });

			dispatch(refreshTeamNames());
			dispatch(setTeamLoadingStatus(false));
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.TEAM_NAME.EDIT_NAME);
		};
	}, []);
};
