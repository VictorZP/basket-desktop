const { ipcMain, app } = require("electron");
const Store = require("electron-store");

const { handleToken } = require("../helpers/handleToken.js");

const { CHANNELS } = require("../../common/constants/channels.js");
const { STORAGE_KEYS } = require("../../common/constants/index.js");

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
