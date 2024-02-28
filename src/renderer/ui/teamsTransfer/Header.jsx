import React from "react";
import { useDispatch } from "react-redux";

import { AppBar, Toolbar, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ModalHandler from "../../helpers/classes/modal.js";

import { TEXT } from "../../constants/teamsTransferConstants.js";

const Header = () => {
	const dispatch = useDispatch();

	const closeModal = () => {
		ModalHandler.closeModal(dispatch);
	};
	return (
		<AppBar position="static">
			<Toolbar size="large" edge="start" color="inherit">
				<Button
					variant="text"
					color="inherit"
					startIcon={<ArrowBackIcon />}
					onClick={closeModal}
				>
					{TEXT.BACK_BTN}
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
