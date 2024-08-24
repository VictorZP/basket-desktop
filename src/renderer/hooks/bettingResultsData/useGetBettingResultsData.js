import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleIsDataLoading,
	refresh,
} from "../../redux/bettingResultsData/bettingResultsDataSlice.js";
import { getOnClickRequest } from "../../redux/bettingResultsData/bettingResultsDataSelector.js";

import { BETTING_RESULTS_CONSTANTS } from "../../constants";
import { CHANNELS } from "../../../common/constants";

export const useGetBettingResultsData = (setList) => {
	const { MESSAGES } = BETTING_RESULTS_CONSTANTS;
	const isOnClick = useSelector(getOnClickRequest);
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			dispatch(handleIsDataLoading(true));
			const response = await ipcRenderer.invoke(
				CHANNELS.BETTING_RESULTS.GET_RESULTS_LIST
			);

			if (response?.statusText !== "OK") {
				enqueueSnackbar(response?.message ?? MESSAGES.ON_ERROR_GET_LIST, {
					variant: "error",
				});
				return;
			}

			setList(response.list);
			dispatch(refresh());
		};

		getData();
	}, [isOnClick]);
};
