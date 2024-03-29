import React from "react";
import { FormControl, TextField } from "@mui/material";
import PropTypes from "prop-types";

const NameTextField = ({
	name,
	label,
	value,
	onChange,
	disabled,
	required = false,
}) => {
	return (
		<FormControl>
			<TextField
				required={required}
				name={name}
				label={label}
				value={value}
				variant="outlined"
				size="small"
				onChange={onChange}
				disabled={disabled}
				sx={{ maxWidth: "210px", min: "150px" }}
			/>
		</FormControl>
	);
};

NameTextField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	required: PropTypes.bool,
};

export default NameTextField;
