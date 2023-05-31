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
import { MODAL_DEL } from "../../../common/constants/index.js";

const DelModal = ({ handleClose, handleDelete }) => {
	const isOpen = useSelector(isMDOpen);
	const pType = useSelector(getMDPageType);
	const descExtend = useSelector(getMDDescriptionExtend);

	const setDescription = (pType) => {
		let descriptionText = "";
		switch (pType) {
			case MODAL_DEL.PAGE_TYPE_C:
				descriptionText = `${MODAL_DEL.CONFIRM_TEXT} ${descExtend}? `;
				break;
			case MODAL_DEL.PAGE_TYPE_CHAMP:
				descriptionText = `${MODAL_DEL.CONFIRM_TEXT} ${descExtend?.championshipName}? `;
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
