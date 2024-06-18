const { ipcMain, app } = require("electron");
const Store = require("electron-store");

const { handleToken } = require("../helpers/handleToken.js");

const {
	STATUS,
	CHANNELS,
	STORAGE_KEYS,
	SETTINGS_PAGE,
} = require("../../common/constants");

let store = new Store();

ipcMain.on(CHANNELS.STORAGE.SET_TOKEN, async (event, arg) => {
	try {
		store.set(STORAGE_KEYS.TOKEN, arg);
	} catch (err) {
		console.log(err);
	}
});

ipcMain.handle(CHANNELS.STORAGE.GET_TOKEN, async (event, arg) => {
	const token = await store.get(STORAGE_KEYS.TOKEN);
	handleToken.set(token);
	const res = { token };

	return res;
});

ipcMain.handle(CHANNELS.SETTINGS.GET_ADDRESS, (event) => {
	try {
		const address = store.get(STORAGE_KEYS.ADDRESS) ?? "";
		return { status: "success", address };
	} catch (err) {
		const res = {
			status: "error",
			message: err.message,
		};
		return res;
	}
});

ipcMain.handle(CHANNELS.SETTINGS.SET_ADDRESS, (event, address) => {
	try {
		store.set(STORAGE_KEYS.ADDRESS, address);

		app.relaunch();
		app.exit(0);
	} catch (err) {
		return {
			status: "error",
			message: err.message,
		};
	}
});

ipcMain.handle(CHANNELS.SETTINGS.GET_HALVES_FILES_NAMES, (event) => {
	try {
		const commonHalvesFile = store.get(STORAGE_KEYS.HALVES_FILE_COMMON);
		const usaHalvesFile = store.get(STORAGE_KEYS.HALVES_FILE_USA);
		const filesNames = {
			commonHalvesFile: commonHalvesFile ?? "",
			usaHalvesFile: usaHalvesFile ?? "",
		};

		return { status: STATUS.SUCCESS, filesNames };
	} catch (err) {
		return {
			status: STATUS.ERROR,
			message: err.message,
		};
	}
});

ipcMain.handle(CHANNELS.SETTINGS.SET_FILES_NAMES, (e, data) => {
	const { id, filesNamesObj } = data;
	const { COMPONENTS_IDS } = SETTINGS_PAGE;
	try {
		switch (id) {
			case COMPONENTS_IDS.COMMON_HALVES:
				store.set(
					STORAGE_KEYS.HALVES_FILE_COMMON,
					filesNamesObj.commonHalvesFile
				);
				break;
			case COMPONENTS_IDS.USA_HALVES:
				store.set(STORAGE_KEYS.HALVES_FILE_USA, filesNamesObj.usaHalvesFile);
				break;

			default:
				break;
		}

		return { status: STATUS.SUCCESS };
	} catch (err) {
		return {
			status: STATUS.ERROR,
			message: err.message,
		};
	}
});
