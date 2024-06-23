import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleAddChamp,
	setChampLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getChampAddStatus,
	getExpandedVal,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { CYBER_LIST } from "../../constants";
import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";

export const useGetChampionships = (setList) => {
	const isChampAdd = useSelector(getChampAddStatus);
	const expanded = useSelector(getExpandedVal);
	const dispatch = useDispatch();

	useEffect(() => {
		if (expanded === MATCHES_SETTINGS.CHAMPIONSHIP_TABLE.ACCORDION_NAME) {
			dispatch(setChampLoadingStatus(true));
			ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL);

			ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL, (event, arg) => {
				dispatch(setChampLoadingStatus(false));

				if (arg?.statusText !== "OK") {
					enqueueSnackbar(
						arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
						{
							variant: "error",
						}
					);
					return;
				}

				const sortedList = [];

				CYBER_LIST.forEach((cyber) => {
					const filteredChamps = arg?.list?.filter(
						(item) => item.cyber.name.toLowerCase() === cyber.toLowerCase()
					);
					sortedList.push(...filteredChamps);
				});

				setList(sortedList);

				dispatch(handleAddChamp(false));
			});

			return () => {
				ipcRenderer.removeAllListeners(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL);
			};
		}
	}, [expanded, isChampAdd]);
};
