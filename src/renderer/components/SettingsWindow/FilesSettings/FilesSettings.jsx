import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Box, Typography, Divider } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import { InputComponent } from "../../../ui/settingsPage";
import { useGetHalvesFilesNames } from "../../../hooks/settingsPageHooks";

import { STATUS, SETTINGS_PAGE, CHANNELS } from "../../../../common/constants";
import { SETTINGS_TEXT } from "../../../constants/settingsWindow";

const FilesSettings = () => {
	const [halvesFileName, setHalvesFileName] = useState({
		commonHalvesFile: "",
		usaHalvesFile: "",
	});
	const { COMPONENTS_IDS } = SETTINGS_PAGE;
	const { FILENAMES } = SETTINGS_TEXT;

	useGetHalvesFilesNames(setHalvesFileName);

	const handleInputValueChange = (e) => {
		const { id, value } = e.target;

		switch (id) {
			case COMPONENTS_IDS.COMMON_HALVES:
				setHalvesFileName((prev) => ({ ...prev, commonHalvesFile: value }));
				break;
			case COMPONENTS_IDS.USA_HALVES:
				setHalvesFileName((prev) => ({ ...prev, usaHalvesFile: value }));
				break;

			default:
				break;
		}
	};

	const handleBtnClick = async (e) => {
		e.preventDefault();
		try {
			const id = e.target.id.split("-btn")?.at(0);
			let setFileNameResponse = "";

			switch (id) {
				case COMPONENTS_IDS.COMMON_HALVES:
				case COMPONENTS_IDS.USA_HALVES:
					setFileNameResponse = await ipcRenderer.invoke(
						CHANNELS.SETTINGS.SET_FILES_NAMES,
						{
							id,
							filesNamesObj: halvesFileName,
						}
					);
					break;

				default:
					break;
			}
			if (setFileNameResponse.status === STATUS.ERROR) {
				throw new Error(setFileNameResponse.message);
			}

			if (setFileNameResponse.status === STATUS.SUCCESS) {
				enqueueSnackbar(FILENAMES.FILENAME_SET_SUCCESS, {
					variant: STATUS.SUCCESS,
				});
			}
		} catch (err) {
			enqueueSnackbar(err?.message, { variant: STATUS.ERROR });
		}
	};

	return (
		<Box px={2}>
			<Typography variant="h6" mb={1}>
				{FILENAMES.TITLE}
			</Typography>
			<Typography variant="subtitle1" mb={1}>
				{FILENAMES.HALVES_TITLE}
			</Typography>
			<Box display="grid" gap={1} mb={1}>
				<InputComponent
					label={FILENAMES.LABELS.HALVES_COMMON}
					inputValue={halvesFileName.commonHalvesFile}
					id={COMPONENTS_IDS.COMMON_HALVES}
					handleInputValueChange={handleInputValueChange}
					handleBtnClick={handleBtnClick}
				/>
				<InputComponent
					label={FILENAMES.LABELS.HALVES_USA}
					inputValue={halvesFileName.usaHalvesFile}
					id={COMPONENTS_IDS.USA_HALVES}
					handleInputValueChange={handleInputValueChange}
					handleBtnClick={handleBtnClick}
				/>
			</Box>
			<Divider />
		</Box>
	);
};

export default FilesSettings;
