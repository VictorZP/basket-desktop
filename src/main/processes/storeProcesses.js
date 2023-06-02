const { ipcMain } = require("electron");
const Store = require("electron-store");

const { handleToken } = require("../helpers/handleToken.js");

const { CHANNELS } = require("../../common/constants/channels.js");
const STORAGE_KEY = {
	TOKEN: "token",
};

let store = new Store();

ipcMain.on(CHANNELS.STORAGE.SET_TOKEN, async (event, arg) => {
	try {
		store.set(STORAGE_KEY.TOKEN, arg);
	} catch (err) {
		console.log(err);
	}
});

ipcMain.handle(CHANNELS.STORAGE.GET_TOKEN, async (event, arg) => {
	const token = await store.get(STORAGE_KEY.TOKEN);
	handleToken.set(token);
	const res = { token };

	return res;
});
