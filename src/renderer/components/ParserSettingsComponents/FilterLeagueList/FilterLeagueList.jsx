import React from "react";
import PropTypes from "prop-types";

import { List, ListItem, IconButton, ListItemText } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const FilterLeagueList = ({ filterChampList, handleClickOpen, listStyle }) => {
	return (
		<List sx={{ ...listStyle, minWidth: "20%" }}>
			{filterChampList?.leagueNames?.map(({ league, _id }) => (
				<ListItem
					key={_id}
					disableGutters
					secondaryAction={
						<IconButton id={_id} onClick={(e) => handleClickOpen(e)}>
							<DeleteIcon />
						</IconButton>
					}
					sx={{
						paddingTop: 1,
						paddingRight: 2,
						paddingBottom: 1,
						paddingLeft: 2,
					}}
				>
					<ListItemText primary={league} />
				</ListItem>
			))}
		</List>
	);
};

FilterLeagueList.propTypes = {
	filterChampList: PropTypes.object,
	handleClickOpen: PropTypes.func,
	listStyle: PropTypes.object,
};

export default FilterLeagueList;
