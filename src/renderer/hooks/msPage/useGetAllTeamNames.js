import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	setTeamLoadingStatus,
	handleAddTeam,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getTeamAddStatus,
	getTeamExpandedVal,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useGetAllTeamNames = (setList) => {
	const isTeamAdd = useSelector(getTeamAddStatus);
	const expanded = useSelector(getTeamExpandedVal);
	const dispatch = useDispatch();

	useEffect(() => {
		if (expanded === MATCHES_SETTINGS.TEAM_NAMES_TABLE.ACCORDION_NAME) {
			dispatch(setTeamLoadingStatus(true));
			ipcRenderer.send(CHANNELS.TEAM_NAME.GET_ALL_NAMES);

			ipcRenderer.on(CHANNELS.TEAM_NAME.GET_ALL_NAMES, (event, arg) => {
				dispatch(setTeamLoadingStatus(false));
				if (arg?.statusText !== "OK") {
					enqueueSnackbar(
						arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
						{ variant: "error" }
					);
					return;
				}
				setList(arg?.list);
			});
		}
		dispatch(handleAddTeam(false));
	}, [expanded, isTeamAdd]);
};
