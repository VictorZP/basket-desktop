const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/desktop/data/games";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.handle(CHANNELS.ANALYZE.ADD_URL, async (event, reqData) => {
	try {
		const res = await axios.post(`${endPoint}/generate`, reqData);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
			status: res?.data?.status,
			unsuccessfulData: res?.data?.data,
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

ipcMain.on(CHANNELS.ANALYZE.GET_STATIC_LIST, async (event, reqData) => {
	const params = new URLSearchParams(reqData);
	try {
		const res = await axios.get(`${endPoint}/list/static`, { params });
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data,
		};
		event.sender.send(CHANNELS.ANALYZE.GET_STATIC_LIST, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.ANALYZE.GET_STATIC_LIST, res);
	}
});

ipcMain.handle(CHANNELS.ANALYZE.UPD_TEMP, async (event, data) => {
	try {
		const res = await axios.put(`${endPoint}/list/static/temp`, data);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
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
