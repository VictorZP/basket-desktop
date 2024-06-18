import React from "react";
import PropTypes from "prop-types";

import { TextField, FormControl, Button, FormLabel } from "@mui/material";

import { SETTINGS_TEXT } from "../../constants";

const InputComponent = ({
	label,
	inputValue,
	id,
	handleInputValueChange,
	handleBtnClick,
}) => {
	return (
		<FormControl
			component={"form"}
			sx={{
				display: "grid",
				gap: 2,
				gridTemplateColumns: "80px 250px 110px",
				alignItems: "center",
			}}
		>
			<FormLabel htmlFor={id} sx={{ color: "#000" }}>
				{label}
			</FormLabel>
			<TextField
				size="small"
				variant="outlined"
				id={id}
				value={inputValue}
				onChange={handleInputValueChange}
			/>
			<Button
				variant="contained"
				color="primary"
				size="small"
				type="submit"
				onClick={handleBtnClick}
				id={`${id}-btn`}
			>
				{SETTINGS_TEXT.SET_BTN}
			</Button>
		</FormControl>
	);
};

InputComponent.propTypes = {
	label: PropTypes.string.isRequired,
	inputValue: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	handleInputValueChange: PropTypes.func.isRequired,
	handleBtnClick: PropTypes.func.isRequired,
};

export default InputComponent;
