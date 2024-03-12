import * as React from "react";
import PropTypes from "prop-types";
import "./styles.css";

import { Box, Typography, Tooltip, Divider, ListItem } from "@mui/material";

import ListItemButtons from "./ListItemButtons.jsx";

const ListItemNoBets = ({ match, openBrowser, hideMatch }) => {
	return (
		<ListItem disablePadding className="active-list__item">
			<Box className="active-list__row">
				<Typography variant="span" width={80}>
					{match.deviation}
				</Typography>
				<Typography variant="span" width={50}></Typography>
				<Typography variant="span" width={130} overflow={"hidden"}>
					{match.champ}
				</Typography>
				<Typography variant="span" width={140}>
					{match.teamHome}
				</Typography>
				<Typography variant="span" width={140}>
					{match.teamAway}
				</Typography>
				<Typography variant="span" width={80}>
					{match.kickOFF}
				</Typography>
				<Typography variant="span" width={70}>
					{match.temp}
				</Typography>
				<Typography variant="span" width={80}>
					{match.attackKEF}
				</Typography>
				<Typography variant="span" width={80}>
					{match.calcTemp}
				</Typography>
				<Typography variant="span" width={80}>
					<Tooltip
						title={
							<Box display={"flex"} width={110} height={30}>
								<Typography
									variant="span"
									className="active-list__bet-limit-odds"
								>
									{match?.overOd ?? "-"}
								</Typography>
								<Divider
									orientation="vertical"
									sx={{ background: "#fff", margin: "0 5px" }}
								/>
								<Typography
									variant="span"
									className="active-list__bet-limit-odds"
								>
									{match?.underOd ?? "-"}
								</Typography>
							</Box>
						}
					>
						<Typography>{match.total2ndHALF}</Typography>
					</Tooltip>
				</Typography>
				<Typography variant="span" width={80}>
					<Typography>{match.totalInMoment}</Typography>
				</Typography>
				<Typography variant="span" width={80}>
					{match.predict}
				</Typography>
				<ListItemButtons
					matchId={match?.eventId ? match?.eventId : match?.url}
					matchUrl={match.url}
					openBrowser={openBrowser}
					hideMatch={hideMatch}
				/>
			</Box>
		</ListItem>
	);
};

ListItemNoBets.propTypes = {
	match: PropTypes.object.isRequired,
	openBrowser: PropTypes.func.isRequired,
	hideMatch: PropTypes.func.isRequired,
};
export default ListItemNoBets;
