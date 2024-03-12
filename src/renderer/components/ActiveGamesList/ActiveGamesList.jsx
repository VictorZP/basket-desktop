import * as React from "react";
import PropTypes from "prop-types";

const { shell } = window.require("electron");

import { Box, Typography, List } from "@mui/material";

import { ListItemWithBets, ListItemNoBets } from "../../ui/activeGames";

import { CYBER_LIST } from "../../constants/cyberList.js";

const ActiveGamesList = ({ matches, hideMatch, isBets }) => {
	const gamesByCyber = (cyber) => {
		return matches?.filter((item) => {
			return item?.cyber === cyber;
		});
	};

	const openBrowser = (url) => {
		shell.openExternal(url);
	};

	return (
		<Box p={3}>
			<Box position={"relative"} overflow={"auto"} width={"1200px"}>
				{CYBER_LIST.map((cyber) => {
					return (
						<Box key={cyber}>
							<Box
								display={"flex"}
								justifyContent={"space-between"}
								alignItems={"center"}
								padding={"12px"}
								border={"1px solid rgba(0, 0, 0, .125)"}
							>
								<Typography variant="subtitle1">{cyber}</Typography>
							</Box>
							<List disablePadding>
								{gamesByCyber(cyber).map((match) => {
									return isBets === true ? (
										<ListItemWithBets
											key={match?.eventId ? match?.eventId : match?.url}
											match={match}
											openBrowser={openBrowser}
											hideMatch={hideMatch}
										/>
									) : (
										<ListItemNoBets
											key={match?.eventId ? match?.eventId : match?.url}
											match={match}
											openBrowser={openBrowser}
											hideMatch={hideMatch}
										/>
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

ActiveGamesList.propTypes = {
	matches: PropTypes.array,
	hideMatch: PropTypes.func,
	isBets: PropTypes.bool.isRequired,
};

export default ActiveGamesList;
