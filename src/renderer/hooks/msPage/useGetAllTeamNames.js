import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { handleAddTeam } from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getTeamAddStatus,
	getChampAddStatus,
	getTeamExpandedVal,
} from "../../redux/matchSettings/matchSettingSelector.js";
import { setTeamLoadingStatus } from "../../redux/matchSettings/matchSettingsSlice.js";

import { CYBER_LIST } from "../../constants";
import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";

export const useGetAllTeamNames = (setList) => {
	const isTeamAdd = useSelector(getTeamAddStatus);
	const expanded = useSelector(getTeamExpandedVal);
	const champUpdateStatus = useSelector(getChampAddStatus);
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

				const sortedList = [];

				CYBER_LIST.forEach((cyber) => {
					const filteredByChamps = arg?.list?.filter(
						(item) =>
							item.teamCyber.cyberName.toLowerCase() === cyber.toLowerCase()
					);
					sortedList.push(...filteredByChamps);
				});
				setList(sortedList);
				dispatch(handleAddTeam(false));
			});

			return () => {
				ipcRenderer.removeAllListeners(CHANNELS.TEAM_NAME.GET_ALL_NAMES);
			};
		}
	}, [expanded, isTeamAdd, champUpdateStatus]);
};
