import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box } from "@mui/material";

import LinesTop from "../components/LinesComponents/LinesTop";

import { CHANNELS } from "../../common/constants/channels.js";
import { MESSAGES } from "../constants/lines.js";

const LinesPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [dateValue, setDateValue] = useState(dayjs());
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();

	useEffect(() => {
		return () => {
			setIsLoading(false);
			setStartTime();
			setEndTime();
		};
	}, []);

	//	Дата для выборки линий
	const handleDateChange = async (e) => {
		setDateValue(e);
	};

	//	Формирование линий
	const getLines = async () => {
		try {
			setIsLoading(true);

			const paramsObj = {
				day: dayjs(dateValue).format("DD"),
				month: dayjs(dateValue).format("MM"),
				year: dayjs(dateValue).format("YYYY"),
				start_h: startTime ? dayjs(startTime).format("HH") : "",
				start_m: startTime ? dayjs(startTime).format("mm") : "",
				end_h: endTime ? dayjs(endTime).format("HH") : "",
				end_m: endTime ? dayjs(endTime).format("mm") : "",
			};

			ipcRenderer.send(CHANNELS.LINES.GET_LINES, paramsObj);

			enqueueSnackbar(MESSAGES.ON_START, {
				variant: "success",
			});
		} catch (err) {
			enqueueSnackbar(err?.message ?? MESSAGES.ON_ERR_START, {
				variant: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const linesTopProps = {
		getLines,
		dateValue,
		isLoading,
		startTime,
		endTime,
		handleDateChange,
		setStartTime,
		setEndTime,
	};
	return (
		<Box component="section">
			<LinesTop {...linesTopProps} />
		</Box>
	);
};

export default LinesPage;
