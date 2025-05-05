import React from "react";
import PropTypes from "prop-types";

import { Box, Typography, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SeasonDateSelect = ({
	setStartDate,
	setEndDate,
	formData,
	startDate,
	isLoading,
}) => {
	return (
		<Box sx={{ px: 3, py: 1, mb: 2 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>
				Выбор даты сезона
			</Typography>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<DatePicker
					label={"Начальная дата"}
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
					label={"Конечная дата"}
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
					onClick={formData}
				>
					Сформировать
				</Button>
			</Box>
		</Box>
	);
};

SeasonDateSelect.propTypes = {
	setStartDate: PropTypes.func.isRequired,
	setEndDate: PropTypes.func.isRequired,
	formData: PropTypes.func.isRequired,
	startDate: PropTypes.object,
	isLoading: PropTypes.bool.isRequired,
};

export default SeasonDateSelect;
