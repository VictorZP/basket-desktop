import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Box, Typography, Divider } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import { InputComponent } from "../../../ui/settingsPage";
import {
	useGetHalvesFilesNames,
	useGetCyberFileName,
} from "../../../hooks/settingsPageHooks";

import { STATUS, SETTINGS_PAGE, CHANNELS } from "../../../../common/constants";
import { SETTINGS_TEXT, CYBER_LIST } from "../../../constants";

const FilesSettings = () => {
	const [halvesFileName, setHalvesFileName] = useState({
		commonHalvesFile: "",
		usaHalvesFile: "",
	});
	const [cyberFileNames, setCyberFileNames] = useState(
		CYBER_LIST.reduce((obj, item) => ({ ...obj, [item]: "" }), {})
	);
	const { COMPONENTS_IDS } = SETTINGS_PAGE;
	const { FILENAMES } = SETTINGS_TEXT;

	useGetHalvesFilesNames(setHalvesFileName);
	useGetCyberFileName(setCyberFileNames);

	const stateUpdateFunctions = {
		[COMPONENTS_IDS.COMMON_HALVES]: {
			func: setHalvesFileName,
			key: "commonHalvesFile",
		},
		[COMPONENTS_IDS.USA_HALVES]: {
			func: setHalvesFileName,
			key: "usaHalvesFile",
		},
		...CYBER_LIST.map((item, index) => ({
			[item.replaceAll(" ", "-")]: {
				func: setCyberFileNames,
				key: Object.keys(cyberFileNames)[index],
			},
		})).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
	};

	const handleInputValueChange = (e) => {
		const { id, value } = e.target;

		if (stateUpdateFunctions[id]) {
			const { func, key } = stateUpdateFunctions[id];
			func((prev) => ({ ...prev, [key]: value }));
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
				case CYBER_LIST.at(0).replaceAll(" ", "-"):
				case CYBER_LIST.at(1).replaceAll(" ", "-"):
				case CYBER_LIST.at(2).replaceAll(" ", "-"):
				case CYBER_LIST.at(3).replaceAll(" ", "-"):
				case CYBER_LIST.at(4).replaceAll(" ", "-"):
				case CYBER_LIST.at(5).replaceAll(" ", "-"):
				case CYBER_LIST.at(6).replaceAll(" ", "-"):
				case CYBER_LIST.at(7).replaceAll(" ", "-"):
				case CYBER_LIST.at(8).replaceAll(" ", "-"):
					setFileNameResponse = await ipcRenderer.invoke(
						CHANNELS.SETTINGS.SET_CYBER_FILE_NAME,
						{
							id,
							filesNamesObj: cyberFileNames,
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
			<Typography variant="subtitle1" md={1}>
				{FILENAMES.CYBER_TITLE}
			</Typography>
			<Box display="grid" gap={1} mb={1}>
				{CYBER_LIST.map((cyber) => (
					<InputComponent
						label={cyber}
						inputValue={cyberFileNames[cyber]}
						id={cyber.replaceAll(" ", "-")}
						handleInputValueChange={handleInputValueChange}
						handleBtnClick={handleBtnClick}
						key={cyber}
					/>
				))}
			</Box>
		</Box>
	);
};

export default FilesSettings;
