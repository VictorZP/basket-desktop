const axios = require("axios");

const { ipcMain } = require("electron");

const getGraphClient = require("../../graph");
const { protectedResources } = require("../../authConfig");
const { getFilesFromSystem } = require("../functions/getFilesFromSystem");
const { STATUS, CHANNELS } = require("../../common/constants");

const filesHandlers = (authProvider) => {
	ipcMain.handle(
		CHANNELS.FILES.GET_HALVES,
		async (e, { commonHalvesFile, usaHalvesFile }) => {
			try {
				const tokenRequest = {
					scopes: protectedResources.graphDocs.scopes,
				};

				const tokenResponse = await authProvider.getToken(tokenRequest);

				const graphResponseCommonFile = await getGraphClient(
					tokenResponse.accessToken
				)
					.api(
						`${protectedResources.graphDocs.endpoint}search(q='${commonHalvesFile}')`
					)
					.get();
				const graphResponseUSAFile = await getGraphClient(
					tokenResponse.accessToken
				)
					.api(
						`${protectedResources.graphDocs.endpoint}search(q='${usaHalvesFile}')`
					)
					.get();

				let commonFile = null;
				let usaFile = null;

				if (graphResponseCommonFile?.value?.at(0)) {
					commonFile = await axios.get(
						graphResponseCommonFile?.value?.at(0)[
							"@microsoft.graph.downloadUrl"
						],
						{ responseType: "arraybuffer" }
					);
				}

				if (graphResponseUSAFile?.value?.at(0)) {
					usaFile = await axios.get(
						graphResponseUSAFile?.value?.at(0)["@microsoft.graph.downloadUrl"],
						{ responseType: "arraybuffer" }
					);
				}

				return {
					status: STATUS.SUCCESS,
					commonFileData: commonFile?.data,
					usaFileData: usaFile?.data,
				};
			} catch (err) {
				return { status: STATUS.ERROR, message: err?.message };
			}
		}
	);

	ipcMain.handle(
		CHANNELS.FILES.GET_TEMP_AND_PREDICT,
		async (e, cyberFileName) => {
			try {
				const tokenRequest = {
					scopes: protectedResources.graphDocs.scopes,
				};

				const tokenResponse = await authProvider.getToken(tokenRequest);
				const graphResponseCyberFile = await getGraphClient(
					tokenResponse.accessToken
				)
					.api(
						`${protectedResources.graphDocs.endpoint}search(q='${cyberFileName}')`
					)
					.get();

				let cyberFile = null;

				if (graphResponseCyberFile?.value?.at(0)) {
					cyberFile = await axios.get(
						graphResponseCyberFile?.value?.at(0)[
							"@microsoft.graph.downloadUrl"
						],
						{ responseType: "arraybuffer" }
					);
				}

				return {
					status: STATUS.SUCCESS,
					cyberFileData: cyberFile?.data,
				};
			} catch (err) {
				return { status: STATUS.ERROR, message: err?.message };
			}
		}
	);

	//  If there are no files, then we need to handle them from file system
	//  This could be the case when the microsoft graph api is not available or the files are not found
	ipcMain.handle(CHANNELS.FILES.GET_FILES_FROM_SYSTEM, async (e, fileName) => {
		try {
			const filesResults = await getFilesFromSystem(fileName);

			if (filesResults.status === STATUS.ERROR) {
				throw new Error(filesResults.message);
			}

			return { status: STATUS.SUCCESS, fileData: filesResults.fileContent };
		} catch (err) {
			return {
				status: STATUS.ERROR,
				message: err?.message,
			};
		}
	});
};

module.exports = filesHandlers;
