const ipcRenderer = window.require("electron").ipcRenderer;

import handleFile from "./handleFile";
import { handleHalvesForStatistics } from "../statistics";

import { CHANNELS, STATUS } from "../../../../common/constants";

const handleHalvesFile = async (type) => {
	let checkObj = {};
	let commonHalvesFileData;
	let usaHalvesFileData;

	try {
		const halvesFilesNamesResponse = await ipcRenderer.invoke(
			CHANNELS.SETTINGS.GET_HALVES_FILES_NAMES
		);

		if (halvesFilesNamesResponse.status === STATUS.ERROR) {
			throw new Error(halvesFilesNamesResponse.message);
		}

		const halvesFilesResponse = await ipcRenderer.invoke(
			CHANNELS.FILES.GET_HALVES,
			halvesFilesNamesResponse.filesNames
		);

		//  Check if the common halves file is in the OneDrive response.
		//  If it is, use the data from the response. If it is not, get the file from the system.
		if (
			halvesFilesResponse?.status === STATUS.SUCCESS &&
			halvesFilesResponse?.commonFileData
		) {
			commonHalvesFileData = halvesFilesResponse.commonFileData;
		} else {
			const commonHalvesFileFromSystemResult = await ipcRenderer.invoke(
				CHANNELS.FILES.GET_FILES_FROM_SYSTEM,
				halvesFilesNamesResponse.filesNames.commonHalvesFile
			);

			if (commonHalvesFileFromSystemResult.status === STATUS.ERROR) {
				throw new Error(commonHalvesFileFromSystemResult.message);
			}

			commonHalvesFileData = commonHalvesFileFromSystemResult.fileData;
		}

		// Check if the USA halves file is in the OneDrive response.
		// If it is, use the data from the response.If it is not, get the file from the system.
		if (
			halvesFilesResponse?.status === STATUS.SUCCESS &&
			halvesFilesResponse?.usaFileData
		) {
			usaHalvesFileData = halvesFilesResponse.usaFileData;
		} else {
			const usaHalvesFileFromSystemResult = await ipcRenderer.invoke(
				CHANNELS.FILES.GET_FILES_FROM_SYSTEM,
				halvesFilesNamesResponse.filesNames.usaHalvesFile
			);

			if (usaHalvesFileFromSystemResult.status === STATUS.ERROR) {
				throw new Error(usaHalvesFileFromSystemResult.message);
			}

			usaHalvesFileData = usaHalvesFileFromSystemResult.fileData;
		}

		// Handle the files for backend format
		// const commonHalvesFileHandlerResult = handleFile(commonHalvesFileData);
		// const usaHalvesFileHandlerResult = handleFile(usaHalvesFileData);
		let commonHalvesFileHandlerResult;
		let usaHalvesFileHandlerResult;

		if (type === "adding") {
			commonHalvesFileHandlerResult = handleFile(commonHalvesFileData);
			usaHalvesFileHandlerResult = handleFile(usaHalvesFileData);
		} else if (type === "statistics") {
			commonHalvesFileHandlerResult =
				handleHalvesForStatistics(commonHalvesFileData);
			usaHalvesFileHandlerResult = handleHalvesForStatistics(usaHalvesFileData);
		}

		if (commonHalvesFileHandlerResult.status === STATUS.ERROR) {
			throw new Error(commonHalvesFileHandlerResult.message);
		}
		if (usaHalvesFileHandlerResult.status === STATUS.ERROR) {
			throw new Error(usaHalvesFileHandlerResult.message);
		}

		checkObj = {
			...commonHalvesFileHandlerResult.data,
			...usaHalvesFileHandlerResult.data,
		};

		return { status: STATUS.FINISHED, data: checkObj };
	} catch (err) {
		return { status: STATUS.ERROR, message: err?.message };
	}
};

export default handleHalvesFile;
