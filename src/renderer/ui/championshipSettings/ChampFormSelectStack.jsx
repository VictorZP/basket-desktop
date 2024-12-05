import React from "react";
import PropTypes from "prop-types";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CONSTANTS } from "../../constants/champNameFormConstants.js";
import { STYLES } from "./style.js";

const ChampFormSelectStack = ({
	cyberId,
	cyberOptions,
	pageType,
	handleChange,
}) => {
	const { CHAMPIONSHIP_FORM } = MATCHES_SETTINGS;
	return (
		<Box sx={STYLES[pageType]}>
			<FormControl required size="small">
				<InputLabel id={CONSTANTS.CYBER_SELECT_LABEL_ID}>
					{CHAMPIONSHIP_FORM.CYBER_LABEL}
				</InputLabel>
				<Select
					labelId={CONSTANTS.CYBER_SELECT_LABEL_ID}
					id={CONSTANTS.CYBER_SELECT_ID}
					label={CHAMPIONSHIP_FORM.CYBER_LABEL}
					value={cyberId ?? ""}
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
		</Box>
	);
};

ChampFormSelectStack.propTypes = {
	cyberId: PropTypes.string.isRequired,
	pageType: PropTypes.string.isRequired,
	cyberOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
	handleChange: PropTypes.func.isRequired,
};

export default ChampFormSelectStack;
