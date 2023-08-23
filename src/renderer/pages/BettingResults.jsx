import React, { useState } from "react";
import dayjs from "dayjs";

const ipcRenderer = window.require("electron").ipcRenderer;

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Box, Button } from "@mui/material";

import { CHANNELS } from "../../common/constants/channels.js";

const BettingResults = () => {
	const [dateValue, setDateValue] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleDateChange = (e) => {
		setDateValue(e);
		const date = dayjs(e).format("DD.MM.YY").split(".");

		const paramsObj = {
			day: date[0],
			month: date[1],
			year: date[2],
		};

		// ipcRenderer.send(CHANNELS.BETTING_RESULTS.GET_RESULTS, paramsObj);
		// setIsLoading(true);
	};

	ipcRenderer.once(CHANNELS.BETTING_RESULTS.GET_RESULTS, (e, res) => {
		setIsLoading(false);
	});
	return (
		<Box component="section" sx={{ pt: 1, pb: 2 }}>
			<Box>
				<Box sx={{ px: 3, display: "flex" }}>
					<DatePicker
						label="Дата матчей"
						value={dateValue}
						onChange={handleDateChange}
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
				</Box>
			</Box>
		</Box>
	);
};

export default BettingResults;
