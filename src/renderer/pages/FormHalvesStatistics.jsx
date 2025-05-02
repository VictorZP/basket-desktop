import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Divider } from "@mui/material";

import HalvesStatisticsTop from "../components/HalvesStatistics/HalvesStatisticsTop";
import HalvesStatisticsData from "../components/HalvesStatistics/HalvesStatisticsData";

import handleHalvesFile from "../helpers/functions/addMatches/halvesFilesHandler.js";

import { MESSAGES } from "../constants/statistics.js";
import { STATUS, CHANNELS } from "../../common/constants";

const FormHalvesStatistics = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [dateValue, setDateValue] = useState(dayjs());

	useEffect(() => {
		return () => {
			setIsLoading(false);
		};
	}, []);

	const handleDateChange = async (e) => {
		setDateValue(e);
	};

	const formStatistics = async () => {
		try {
			setIsLoading(true);

			const fileData = await handleHalvesFile("statistics");

			if (fileData?.status === STATUS.ERROR) {
				enqueueSnackbar(fileData?.message, {
					variant: "error",
				});
				return;
			}

			const paramsObj = {
				day: dayjs(dateValue).format("DD"),
				month: dayjs(dateValue).format("MM"),
				year: dayjs(dateValue).format("YY"),
				fileData: fileData?.data,
			};

			ipcRenderer.send(
				CHANNELS.HALVES_STATISTICS.GET_HALVES_STATISTICS,
				paramsObj
			);

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

	return (
		<Box component="section">
			<HalvesStatisticsTop
				isLoading={isLoading}
				dateValue={dateValue}
				formStatistics={formStatistics}
				handleDateChange={handleDateChange}
			/>
			<Divider />
			<HalvesStatisticsData />
		</Box>
	);
};

export default FormHalvesStatistics;
