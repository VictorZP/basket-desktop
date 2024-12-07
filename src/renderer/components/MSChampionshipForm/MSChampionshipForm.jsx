import React from "react";
import { useDispatch } from "react-redux";

import { Box, Typography, Button } from "@mui/material";

import ModalHandler from "../../helpers/classes/modal.js";

import { MODAL_TYPES } from "../../constants/modalTypes.js";
import { MATCHES_SETTINGS } from "../../../common/constants";

const MSChampionshipForm = () => {
	const dispatch = useDispatch();
	const { CHAMPIONSHIP_FORM } = MATCHES_SETTINGS;

	const openModal = () => {
		ModalHandler.openModal(dispatch, MODAL_TYPES.CHAMPIONSHIP_ADD);
	};

	return (
		<Box sx={{ display: "grid", paddingX: 3, pt: 1, pb: 2, rowGap: 2 }}>
			<Typography variant="h5">{CHAMPIONSHIP_FORM.TITLE}</Typography>
			<Box>
				<Button
					id={MODAL_TYPES.CHAMPIONSHIP_ADD}
					variant="contained"
					onClick={openModal}
				>
					{CHAMPIONSHIP_FORM.BTN_ADD}
				</Button>
			</Box>
		</Box>
	);
};

export default MSChampionshipForm;
