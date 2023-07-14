import React from "react";

import {
	Box,
	Typography,
	List,
	ListItem,
	Button,
	Divider,
	Slide,
} from "@mui/material";

import { CYBER_LIST } from "../../constants/cyberList.js";

const ActiveGamesList = ({ matches }) => {
	const gamesByCyber = (cyber) => {
		return matches?.filter((item) => {
			return item?.cyber === cyber;
		});
	};

	return (
		<Box p={3}>
			<Box>
				{CYBER_LIST.map((cyber) => {
					return (
						<Box key={cyber}>
							<Box
								sx={{
									display: "flex",
									padding: "12px 16px",
									minHeight: "48px",
									border: "1px solid rgba(0, 0, 0, .125)",
									backgroundColor: "rgba(0, 0, 0, .03)",
								}}
							>
								<Typography variant="subtitle1">{cyber}</Typography>
							</Box>
							<List>
								{gamesByCyber(cyber).map((match) => {
									return (
										<ListItem key={match.eventId} sx={{ minWidth: "1300px" }}>
											<span>{match.cyber}</span>
											<span>{match.champ}</span>
										</ListItem>
									);
								})}
							</List>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default ActiveGamesList;
