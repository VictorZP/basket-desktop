import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const backgroundColor = grey[100];
const borderColor = grey[300];

import ManualDetailsList from "../ManualDetailsList";

import { TEXT } from "./text.js";
import { CYBER_LIST } from "../../../constants/cyberList.js";

const ManualGamesList = ({ games, setGames }) => {
	const handleInput = (e) => {
		const elemID = e.target.id;
		const id = elemID?.split("_")[1];
		const name = elemID?.split("_")[0];
		const value = e?.target?.value;
		const index = games?.findIndex((game) => game?.eventId === id);
		const updatedDataList = [...games];

		switch (name) {
			case "deviation":
				updatedDataList[index].deviation = value;
				break;
			case "total":
				updatedDataList[index].total = value;
				break;
			case "temp":
				updatedDataList[index].temp = value;
				break;
			case "attackKEF":
				updatedDataList[index].attackKEF = value;
				break;
			case "calcTemp":
				updatedDataList[index].calcTemp = value;
				break;
			case "total2ndHALF":
				updatedDataList[index].total2ndHALF = value;
				break;
			case "totalInMoment":
				updatedDataList[index].totalInMoment = value;
				break;
			case "predict":
				updatedDataList[index].predict = value;
				break;

			default:
				break;
		}

		setGames([...updatedDataList]);
	};

	return (
		<Box component="section" sx={{ px: 3, py: 1 }}>
			<Box mb={1}>
				<Typography variant="h5">{TEXT.TITLE}</Typography>
			</Box>
			<Box sx={{ py: 1 }}>
				{CYBER_LIST
					? CYBER_LIST.map((cyber) => {
							return (
								<Box
									key={cyber}
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Typography
										variant="span"
										sx={{
											display: "flex",
											px: 2,
											width: "100%",
											height: "50px",
											backgroundColor: `${backgroundColor}`,
											alignItems: "center",
											border: `1px solid ${borderColor}`,
										}}
									>
										{cyber}
									</Typography>
									<ManualDetailsList
										handleInput={handleInput}
										games={games}
										cyber={cyber}
									/>
								</Box>
							);
					  })
					: ""}
			</Box>
		</Box>
	);
};

ManualGamesList.propTypes = {
	games: PropTypes.array,
	setGames: PropTypes.func,
};

export default ManualGamesList;
