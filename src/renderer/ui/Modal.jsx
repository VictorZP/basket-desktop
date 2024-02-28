import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal as MuiModal, Box } from "@mui/material";

import TransferModal from "../components/TransferModal";
import {
	getModalType,
	getModalOpenStatus,
} from "../redux/modal/modalSelector.js";
import ModalHandler from "../helpers/classes/modal.js";

import { MODAL_TYPES } from "../constants/modalTypes.js";

const Modal = () => {
	const dispatch = useDispatch();
	const type = useSelector(getModalType);
	const isOpen = useSelector(getModalOpenStatus);

	const handleClose = () => {
		ModalHandler.closeModal(dispatch);
	};

	return (
		<MuiModal
			open={isOpen && type === MODAL_TYPES.TEAMS_NAMES}
			onClose={handleClose}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflowY: "auto",
			}}
		>
			<Box sx={{ width: "100%", height: "100%" }}>
				{type === MODAL_TYPES.TEAMS_NAMES && <TransferModal />}
			</Box>
		</MuiModal>
	);
};

export default Modal;
