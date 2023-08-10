import React from "react";
import PropTypes from "prop-types";

import { List, ListItem, IconButton, ListItemText } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { BTN_NAME } from "../../../constants/parcer.js";

const FilterLeagueList = ({ filterChampList, openModalDel, listStyle }) => {
	return (
		<List sx={{ ...listStyle, minWidth: "20%" }}>
			{filterChampList?.map(({ id, champName }) => (
				<ListItem
					key={id}
					disableGutters
					secondaryAction={
						<IconButton
							id={`${BTN_NAME.DEL_CHAMP}_${id}`}
							name={BTN_NAME.DEL_CHAMP}
							onClick={openModalDel}
						>
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
	openModalDel: PropTypes.func,
	listStyle: PropTypes.object,
};

export default FilterLeagueList;
