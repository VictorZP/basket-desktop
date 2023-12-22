import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

const Parser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const onAnalyzeClick = async () => {
		try {
			ipcRenderer.send(CHANNELS.PARSER.ANALYZE);
			setIsLoading(true);
		} catch (err) {
			enqueueSnackbar(err.message, {
				variant: "error",
			});
		}
	};

	useEffect(() => {
		ipcRenderer.on(CHANNELS.PARSER.ANALYZE, async (event, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(arg?.message ?? TEXT.ERR_ANALYZE, {
					variant: "error",
				});
				setIsLoading(false);
				return;
			}

			enqueueSnackbar(arg?.data?.message ?? TEXT.SUCCESS, {
				variant: "success",
			});
			setIsLoading(false);
		});
	}, []);

	return (
		<Box sx={{ px: 3, py: 1, mb: 2 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>
				{TEXT.TITLE}
			</Typography>
			<LoadingButton
				loading={isLoading}
				loadingPosition="start"
				startIcon={<ListAltIcon />}
				onClick={onAnalyzeClick}
			>
				{TEXT.BTN}
			</LoadingButton>
		</Box>
	);
};

export default Parser;
