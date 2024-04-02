import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { CHANNELS } from "../../../common/constants/channels.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

// Get short list of championships
export const useGetShortChampList = (setShortChampList) => {
	useEffect(() => {
		ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT);

		ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT, (e, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				return;
			}

			setShortChampList(arg?.list);
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT);
		};
	}, []);
};
