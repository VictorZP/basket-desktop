import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	getOutChampId,
	getTargetChampId,
	getIsTeamsUpdated,
} from "../../redux/teamTransfer/teamTransferSelector.js";
import { handleSearchQuery } from "../../redux/teamTransfer/teamTransferSlice.js";

import { CHANNELS } from "../../../common/constants/channels";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";

// Hook for getting short teams data
export const useGetTeamsShortData = (
	setLeft,
	setRight,
	setDisabledIds,
	setVisibleList
) => {
	const outChampId = useSelector(getOutChampId);
	const targetChampId = useSelector(getTargetChampId);
	const isTeamsUpdated = useSelector(getIsTeamsUpdated);

	const dispatch = useDispatch();

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
				// Clear search query and visible list for transfer list component
				setVisibleList([]);
				dispatch(handleSearchQuery(""));

				setLeft(arg?.list ?? []);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST);
		};
	}, [outChampId, isTeamsUpdated]);

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
				const disabledIds = arg?.list?.map((team) => team?.teamId);
				setDisabledIds(disabledIds); // Set disabled ids for transfer list component
				setRight(arg?.list ?? []);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST);
		};
	}, [targetChampId, isTeamsUpdated]);
};
