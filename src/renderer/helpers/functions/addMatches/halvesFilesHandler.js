const ipcRenderer = window.require("electron").ipcRenderer;

import handleFile from "./handleFile";
import { STATUS } from "../../../constants";
import { CHANNELS } from "../../../../common/constants";

const handleHalvesFile = async () => {
	let checkObj = {};

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

		if (halvesFilesResponse.status === STATUS.ERROR) {
			throw new Error(halvesFilesResponse.message);
		}

		const commonHalvesFileHandlerResult = handleFile(
			halvesFilesResponse.commonFileData
		);
		const usaHalvesFileHandlerResult = handleFile(
			halvesFilesResponse.usaFileData
		);

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
