import React from "react";
import PropTypes from "prop-types";

import { List, InputBase, Typography, Paper } from "@mui/material";
import MuiBox from "@mui/material/Box";

import {
	ListItem,
	Box,
} from "../../helpers/reusableComponents/gamesStaticListAccordion.js";

const GamesStaticDetailsList = ({ handleTemp, games, cyber }) => {
	const getDeviation = (item) => {
		return Number.parseFloat(
			(item?.homeDeviation + item?.awayDeviation) / 4
		).toFixed(2);
	};

	const gamesByCyber = games?.filter((item) => {
		return item?.homeTeam?.teamCyber?.cyberName === cyber;
	});

	const sortedList = gamesByCyber?.sort((a, b) => {
		const champA = a?.homeTeam?.teamChamp?.championshipName?.toLowerCase();
		const champB = b?.homeTeam?.teamChamp?.championshipName?.toLowerCase();
		if (champA < champB) {
			return -1;
		}
		if (champA > champB) {
			return 1;
		}
		return 0;
	});

	return (
		<List sx={{ py: 0 }}>
			{sortedList?.map((item) => {
				return (
					<ListItem key={item?.eventId}>
						<Box sx={{ width: "6%" }}>
							<Typography>{getDeviation(item)}</Typography>
						</Box>
						<Box sx={{ width: "12%" }}>
							<Typography>
								{item?.homeTeam?.teamChamp?.championshipName}
							</Typography>
						</Box>
						<Box sx={{ width: "15%" }}>
							<Typography>{item?.homeTeam?.teamName}</Typography>
						</Box>
						<Box sx={{ width: "15%" }}>
							<Typography>{item?.awayTeam?.teamName}</Typography>
						</Box>
						<Box sx={{ width: "6%" }}>
							<Typography>{item?.total}</Typography>
						</Box>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`temp_${item?.eventId}`}
								onChange={handleTemp}
								value={item?.temp}
								size="small"
								sx={{
									"&.MuiInputBase-root > input": {
										padding: 0,
									},
								}}
							/>
						</Box>
						<Box sx={{ width: "6%" }}>
							<Typography>-</Typography>
						</Box>
						<Box sx={{ width: "6%" }}>
							<Typography>-</Typography>
						</Box>
						<Box sx={{ width: "6%" }}>
							<Typography>-</Typography>
						</Box>
						<Box sx={{ width: "6%" }}>
							<Typography>-</Typography>
						</Box>
						<Box sx={{ width: "6%" }}>
							<Typography>-</Typography>
						</Box>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`predict_${item?.eventId}`}
								onChange={handleTemp}
								value={item?.predict}
								size="small"
								sx={{
									"&.MuiInputBase-root > input": {
										padding: 0,
									},
								}}
							/>
						</Box>
					</ListItem>
				);
			})}
		</List>
	);
};

GamesStaticDetailsList.propTypes = {
	handleTemp: PropTypes.func.isRequired,
	games: PropTypes.array,
	cyber: PropTypes.string,
};

export default GamesStaticDetailsList;