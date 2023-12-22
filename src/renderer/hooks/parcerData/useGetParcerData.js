import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { refresh } from "../../redux/parcerData/parcerDataSlice.js";
import { getOnClickRequest } from "../../redux/parcerData/parcerDataSelector.js";

import { PARCER_DATA } from "../../constants/parcer.js";
import { CHANNELS } from "../../../common/constants/channels.js";

export const useGetParcerData = (setList) => {
	const isOnClick = useSelector(getOnClickRequest);
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			const response = await ipcRenderer.invoke(
				CHANNELS.PARCER_DATA.GET_DATA_LIST
			);

			if (response?.statusText !== "OK") {
				enqueueSnackbar(response?.message ?? PARCER_DATA.ON_ERROR, {
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
