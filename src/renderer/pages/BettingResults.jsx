import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Divider } from "@mui/material";

import BettingResultsTop from "../components/BettingResultsComponents/BettingResultsTop";
import BettingResultsData from "../components/BettingResultsComponents/BettingResultsData";

import { CHANNELS } from "../../common/constants";
import { BETTING_RESULTS_CONSTANTS } from "../constants";

const BettingResults = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	//  Initiating forming of betting results
	const initiateBetsResultsHandler = async () => {
		try {
			setIsLoading(true);

			const paramsObj = {
				start_day: startDate ? dayjs(startDate).format("DD") : "",
				start_month: startDate ? dayjs(startDate).format("MM") : "",
				start_year: startDate ? dayjs(startDate).format("YYYY") : "",
				end_day: endDate ? dayjs(endDate).format("DD") : "",
				end_month: endDate ? dayjs(endDate).format("MM") : "",
				end_year: endDate ? dayjs(endDate).format("YYYY") : "",
			};

			const initiateBetsResultsHandlerResponseFromMain =
				await ipcRenderer.invoke(
					CHANNELS.BETTING_RESULTS.GET_RESULTS,
					paramsObj
				);

			if (initiateBetsResultsHandlerResponseFromMain?.statusCode !== 200) {
				enqueueSnackbar(
					initiateBetsResultsHandlerResponseFromMain?.message ??
						BETTING_RESULTS_CONSTANTS.MESSAGES.ON_WARNING_START,
					{
						variant: "warning",
					}
				);
			}
		} catch (err) {
			enqueueSnackbar(
				err?.message ?? BETTING_RESULTS_CONSTANTS.MESSAGES.ON_ERROR_START,
				{
					variant: "error",
				}
			);
		} finally {
			setIsLoading(false);
		}
	};

	const bettingResultsTopProps = {
		initiateBetsResultsHandler,
		setStartDate,
		setEndDate,
		startDate,
		isLoading,
	};

	return (
		<Box component="section" sx={{ pt: 1, pb: 2 }}>
			<BettingResultsTop {...bettingResultsTopProps} />
			<Divider />
			<BettingResultsData />
		</Box>
	);
};

export default BettingResults;
