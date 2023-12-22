import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import LoadingButton from "@mui/lab/LoadingButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import fileFilter from "../../../helpers/functions/parcer/fileFilter.js";

import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

const Filter = () => {
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onFileAdd = (newFile) => {
		setFile(newFile);
	};

	const handleFilter = async () => {
		try {
			setIsLoading((prev) => !prev);
			const filterData = await ipcRenderer.invoke(CHANNELS.PARSER.FILTER_LIST);

			const data = await file.arrayBuffer();
			await fileFilter(data, filterData?.list);
			setIsLoading((prev) => !prev);
		} catch (error) {
			enqueueSnackbar(error.message, {
				variant: "error",
			});
			setIsLoading(false);
			return;
		}
	};

	return (
		<Box sx={{ px: 3, pt: 1, pb: 4 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>
				{TEXT.TITLE}
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<MuiFileInput
					id="filterFile"
					placeholder={TEXT.PLACEHOLDER}
					value={file}
					onChange={onFileAdd}
					size="small"
					sx={{ width: "280px", mr: 3 }}
				/>
				<LoadingButton
					type="button"
					loadingPosition="start"
					startIcon={<FileDownloadIcon />}
					disabled={!file}
					loading={isLoading}
					onClick={handleFilter}
					sx={{ width: "160px" }}
				>
					{TEXT.BTN}
				</LoadingButton>
			</Box>
		</Box>
	);
};

export default Filter;
