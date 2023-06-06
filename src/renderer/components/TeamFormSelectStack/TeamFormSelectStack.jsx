import React from "react";
import PropTypes from "prop-types";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CONSTANTS } from "../MSTeamNameForm/constants.js";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 15;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

const TeamFormSelectStack = ({
	cyberName,
	champValue,
	cyberOptions,
	champOptions,
	handleChange,
}) => {
	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(2, minmax(150px, 210px))",
				columnGap: "10px",
				alignItems: "center",
				padding: "10px 0px",
			}}
		>
			<FormControl required size="small">
				<InputLabel id={CONSTANTS.CYBER_SELECT_LABEL_ID}>
					{TEAM_NAMES_FORM.CYBER_LABEL}
				</InputLabel>
				<Select
					labelId={CONSTANTS.CYBER_SELECT_LABEL_ID}
					id={CONSTANTS.CYBER_SELECT_ID}
					label={TEAM_NAMES_FORM.CYBER_LABEL}
					value={cyberName}
					onChange={handleChange}
					name={CONSTANTS.CYBER_SELECT_NAME}
				>
					{cyberOptions?.map((opt) => {
						return (
							<MenuItem key={opt?.id} value={opt?.value}>
								{opt?.label}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<FormControl required size="small">
				<InputLabel id={CONSTANTS.CHAMP_SELECT_LABEL_ID}>
					{TEAM_NAMES_FORM.CHAMP_LABEL}
				</InputLabel>
				<Select
					labelId={CONSTANTS.CHAMP_SELECT_LABEL_ID}
					id={CONSTANTS.CHAMP_SELECT_ID}
					label={TEAM_NAMES_FORM.CHAMP_LABEL}
					value={champValue}
					onChange={handleChange}
					name={CONSTANTS.CHAMP_SELECT_NAME}
					MenuProps={MenuProps}
					disabled={!cyberName}
				>
					{champOptions?.map((opt) => {
						return (
							<MenuItem key={opt?.id} value={opt?.value} sx={{}}>
								{opt?.label}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
};

TeamFormSelectStack.propTypes = {
	cyberName: PropTypes.string,
	champValue: PropTypes.string,
	cyberOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
	champOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
	handleChange: PropTypes.func.isRequired,
};

export default TeamFormSelectStack;
