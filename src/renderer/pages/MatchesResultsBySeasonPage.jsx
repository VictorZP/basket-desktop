import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Divider } from "@mui/material";

import SeasonDateSelect from "../components/MatchesResultsBySeason/SeasonDateSelect";
import SeasonData from "../components/MatchesResultsBySeason/SeasonData";

import { CHANNELS } from "../../common/constants";
import { MESSAGES } from "../constants/statistics.js";

const MatchesResultsBySeasonPage = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const formData = () => {
		try {
			setIsLoading(true);

			const requestData = {
				startDay: startDate ? dayjs(startDate).format("DD") : "",
				startMonth: startDate ? dayjs(startDate).format("MM") : "",
				startYear: startDate ? dayjs(startDate).format("YYYY") : "",
				endDay: endDate ? dayjs(endDate).format("DD") : "",
				endMonth: endDate ? dayjs(endDate).format("MM") : "",
				endYear: endDate ? dayjs(endDate).format("YYYY") : "",
			};

			ipcRenderer.send(
				CHANNELS.MATCHES_STATS_BY_SEASON.FORM_MATCHES_STATS_BY_SEASON,
				requestData
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

	const dateSelectProps = {
		setStartDate,
		setEndDate,
		formData,
		startDate,
		isLoading,
	};

	return (
		<Box component="section" sx={{ pt: 1, pb: 2 }}>
			<SeasonDateSelect {...dateSelectProps} />
			<Divider />
			<SeasonData />
		</Box>
	);
};

export default MatchesResultsBySeasonPage;
