import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleIsDataLoading,
	refresh,
} from "../../redux/linesData/linesDataSlice.js";
import { getOnClickRequest } from "../../redux/linesData/linesDataSelector.js";

import { MESSAGES } from "../../constants/lines.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useGetLinesData = (setList) => {
	const isOnClick = useSelector(getOnClickRequest);
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			dispatch(handleIsDataLoading(true));
			const response = await ipcRenderer.invoke(CHANNELS.LINES.GET_LINES_LIST);

			if (response?.statusText !== "OK") {
				enqueueSnackbar(response?.message ?? MESSAGES.ON_GET_LINES_ERR, {
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
