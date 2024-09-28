import handleTempFile from "./tempFilesHandler";
import { CHANNELS, STATUS } from "../../../../common/constants";

const ipcRenderer = window.require("electron").ipcRenderer;

export const getGamesByCyber = (games, cyber) => {
	return games?.filter((game) => game?.homeTeam?.teamCyber?.name === cyber);
};

export const handleSetTempAndPredictFromFile = async (btnId, games) => {
	let tempAndPredictFileData;

	try {
		const cyberFromId = btnId.split("-btn").at(0).replaceAll("-", " ");

		const gamesByCyber = getGamesByCyber(games, cyberFromId);
		if (gamesByCyber.length === 0) return;

		const cyberFilesNames = await ipcRenderer.invoke(
			CHANNELS.SETTINGS.GET_CYBER_FILE_NAME
		);
		if (cyberFilesNames?.status === STATUS.ERROR) {
			return cyberFilesNames;
		}

		const tempAndPredictDataByCyberResponse = await ipcRenderer.invoke(
			CHANNELS.FILES.GET_TEMP_AND_PREDICT,
			cyberFilesNames.filesNames[cyberFromId]
		);

		if (tempAndPredictDataByCyberResponse.status === STATUS.ERROR) {
			return tempAndPredictDataByCyberResponse;
		}

		// Check if the temp and predict file is in the OneDrive response.
		// If it is, use the data from the response. If it is not, get the file from the system.
		if (tempAndPredictDataByCyberResponse.cyberFileData) {
			tempAndPredictFileData = tempAndPredictDataByCyberResponse.cyberFileData;
		} else {
			const tempAndPredictFileFromSystemResult = await ipcRenderer.invoke(
				CHANNELS.FILES.GET_FILES_FROM_SYSTEM,
				cyberFilesNames.filesNames[cyberFromId]
			);

			if (tempAndPredictFileFromSystemResult.status === STATUS.ERROR) {
				throw new Error(tempAndPredictFileFromSystemResult.message);
			}

			tempAndPredictFileData = tempAndPredictFileFromSystemResult.fileData;
		}

		const cyberFileHandlerResult = handleTempFile(tempAndPredictFileData);
		if (cyberFileHandlerResult.status !== STATUS.FINISHED) {
			return cyberFileHandlerResult;
		}

		const saveTempAndPredictResult = await ipcRenderer.invoke(
			CHANNELS.ANALYZE.SET_EMP_AND_PREDICT_FROM_FILE,
			{ gamesByCyber, tempAndPredictData: cyberFileHandlerResult.data }
		);

		return saveTempAndPredictResult;
	} catch (err) {
		return { status: STATUS.ERROR, message: err.message };
	}
};
