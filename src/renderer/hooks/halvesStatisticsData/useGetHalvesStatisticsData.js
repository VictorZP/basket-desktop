import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleIsDataLoading,
	refresh,
} from "../../redux/halvesStatsData/halvesStatsDataSlice.js";
import { getOnClickRequest } from "../../redux/halvesStatsData/halvesStatsDataSelector.js";

import { MESSAGES } from "../../constants/statistics.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useGetHalvesStatisticsData = (setList) => {
	const isOnClick = useSelector(getOnClickRequest);
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			dispatch(handleIsDataLoading(true));
			const response = await ipcRenderer.invoke(
				CHANNELS.HALVES_STATISTICS.GET_HALVES_STATISTICS_LIST
			);

			if (response?.statusText !== "OK") {
				enqueueSnackbar(response?.message ?? MESSAGES.ON_GET_DATA_ERR, {
					variant: "error",
				});
				dispatch(handleIsDataLoading(false));
				return;
			}

			setList(response.list);
			dispatch(refresh());
		};

		getData();
	}, [isOnClick]);
};
