import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Box, Typography, Button } from "@mui/material";

import ModalHandler from "../../helpers/classes/modal.js";

import { MODAL_TYPES } from "../../constants/modalTypes.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

const MSTeamNameForm = () => {
	const dispatch = useDispatch();

	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	const openModal = (e) => {
		const btnId = e?.currentTarget?.id;

		switch (btnId) {
			case MODAL_TYPES.TEAM_ADD:
				ModalHandler.openModal(dispatch, MODAL_TYPES.TEAM_ADD);
				break;
			case MODAL_TYPES.TRANSFER_TEAMS:
				ModalHandler.openModal(dispatch, MODAL_TYPES.TRANSFER_TEAMS);
				break;

			default:
				break;
		}
	};

	return (
		<Box sx={{ display: "grid", paddingX: 3, pt: 1, pb: 2, rowGap: 2 }}>
			<Typography variant="h5">{TEAM_NAMES_FORM.TITLE}</Typography>
			<Box display="flex" gap={3}>
				<Button
					id={MODAL_TYPES.TEAM_ADD}
					variant="contained"
					onClick={openModal}
				>
					{TEAM_NAMES_FORM.TEAM_ADD}
				</Button>
				<Button
					id={MODAL_TYPES.TRANSFER_TEAMS}
					variant="contained"
					onClick={openModal}
				>
					{TEAM_NAMES_FORM.TEAMS_TRANSFER}
				</Button>
			</Box>
		</Box>
	);
};

MSTeamNameForm.propTypes = {
	cyberList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default MSTeamNameForm;
