import React from "react";
import PropTypes from "prop-types";

import { Box, Button, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const ButtonStack = ({ saveText, closeText, isDisabled, handleClick }) => {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			gap={2}
			pt={2}
			pb={2}
		>
			<Stack direction="row" spacing={3}>
				<LoadingButton
					name="save_btn"
					loading={false}
					variant="contained"
					startIcon={<SaveIcon />}
					onClick={handleClick}
					disabled={isDisabled}
				>
					{saveText}
				</LoadingButton>
				<Button name="close_btn" variant="outlined" onClick={handleClick}>
					{closeText}
				</Button>
			</Stack>
		</Box>
	);
};

ButtonStack.propTypes = {
	saveText: PropTypes.string.isRequired,
	closeText: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
};

export default ButtonStack;
