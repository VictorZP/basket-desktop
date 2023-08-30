import React from "react";
import PropTypes from "prop-types";

import { List, InputBase, Typography } from "@mui/material";

import {
	ListItem,
	Box,
} from "../../../helpers/reusableComponents/gamesStaticListAccordion.js";

const ManualDetailsList = ({ handleInput, games, cyber }) => {
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
		<List
			sx={{
				py: 0,
				borderLeft: `${sortedList ? "1px solid #eeeeee" : ""}`,
				borderRight: `${sortedList ? "1px solid #eeeeee" : ""}`,
			}}
		>
			{sortedList?.map((item) => {
				return (
					<ListItem key={item?.eventId}>
						<Box sx={{ width: "6%" }}>
							<InputBase
								id={`deviation_${item?.eventId}`}
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
							<Typography>
								{item?.homeTeam?.teamChamp?.championshipName}
							</Typography>
						</Box>
						<Box sx={{ width: "14%" }}>
							<Typography>{item?.homeTeam?.teamName}</Typography>
						</Box>
						<Box sx={{ width: "14%" }}>
							<Typography>{item?.awayTeam?.teamName}</Typography>
						</Box>
						<Box sx={{ width: "7%" }}>
							<InputBase
								id={`total_${item?.eventId}`}
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
								id={`temp_${item?.eventId}`}
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
								id={`attackKEF_${item?.eventId}`}
								onChange={handleInput}
								value={item?.attackKEF ?? 0}
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
								id={`calcTemp_${item?.eventId}`}
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
								id={`total2ndHALF_${item?.eventId}`}
								onChange={handleInput}
								value={item?.total2ndHALF ?? 0}
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
								id={`totalInMoment_${item?.eventId}`}
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
								id={`predict_${item?.eventId}`}
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
