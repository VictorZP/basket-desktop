import React from "react";
import PropTypes from "prop-types";

import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Checkbox,
	Card,
	CardHeader,
	Divider,
	TextField,
} from "@mui/material";

const TeamList = (
	items,
	checked,
	searchIdType,
	handleClick,
	handleSearch,
	champId
) => {
	const checkedIds = checked.map((team) => team.teamId);

	return (
		<Card sx={{ width: 300, height: 450, overflow: "auto" }}>
			<CardHeader
				sx={{ px: 2, py: 1, width: "100%" }}
				avatar={
					<TextField
						key={champId}
						id={`${searchIdType}-search`}
						name={`${searchIdType}-search`}
						label={"Поиск"}
						size="small"
						onChange={(e) => handleSearch(e, searchIdType)}
						sx={{ width: "100%" }}
					/>
				}
			/>
			<Divider />
			<List dense component="div" role="list">
				{items.map((team) => {
					return (
						<ListItemButton
							key={team.teamId}
							role="listitem"
							onClick={handleClick(team)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checkedIds.indexOf(team.teamId) !== -1}
									tabIndex={-1}
									disableRipple
								/>
							</ListItemIcon>
							<ListItemText id={team.teamId} primary={team.teamName} />
						</ListItemButton>
					);
				})}
			</List>
		</Card>
	);
};

TeamList.propTypes = {
	items: PropTypes.array.isRequired,
	checked: PropTypes.array.isRequired,
	searchIdType: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
	handleSearch: PropTypes.func.isRequired,
	champId: PropTypes.string,
};

export default TeamList;
