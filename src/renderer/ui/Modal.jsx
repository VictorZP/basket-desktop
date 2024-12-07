import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal as MuiModal, Box } from "@mui/material";

import ChampionshipModal from "../components/ChampionshipModal";
import TransferModal from "../components/TransferModal";
import TeamModal from "../components/TeamModal";

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
		ModalHandler.closeModal(dispatch, type);
	};

	return (
		<MuiModal
			open={
				isOpen &&
				(type === MODAL_TYPES.CHAMPIONSHIP_ADD ||
					type === MODAL_TYPES.TRANSFER_TEAMS ||
					type === MODAL_TYPES.TEAM_ADD)
			}
			onClose={handleClose}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflowY: "auto",
			}}
		>
			<Box sx={{ width: "100%", height: "100%" }}>
				{type === MODAL_TYPES.TEAM_ADD && <TeamModal />}
				{type === MODAL_TYPES.TRANSFER_TEAMS && <TransferModal />}
				{type === MODAL_TYPES.CHAMPIONSHIP_ADD && <ChampionshipModal />}
			</Box>
		</MuiModal>
	);
};

export default Modal;
