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
	Box,
} from "@mui/material";

import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";

const TeamList = (
	items,
	checked,
	searchIdType,
	disabledIds = [],
	handleClick,
	handleSearch,
	outChampId
) => {
	const checkedIds = checked.map((team) => team.teamId);

	return (
		<Card sx={{ width: 300, height: 450, overflow: "auto" }}>
			<CardHeader
				sx={{ px: 2, py: 1, width: "100%" }}
				avatar={
					searchIdType === TRANSFER_TYPE.OUT ? (
						<TextField
							key={outChampId}
							id={`${searchIdType}-search`}
							name={`${searchIdType}-search`}
							label={"Поиск"}
							size="small"
							onChange={handleSearch}
							sx={{ width: "100%" }}
						/>
					) : (
						<Box sx={{ height: "40px" }} />
					)
				}
			/>
			<Divider />
			<List dense component="div" role="list">
				{items.map((team) => {
					const isDisabled = disabledIds.find((id) => id === team.teamId)
						? true
						: false;

					return (
						<ListItemButton
							key={team.teamId}
							role="listitem"
							onClick={handleClick(team, isDisabled)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checkedIds.indexOf(team.teamId) !== -1}
									tabIndex={-1}
									disableRipple
									disabled={isDisabled}
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
	disabledIds: PropTypes.array,
	handleClick: PropTypes.func.isRequired,
	handleSearch: PropTypes.func.isRequired,
	outChampId: PropTypes.string,
};

export default TeamList;
