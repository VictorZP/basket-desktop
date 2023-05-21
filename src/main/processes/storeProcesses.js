const { ipcMain } = require("electron");
const Store = require("electron-store");

const { CHANNELS } = require("../../common/constants/channels.js");
const STORAGE_KEY = {
	TOKEN: "token",
};

let store = new Store();

ipcMain.on(CHANNELS.STORAGE.SET_TOKEN, (event, arg) => {
	store.set(STORAGE_KEY.TOKEN, arg);
});

ipcMain.handle(CHANNELS.STORAGE.GET_TOKEN, async (event, arg) => {
	const token = await store.get(STORAGE_KEY.TOKEN);
	const res = { token };

	return res;
});
