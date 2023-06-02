import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { handleAddCyber } from "../../redux/matchSettings/matchSettingsSlice.js";
import { getCyberAddStatus } from "../../redux/matchSettings/matchSettingSelector.js";
import { CHANNELS } from "../../../common/constants/channels.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

export const useGetAllCyber = (setList) => {
	const isCyberOnAdd = useSelector(getCyberAddStatus);
	const dispatch = useDispatch();
	useEffect(() => {
		ipcRenderer.send(CHANNELS.CYBER.GET_ALL_CYBER);
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

			setList(arg?.list);
		});

		dispatch(handleAddCyber(false));
	}, [isCyberOnAdd]);
};
