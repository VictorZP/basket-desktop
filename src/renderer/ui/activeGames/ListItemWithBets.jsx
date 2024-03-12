import * as React from "react";
import PropTypes from "prop-types";
import "./styles.css";

import { Box, Typography, Tooltip, Divider, ListItem } from "@mui/material";

import ListItemButtons from "./ListItemButtons.jsx";

const ListItemWithBets = ({ match, openBrowser, hideMatch }) => {
	return (
		<ListItem
			disablePadding
			className={`active-list__item ${
				match.difRes === "less"
					? "active-list__item-less"
					: "active-list__item-more"
			}`}
		>
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
					{match.total2ndHALF}
				</Typography>
				<Typography variant="span" width={80}>
					<Tooltip
						title={
							<Box display={"flex"} flexDirection={"column"}>
								<Box display={"flex"} width={100} height={30}>
									<Typography
										variant="span"
										className="active-list__bet-limit-odds"
									>
										{match?.overOd ?? "-"}
									</Typography>
									<Divider orientation="vertical" sx={{ background: "#fff" }} />
									<Typography
										variant="span"
										className="active-list__bet-limit-odds"
									>
										{match?.underOd ?? "-"}
									</Typography>
								</Box>
								<Divider sx={{ background: "#fff" }} />
								<Box
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
									py={1}
								>
									<Typography variant="span" display={"block"} fontSize={14}>
										{match?.betLimit ?? "-"}
									</Typography>
								</Box>
							</Box>
						}
					>
						<Typography>{match.totalInMoment}</Typography>
					</Tooltip>
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

ListItemWithBets.propTypes = {
	match: PropTypes.object,
	openBrowser: PropTypes.func,
	hideMatch: PropTypes.func,
};

export default ListItemWithBets;
