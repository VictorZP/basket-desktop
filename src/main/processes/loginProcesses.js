const axios = require("axios");
const { ipcMain } = require("electron");
const Store = require("electron-store");

const { api } = require("./api.js");

const { STORAGE_KEYS } = require("../../common/constants/index.js");

api();

const endPoint = "/auth";
let store = new Store();

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.on(CHANNELS.AUTH.LOGIN, async (event, arg) => {
	try {
		const res = await axios.post(`${endPoint}/desktop/login`, arg);
		store.set(STORAGE_KEYS.TOKEN, res?.data?.token);

		const resData = {
			statusCode: res?.status,
			statusText: res.statusText,
			token: res?.data?.token,
		};

		event.sender.send(CHANNELS.AUTH.LOGIN, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.AUTH.LOGIN, res);
	}
});

ipcMain.handle(CHANNELS.AUTH.CHECK_TOKEN, async (event, arg) => {
	try {
		const { token } = arg;

		const res = await axios.post(`${endPoint}/desktop/auth`, {
			token,
		});

		const resData = {
			statusCode: res?.status,
			statusText: res?.statusText,
			message: "verified",
		};
		return resData;
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};
		return res;
	}
});
