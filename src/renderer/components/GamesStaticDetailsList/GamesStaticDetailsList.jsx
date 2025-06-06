import React from "react";
import PropTypes from "prop-types";

import {
	List,
	InputBase,
	Typography,
	IconButton,
	Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import {
	ListItem,
	Box,
} from "../../helpers/reusableComponents/gamesStaticListAccordion.js";

const GamesStaticDetailsList = ({
	handleTemp,
	games,
	cyber,
	openDeleteModal,
}) => {
	const gamesByCyber = games?.filter((item) => {
		return (
			item?.homeTeam?.teamCyber?.name === cyber && item?.status === "scheduled"
		);
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

	const deviation = (deviation) => {
		return deviation?.toFixed(1);
	};

	return (
		<>
			<List sx={{ py: 0 }}>
				{sortedList?.map((item) => {
					return (
						<ListItem
							key={item?.matchId}
							sx={{
								background: `${
									item?.noBets ? "#ffa726" : item?.total === 0 ? "#fff59d" : ""
								}`,
							}}
						>
							<Box sx={{ width: "6%" }}>
								<Typography>{deviation(item?.deviation)}</Typography>
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
								<Typography
									sx={{ display: "inline-block", overflow: "hidden" }}
								>
									{item?.total}
								</Typography>
							</Box>
							<Box sx={{ width: "6%" }}>
								<InputBase
									id={`temp_${item?.matchId}`}
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
									id={`predict_${item?.matchId}`}
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
							<Box
								sx={{ width: "6%", display: "flex", justifyContent: "center" }}
							>
								<Tooltip title="Удалить матч" placement="top">
									<IconButton
										size="small"
										onClick={() => {
											openDeleteModal(item?.matchId);
										}}
										sx={{
											background: "white",
											"&:hover": {
												backgroundColor: "white",
											},
										}}
									>
										<Delete
											sx={{
												color: "#f44336",
												"&:hover": {
													transform: "scale(1.1)",
												},
											}}
										/>
									</IconButton>
								</Tooltip>
							</Box>
						</ListItem>
					);
				})}
			</List>
		</>
	);
};

GamesStaticDetailsList.propTypes = {
	handleTemp: PropTypes.func.isRequired,
	games: PropTypes.array,
	cyber: PropTypes.string,
	openDeleteModal: PropTypes.func.isRequired,
};

export default GamesStaticDetailsList;
