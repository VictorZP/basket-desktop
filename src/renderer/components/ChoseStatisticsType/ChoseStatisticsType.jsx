import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Divider, Button, Typography } from "@mui/material";

const ChoseStatisticsType = () => {
	const navigate = useNavigate();

	const onStatisticsFromHalvesClick = () => {
		navigate("/form_halves_statistics");
	};
	const onStatisticsFromSeasonClick = () => {
		navigate("/matches_results_by_season");
	};

	return (
		<Box>
			<Box
				sx={{
					px: 3,
					py: 1,
					mb: 2,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 2,
					maxWidth: "500px",
				}}
			>
				<Typography variant="p">Выкачка статистики из половин</Typography>
				<Button variant="contained" onClick={onStatisticsFromHalvesClick}>
					Перейти
				</Button>
			</Box>
			<Divider />
			<Box
				sx={{
					px: 3,
					py: 1,
					my: 2,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 2,
					maxWidth: "500px",
				}}
			>
				<Typography variant="p">Результаты матчей за сезон</Typography>
				<Button variant="contained" onClick={onStatisticsFromSeasonClick}>
					Перейти
				</Button>
			</Box>
		</Box>
	);
};

export default ChoseStatisticsType;
