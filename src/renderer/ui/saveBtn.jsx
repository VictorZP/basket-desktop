import React from "react";
import PropTypes from "prop-types";

import LoadingButton from "@mui/lab/LoadingButton";

import { MATCHES_SETTINGS } from "../../common/constants/index.js";

const SaveBtn = ({ isDisabled, isLoading, onEdit }) => {
	const { BUTTON } = MATCHES_SETTINGS;
	return (
		<LoadingButton
			type="submit"
			loading={isLoading}
			variant="outlined"
			disabled={isDisabled}
		>
			{!onEdit ? BUTTON.ADD : BUTTON.EDIT}
		</LoadingButton>
	);
};

SaveBtn.propTypes = {
	isDisabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	onEdit: PropTypes.bool.isRequired,
};

export default SaveBtn;
