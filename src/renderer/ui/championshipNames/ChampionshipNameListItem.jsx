import React from "react";
import PropTypes from "prop-types";

import { ListItem } from "@mui/material";

const ChampionshipNameListItem = ({ champName }) => {
	return (
		<ListItem
			component="p"
			disablePadding
			sx={{
				fontSize: "14px",
				"&:not(:last-child)": { paddingBottom: 1 },
			}}
		>
			{champName}
		</ListItem>
	);
};

ChampionshipNameListItem.propTypes = {
	champName: PropTypes.string.isRequired,
};

export default ChampionshipNameListItem;
