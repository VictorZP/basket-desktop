import React from "react";
import { useDispatch } from "react-redux";

import { Box, Typography } from "@mui/material";

import ModalHandler from "../../helpers/classes/modal.js";

import { TeamFormSelectStack } from "../../ui/teamSettings/index.js";

const TransferModal = () => {
	const dispatch = useDispatch();

	return (
		<Box
			sx={{
				p: 4,
				width: "100%",
				background: "white",
				borderRadius: 2,
			}}
		>
			<Typography variant="h5" sx={{ mb: 2 }}>
				Исходный турнир
			</Typography>
			<TeamFormSelectStack />
		</Box>
	);
};

export default TransferModal;
