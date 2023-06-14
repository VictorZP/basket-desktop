import React from "react";
import { useSelector } from "react-redux";

import { Dialog, DialogContent, DialogContentText } from "@mui/material";

import { getFileModalOpenStatus } from "../../redux/modal/modalSelector.js";

import { TEXT } from "./text.js";

const FileModal = () => {
	const isOpen = useSelector(getFileModalOpenStatus);

	return (
		<Dialog open={isOpen} aria-describedby="file-modal-description">
			<DialogContent>
				<DialogContentText id="file-modal-description">
					{TEXT.DESCRIPTION}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default FileModal;
