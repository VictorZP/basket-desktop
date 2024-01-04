import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { TEXT } from "./text.js";

const LinesTop = ({
	isLoading,
	getLines,
	dateValue,
	handleDateChange,
	setStartTime,
	setEndTime,
}) => {
	return (
		<Box sx={{ px: 3, py: 1, md: 2 }}>
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
				/>
				<TimePicker
					sx={{ width: 150 }}
					label="Начиная"
					name="startTime"
					onChange={(newValue) => setStartTime(newValue)}
				/>
				<TimePicker
					sx={{ width: 150 }}
					label="Заканчивая"
					name="endTime"
					onChange={(newValue) => setEndTime(newValue)}
				/>
				<LoadingButton
					loading={isLoading}
					loadingPosition="start"
					startIcon={<ListAltIcon />}
					onClick={getLines}
				>
					{TEXT.BTN}
				</LoadingButton>
			</Box>
		</Box>
	);
};

LinesTop.propTypes = {
	getLines: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	dateValue: PropTypes.object.isRequired,
	handleDateChange: PropTypes.func.isRequired,
	setStartTime: PropTypes.func.isRequired,
	setEndTime: PropTypes.func.isRequired,
};

export default LinesTop;
