import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	getLeftChampId,
	getRightChampId,
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
	setLeftVisibleList,
	setRightVisibleList
) => {
	const leftChampId = useSelector(getLeftChampId);
	const rightChampId = useSelector(getRightChampId);
	const isTeamsUpdated = useSelector(getIsTeamsUpdated);

	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.send(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, {
			champId: leftChampId,
			listType: TRANSFER_TYPE.LEFT,
		});

		ipcRenderer.on(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, (e, arg) => {
			if (arg?.statusText !== "OK" && arg?.type === TRANSFER_TYPE.LEFT) {
				enqueueSnackbar(
					`${arg?.message} ${arg?.statusCode}` ??
						MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				return;
			}

			if (arg.type === TRANSFER_TYPE.LEFT) {
				// Clear search query and visible list for transfer list component
				setLeftVisibleList([]);
				dispatch(
					handleSearchQuery({
						key: TRANSFER_TYPE.LEFT_SEARCH_QUERY_KEY,
						value: "",
					})
				);
				setLeft(arg?.list ?? []);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST);
		};
	}, [leftChampId, isTeamsUpdated]);

	useEffect(() => {
		ipcRenderer.send(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, {
			champId: rightChampId,
			listType: TRANSFER_TYPE.RIGHT,
		});

		ipcRenderer.on(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, (e, arg) => {
			if (arg?.statusText !== "OK" && arg?.type === TRANSFER_TYPE.RIGHT) {
				enqueueSnackbar(
					`${arg?.message} ${arg?.statusCode}` ??
						MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				return;
			}

			if (arg.type === TRANSFER_TYPE.RIGHT) {
				// Clear search query and visible list for transfer list component
				setRightVisibleList([]);
				dispatch(
					handleSearchQuery({
						key: TRANSFER_TYPE.RIGHT_SEARCH_QUERY_KEY,
						value: "",
					})
				);
				setRight(arg?.list ?? []);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST);
		};
	}, [rightChampId, isTeamsUpdated]);
};
