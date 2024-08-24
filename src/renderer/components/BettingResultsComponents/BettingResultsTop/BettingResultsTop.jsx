import React from "react";
import PropTypes from "prop-types";

import { Box, Typography, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { TEXT } from "./text.js";

const BettingResultsTop = ({
	initiateBetsResultsHandler,
	setStartDate,
	setEndDate,
	startDate,
	isLoading,
}) => {
	return (
		<Box sx={{ px: 3, py: 1, mb: 2 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>
				{TEXT.TITLE}
			</Typography>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<DatePicker
					label={TEXT.START_LABEL}
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
					label={TEXT.END_LABEL}
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
					variant="text"
					size="medium"
					disabled={isLoading || !startDate}
					onClick={initiateBetsResultsHandler}
				>
					{TEXT.BTN}
				</Button>
			</Box>
		</Box>
	);
};

BettingResultsTop.propTypes = {
	initiateBetsResultsHandler: PropTypes.func.isRequired,
	setStartDate: PropTypes.func.isRequired,
	setEndDate: PropTypes.func.isRequired,
	startDate: PropTypes.object,
	isLoading: PropTypes.bool.isRequired,
};

export default BettingResultsTop;
