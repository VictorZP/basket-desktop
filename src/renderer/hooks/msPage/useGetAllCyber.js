import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleAddCyber,
	setCyberList,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getCyberAddStatus,
	getCyberList,
} from "../../redux/matchSettings/matchSettingSelector.js";
import { CHANNELS } from "../../../common/constants/channels.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

export const useGetAllCyber = () => {
	const isCyberOnAdd = useSelector(getCyberAddStatus);
	const cyberList = useSelector(getCyberList);

	const dispatch = useDispatch();

	useEffect(() => {
		if (cyberList.length === 0 || (cyberList.length > 0 && isCyberOnAdd)) {
			ipcRenderer.send(CHANNELS.CYBER.GET_ALL_CYBER);
		}

		ipcRenderer.on(CHANNELS.CYBER.GET_ALL_CYBER, (event, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR_CYBER_LIST,
					{
						variant: "error",
					}
				);
				return;
			}

			dispatch(setCyberList(arg?.list));
		});

		dispatch(handleAddCyber(false));
		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.CYBER.GET_ALL_CYBER);
		};
	}, [isCyberOnAdd, cyberList]);
};
