const axios = require("axios");
const { ipcMain, Notification } = require("electron");

const endPoint = "/lines";

const { CHANNELS } = require("../../common/constants/channels");

ipcMain.on(CHANNELS.LINES.GET_LINES, async (event, paramsData) => {
	try {
		const params = new URLSearchParams(paramsData);
		const res = await axios.get(`${endPoint}/generate`, { params });

		new Notification({
			title: "Линии",
			body: res?.data?.message,
		}).show();
	} catch (err) {
		new Notification({
			title: "Линии",
			body: err?.response?.data?.message,
		}).show();
	}
});

ipcMain.handle(CHANNELS.LINES.GET_LINES_LIST, async (event) => {
	try {
		const res = await axios.get(`${endPoint}/list`);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			list: res?.data?.list,
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

ipcMain.handle(CHANNELS.LINES.DELETE_LINES, async (event, dataId) => {
	try {
		const res = await axios.delete(`${endPoint}/delete/${dataId}`);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
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
