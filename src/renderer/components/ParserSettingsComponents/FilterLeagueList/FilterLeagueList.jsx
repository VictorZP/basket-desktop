import React from "react";
import PropTypes from "prop-types";

import { List, ListItem, IconButton, ListItemText } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const FilterLeagueList = ({ filterChampList, handleClickOpen, listStyle }) => {
	return (
		<List sx={{ ...listStyle, minWidth: "20%" }}>
			{filterChampList?.map(({ id, champName }) => (
				<ListItem
					key={id}
					disableGutters
					secondaryAction={
						<IconButton id={id} onClick={(e) => handleClickOpen(e)}>
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
					<ListItemText primary={champName} />
				</ListItem>
			))}
		</List>
	);
};

FilterLeagueList.propTypes = {
	filterChampList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
	handleClickOpen: PropTypes.func,
	listStyle: PropTypes.object,
};

export default FilterLeagueList;
