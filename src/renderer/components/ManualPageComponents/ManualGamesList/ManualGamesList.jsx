import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const backgroundColor = grey[100];
const borderColor = grey[300];

import ManualDetailsList from "../ManualDetailsList";

import { TEXT } from "./text.js";
import { CYBER_LIST } from "../../../constants/cyberList.js";

const ManualGamesList = ({ games, handleInput }) => {
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
	handleInput: PropTypes.func,
};

export default ManualGamesList;
