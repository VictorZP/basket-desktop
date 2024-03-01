import { useEffect } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	getOutChampId,
	getTargetChampId,
} from "../../redux/teamTransfer/teamTransferSelector.js";

import { CHANNELS } from "../../../common/constants/channels";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";

// Hook for getting short teams data
export const useGetTeamsShortData = (setLeft, setRight) => {
	const outChampId = useSelector(getOutChampId);
	const targetChampId = useSelector(getTargetChampId);

	useEffect(() => {
		ipcRenderer.send(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, {
			champId: outChampId,
			listType: TRANSFER_TYPE.OUT,
		});

		ipcRenderer.on(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, (e, arg) => {
			if (arg?.statusText !== "OK" && arg?.type === TRANSFER_TYPE.OUT) {
				enqueueSnackbar(
					`${arg?.message} ${arg?.statusCode}` ??
						MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				return;
			}

			if (arg.type === TRANSFER_TYPE.OUT) {
				setLeft(arg?.list ?? []);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST);
		};
	}, [outChampId]);

	useEffect(() => {
		ipcRenderer.send(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, {
			champId: targetChampId,
			listType: TRANSFER_TYPE.TARGET,
		});

		ipcRenderer.on(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, (e, arg) => {
			if (arg?.statusText !== "OK" && arg?.type === TRANSFER_TYPE.TARGET) {
				enqueueSnackbar(
					`${arg?.message} ${arg?.statusCode}` ??
						MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				return;
			}

			if (arg.type === TRANSFER_TYPE.TARGET) {
				setRight(arg?.list ?? []);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST);
		};
	}, [targetChampId]);
};
