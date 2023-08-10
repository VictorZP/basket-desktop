import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

const Filter = () => {
	return (
		<Box sx={{ px: 3, py: 1, mb: 2 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>
				{TEXT.TITLE}
			</Typography>
		</Box>
	);
};

export default Filter;
