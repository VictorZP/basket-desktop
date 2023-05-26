import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { getToken } from "../../redux/auth/authSelector.js";
import { handleAddCyber } from "../../redux/matchSettings/matchSettingsSlice.js";
import { getCyberAddStatus } from "../../redux/matchSettings/matchSettingSelector.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useGetAllCyber = (setList) => {
	const token = useSelector(getToken);
	const isCyberOnAdd = useSelector(getCyberAddStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.send(CHANNELS.CYBER.GET_ALL_CYBER, { token });
		ipcRenderer.on(CHANNELS.CYBER.GET_ALL_CYBER, (event, arg) => {
			if (arg.error) {
				enqueueSnackbar(arg?.message, {
					variant: "error",
				});
				return;
			}
			setList(arg.list);
		});

		dispatch(handleAddCyber(false));
	}, [isCyberOnAdd]);
};
