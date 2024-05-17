import React from "react";
import PropTypes from "prop-types";

import { List, InputBase, Typography } from "@mui/material";

import {
	ListItem,
	Box,
} from "../../../helpers/reusableComponents/gamesStaticListAccordion.js";

const ManualDetailsList = ({ handleInput, games, cyber }) => {
	const gamesByCyber = games?.filter((item) => {
		return item?.homeTeam?.teamCyber?.name === cyber;
	});

	const sortedList = gamesByCyber?.sort((a, b) => {
		const champA = a?.homeTeam?.teamChamp?.name?.toLowerCase();
		const champB = b?.homeTeam?.teamChamp?.name?.toLowerCase();
		if (champA < champB) {
			return -1;
		}
		if (champA > champB) {
			return 1;
		}
		return 0;
	});

	return (
		<List
			sx={{
				py: 0,
				borderLeft: `${sortedList ? "1px solid #eeeeee" : ""}`,
				borderRight: `${sortedList ? "1px solid #eeeeee" : ""}`,
			}}
		>
			{sortedList?.map((item) => {
				return (
					<ListItem key={item?.matchId}>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`deviation_${item?.matchId}`}
								onChange={handleInput}
								value={item?.deviation ?? 0}
								size="small"
								sx={{
									"&.MuiInputBase-root > input": {
										padding: 0,
									},
								}}
							/>
						</Box>
						<Box sx={{ width: "12%" }}>
							<Typography>{item?.homeTeam?.teamChamp?.name}</Typography>
						</Box>
						<Box sx={{ width: "14%" }}>
							<Typography>{item?.homeTeam?.teamName}</Typography>
						</Box>
						<Box sx={{ width: "14%" }}>
							<Typography>{item?.awayTeam?.teamName}</Typography>
						</Box>
						<Box sx={{ width: "7%" }}>
							<InputBase
								id={`total_${item?.matchId}`}
								onChange={handleInput}
								value={item?.total ?? 0}
								size="small"
								sx={{
									"&.MuiInputBase-root > input": {
										padding: 0,
									},
								}}
							/>
						</Box>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`temp_${item?.matchId}`}
								onChange={handleInput}
								value={item?.temp ?? 0}
								size="small"
								sx={{
									"&.MuiInputBase-root > input": {
										padding: 0,
									},
								}}
							/>
						</Box>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`attackKEF_${item?.matchId}`}
								onChange={handleInput}
								value={item?.attackKef ?? 0}
								size="small"
								sx={{
									"&.MuiInputBase-root > input": {
										padding: 0,
									},
								}}
							/>
						</Box>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`calcTemp_${item?.matchId}`}
								onChange={handleInput}
								value={item?.calcTemp ?? 0}
								size="small"
								sx={{
									"&.MuiInputBase-root > input": {
										padding: 0,
									},
								}}
							/>
						</Box>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`total2ndHALF_${item?.matchId}`}
								onChange={handleInput}
								value={item?.totalSecondHalf ?? 0}
								size="small"
								sx={{
									"&.MuiInputBase-root > input": {
										padding: 0,
									},
								}}
							/>
						</Box>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`totalInMoment_${item?.matchId}`}
								onChange={handleInput}
								value={item?.totalInMoment ?? 0}
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
							<InputBase
								id={`predict_${item?.matchId}`}
								onChange={handleInput}
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

ManualDetailsList.propTypes = {
	handleInput: PropTypes.func.isRequired,
	games: PropTypes.array,
	cyber: PropTypes.string,
};

export default ManualDetailsList;
