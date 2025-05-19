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
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		return () => {
			setIsLoading(false);
		};
	}, []);

	const formStatistics = async () => {
		try {
			setIsLoading(true);

			if (!startDate) {
				enqueueSnackbar(MESSAGES.EMPTY_DATE, {
					variant: "warning",
				});
				return;
			}

			const fileData = await handleHalvesFile("statistics");

			if (fileData?.status === STATUS.ERROR) {
				enqueueSnackbar(fileData?.message, {
					variant: "error",
				});
				return;
			}

			const paramsObj = {
				dates: {
					startDay: startDate ? dayjs(startDate).format("DD") : "",
					startMonth: startDate ? dayjs(startDate).format("MM") : "",
					startYear: startDate ? dayjs(startDate).format("YYYY") : "",
					endDay: endDate ? dayjs(endDate).format("DD") : "",
					endMonth: endDate ? dayjs(endDate).format("MM") : "",
					endYear: endDate ? dayjs(endDate).format("YYYY") : "",
				},
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
				startDate={startDate}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				formStatistics={formStatistics}
			/>
			<Divider />
			<HalvesStatisticsData />
		</Box>
	);
};

export default FormHalvesStatistics;
