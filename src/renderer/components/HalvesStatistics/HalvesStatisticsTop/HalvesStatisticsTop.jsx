import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const HalvesStatisticsTop = ({
	isLoading,
	dateValue,
	formStatistics,
	handleDateChange,
}) => {
	return (
		<Box sx={{ px: 3, py: 1, mb: 2 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>
				Формирование статистики
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
				<LoadingButton
					loading={isLoading}
					loadingPosition="start"
					startIcon={<ListAltIcon />}
					onClick={formStatistics}
				>
					Сформировать
				</LoadingButton>
			</Box>
		</Box>
	);
};

HalvesStatisticsTop.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	dateValue: PropTypes.object.isRequired,
	formStatistics: PropTypes.func.isRequired,
	handleDateChange: PropTypes.func.isRequired,
};

export default HalvesStatisticsTop;
