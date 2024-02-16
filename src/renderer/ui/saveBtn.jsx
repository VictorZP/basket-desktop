import React from "react";
import PropTypes from "prop-types";

import LoadingButton from "@mui/lab/LoadingButton";

import { MATCHES_SETTINGS } from "../../common/constants/index.js";

const SaveBtn = ({ champ, isLoading, onEdit }) => {
	const { BUTTON } = MATCHES_SETTINGS;
	return (
		<LoadingButton
			type="submit"
			loading={isLoading}
			variant="outlined"
			disabled={!champ?.cyberId || !champ?.championshipName}
		>
			{!onEdit ? BUTTON.ADD : BUTTON.EDIT}
		</LoadingButton>
	);
};

SaveBtn.propTypes = {
	champ: PropTypes.object,
	isLoading: PropTypes.bool,
	onEdit: PropTypes.bool,
};

export default SaveBtn;
