import React from "react";
import PropTypes from "prop-types";

import { List, ListItemButton, ListItemText } from "@mui/material";

import { FILTER_LIST } from "../filterList.js";

const FilterLeagueComponent = ({
	selectedIndex,
	handleListItemClick,
	type,
	listStyle,
}) => {
	return (
		<List sx={listStyle}>
			{FILTER_LIST[type]?.map((item, index) => (
				<ListItemButton
					key={item}
					selected={selectedIndex === index + 1}
					onClick={() => handleListItemClick(index + 1, type)}
				>
					<ListItemText primary={item} />
				</ListItemButton>
			))}
		</List>
	);
};

FilterLeagueComponent.propTypes = {
	selectedIndex: PropTypes.number,
	handleListItemClick: PropTypes.func,
	type: PropTypes.string,
	listStyle: PropTypes.object,
};

export default FilterLeagueComponent;
