import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
	getMDPageType,
	getMDDescriptionExtend,
	isMDOpen,
} from "../../redux/modalDelete/modalDelSelector.js";
import { MODAL_DEL } from "../../constants/modaldel.js";

const DelModal = ({ handleClose, handleDelete }) => {
	const isOpen = useSelector(isMDOpen);
	const pType = useSelector(getMDPageType);
	const descExtend = useSelector(getMDDescriptionExtend);

	const setDescription = (pType) => {
		let descriptionText = "";
		switch (pType) {
			case MODAL_DEL.PAGE_TYPE_C:
			case MODAL_DEL.PAGE_TYPE_PARCER_URL:
			case MODAL_DEL.PAGE_TYPE_FILTER_CHAMP:
			case MODAL_DEL.PAGE_TYPE_PARCER_DATA:
			case MODAL_DEL.PAGE_TYPE_LINES_DATA:
			case MODAL_DEL.PAGE_TYPE_HALVES_STATISTICS_DATA:
			case MODAL_DEL.PAGE_TYPE_MATCHES:
			case MODAL_DEL.PAGE_TYPE_RESULTS_BY_SEASON:
				descriptionText = `${MODAL_DEL.CONFIRM_TEXT} ${descExtend}? `;
				break;
			case MODAL_DEL.PAGE_TYPE_CHAMP:
				descriptionText = `${MODAL_DEL.CONFIRM_TEXT} ${descExtend?.championshipName}? ${MODAL_DEL.CHAMP_TEXT}`;
				break;
			case MODAL_DEL.PAGE_TYPE_TEAM_NAME:
				descriptionText = `${MODAL_DEL.CONFIRM_TEXT} ${descExtend}`;
				break;

			default:
				break;
		}
		return descriptionText;
	};

	let description = setDescription(pType);

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="del-modal-title"
			aria-describedby="del-modal-description"
		>
			<DialogTitle id="del-modal-title">{MODAL_DEL.TITLE}</DialogTitle>
			<DialogContent>
				<DialogContentText id="del-modal-description">
					{description}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDelete}>{MODAL_DEL.YES}</Button>
				<Button onClick={handleClose} autoFocus>
					{MODAL_DEL.NO}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DelModal.propTypes = {
	handleClose: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default DelModal;
