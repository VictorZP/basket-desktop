import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

const ipcRenderer = window.require("electron").ipcRenderer;

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Box, Button } from "@mui/material";

import { CHANNELS } from "../../common/constants/channels.js";

const BettingResults = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const initiateBetsResultsHandler = async () => {
		try {
			setIsLoading(true);

			const paramsObj = {
				start_day: startDate ? dayjs(startDate).format("DD") : "",
				start_month: startDate ? dayjs(startDate).format("MM") : "",
				start_year: startDate ? dayjs(startDate).format("YY") : "",
				end_day: endDate ? dayjs(endDate).format("DD") : "",
				end_month: endDate ? dayjs(endDate).format("MM") : "",
				end_year: endDate ? dayjs(endDate).format("YY") : "",
			};

			const initiateBetsResultsHandlerResponseFromMain =
				await ipcRenderer.invoke(
					CHANNELS.BETTING_RESULTS.GET_RESULTS,
					paramsObj
				);

			if (initiateBetsResultsHandlerResponseFromMain?.statusCode !== 200) {
				throw new Error(
					initiateBetsResultsHandlerResponseFromMain?.message ??
						"Error for results initialization response"
				);
			}
		} catch (err) {
			enqueueSnackbar(err?.message ?? "Error for results initialization", {
				variant: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box component="section" sx={{ pt: 1, pb: 2 }}>
			<Box>
				<Box sx={{ px: 3, display: "flex", gap: 2 }}>
					<DatePicker
						label="Начальная дата"
						onChange={(startDate) => setStartDate(startDate)}
						sx={{
							alignItems: "flex-start",
							m: 0,
						}}
						slotProps={{
							actionBar: {
								actions: ["clear", "today"],
							},
						}}
						disabled={isLoading}
					/>
					<DatePicker
						label="Конечная дата"
						onChange={(endDate) => setEndDate(endDate)}
						sx={{
							alignItems: "flex-start",
							m: 0,
						}}
						slotProps={{
							actionBar: {
								actions: ["clear", "today"],
							},
						}}
						disabled={isLoading}
					/>
					<Button
						variant="contained"
						disabled={isLoading}
						onClick={initiateBetsResultsHandler}
					>
						Получить результаты
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default BettingResults;
