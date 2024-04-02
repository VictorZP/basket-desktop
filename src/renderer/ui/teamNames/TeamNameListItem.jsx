import React from "react";
import PropTypes from "prop-types";

import { ListItem } from "@mui/material";

const TeamNameListItem = ({ teamName }) => {
	return (
		<ListItem
			component="p"
			disablePadding
			sx={{
				fontSize: "14px",
				"&:not(:last-child)": { paddingBottom: 1 },
			}}
		>
			{teamName}
		</ListItem>
	);
};

TeamNameListItem.propTypes = {
	teamName: PropTypes.string.isRequired,
};

export default TeamNameListItem;
