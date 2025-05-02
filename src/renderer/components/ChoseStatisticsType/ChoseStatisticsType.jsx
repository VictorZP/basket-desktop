import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Divider, Button, Typography } from "@mui/material";

const ChoseStatisticsType = () => {
	const navigate = useNavigate();

	const onStatisticsFromHalvesClick = () => {
		navigate("/form_halves_statistics");
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
					gap: 2,
				}}
			>
				<Typography variant="p">Выкачка статистики из половин</Typography>
				<Button variant="contained" onClick={onStatisticsFromHalvesClick}>
					Перейти
				</Button>
			</Box>
			<Divider />
		</Box>
	);
};

export default ChoseStatisticsType;
