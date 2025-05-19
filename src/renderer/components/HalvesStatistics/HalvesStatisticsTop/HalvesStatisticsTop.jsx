import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const HalvesStatisticsTop = ({
	isLoading,
	startDate,
	setStartDate,
	setEndDate,
	formStatistics,
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
	isLoading: PropTypes.bool,
	startDate: PropTypes.object,
	setStartDate: PropTypes.func,
	setEndDate: PropTypes.func,
	formStatistics: PropTypes.func,
};

export default HalvesStatisticsTop;
