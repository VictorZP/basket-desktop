import React from "react";
import { useSnackbar } from "notistack";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const DismissAction = ({ id }) => {
	const { closeSnackbar } = useSnackbar();
	return (
		<>
			<IconButton
				aria-label="close"
				onClick={() => closeSnackbar(id)}
				sx={{ color: "white" }}
			>
				<CloseIcon color="inherit" />
			</IconButton>
		</>
	);
};

export default DismissAction;
