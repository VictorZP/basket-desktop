import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const IconBtn = ({ onClearBtn, isDisabled }) => {
	return (
		<IconButton
			size="small"
			sx={{ width: 35 }}
			color="error"
			disabled={isDisabled}
			onClick={onClearBtn}
		>
			<ClearIcon />
		</IconButton>
	);
};

IconBtn.propTypes = {
	onClearBtn: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
};

export default IconBtn;
