import React from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";
import { MuiFileInput } from "mui-file-input";

const AddFileForm = ({ text, fileCommon, fileUsa, tempFile, onFileAdd }) => {
	return (
		<Box>
			<MuiFileInput
				id={text.ID.FILE_COMMON}
				placeholder={text.PLACEHOLDER_HALVES_COMMON}
				value={fileCommon}
				onChange={(file) => onFileAdd(file, text.ID.FILE_COMMON)}
				size="small"
				sx={{ mb: 1, width: "280px" }}
			/>
			<MuiFileInput
				id={text.ID.FILE_USA}
				placeholder={text.PLACEHOLDER_HALVES_USA}
				value={fileUsa}
				onChange={(file) => onFileAdd(file, text.ID.FILE_USA)}
				size="small"
				sx={{ mb: 1, width: "280px" }}
			/>
			<MuiFileInput
				id={text.ID.TEMP}
				placeholder={text.TEMP_FILE_PLACEHOLDER}
				value={tempFile}
				onChange={(file) => onFileAdd(file, text.ID.TEMP)}
				size="small"
				sx={{ mb: 1, width: "280px" }}
			/>
		</Box>
	);
};

AddFileForm.propTypes = {
	text: PropTypes.object.isRequired,
	file: PropTypes.object,
	tempFile: PropTypes.object,
	onFileAdd: PropTypes.func.isRequired,
};

export default AddFileForm;
