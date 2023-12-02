import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

import { createXlsxDoc } from "../../../helpers/functions/parcer/createXlsxDoc.js";
import { createWarningFile } from "../../../helpers/functions/parcer/createWarningFile.js";

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

			console.log(arg?.data);

			// const successResponse = arg?.data
			// 	.filter((item) => {
			// 		return item.status === "ok";
			// 	})
			// 	?.sort((a, b) => {
			// 		const champA = a.championship.toLowerCase();
			// 		const champB = b.championship.toLowerCase();

			// 		if (champA < champB) {
			// 			return -1;
			// 		}
			// 		if (champA > champB) {
			// 			return 1;
			// 		}

			// 		return 0;
			// 	});
			// const warningResponse = arg?.data.filter((item) => {
			// 	return item.status !== "ok";
			// });

			// try {
			// 	if (successResponse?.length > 0) {
			// 		await createXlsxDoc(successResponse);
			// 	}
			// 	if (warningResponse?.length > 0) {
			// 		await createWarningFile(warningResponse);
			// 	}
			// } catch (err) {
			// 	enqueueSnackbar(
			// 		arg?.message ?? `${TEXT.ERR_ANALYZE_CREATE_DOC} ${err?.message}`,
			// 		{
			// 			variant: "error",
			// 		}
			// 	);
			// 	setIsLoading(false);
			// 	return;
			// }

			enqueueSnackbar(arg?.message ?? TEXT.SUCCESS, {
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
				startIcon={<FileDownloadIcon />}
				onClick={onAnalyzeClick}
			>
				{TEXT.BTN}
			</LoadingButton>
		</Box>
	);
};

export default Parser;
