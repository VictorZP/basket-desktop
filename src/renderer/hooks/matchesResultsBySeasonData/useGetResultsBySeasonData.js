import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleIsDataLoading,
	refresh,
} from "../../redux/resultsBySeason/resultsBySeasonSlice.js";
import { getOnClickRequest } from "../../redux/resultsBySeason/resultsBySeasonSelector.js";

import { MATCHES_RESULTS_BY_SEASON_CONSTANTS } from "../../constants/index.js";
import { CHANNELS } from "../../../common/constants/index.js";

export const useGetResultsBySeasonData = (setList) => {
	const { MESSAGES } = MATCHES_RESULTS_BY_SEASON_CONSTANTS;
	const isOnClick = useSelector(getOnClickRequest);
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			try {
				dispatch(handleIsDataLoading(true));
				const response = await ipcRenderer.invoke(
					CHANNELS.MATCHES_STATS_BY_SEASON.GET_MATCHES_STATS_BY_SEASON_LIST
				);

				if (response?.statusText !== "OK") {
					enqueueSnackbar(response?.message ?? MESSAGES.ON_ERROR_GET_LIST, {
						variant: "error",
					});
					return;
				}

				setList(response.list);
			} catch (error) {
				enqueueSnackbar(response?.message ?? MESSAGES.ON_ERROR_GET_LIST, {
					variant: "error",
				});
			} finally {
				dispatch(handleIsDataLoading(false));
				dispatch(refresh());
			}
		};

		getData();
	}, [isOnClick]);
};
