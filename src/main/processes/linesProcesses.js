const axios = require("axios");
const { ipcMain, Notification } = require("electron");

const endPoint = "/lines";

const { CHANNELS } = require("../../common/constants/channels");

ipcMain.on(CHANNELS.LINES.GET_LINES, async (event, paramsData) => {
	try {
		const params = new URLSearchParams(paramsData);
		const res = await axios.get(`${endPoint}/generate`, { params });

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			statusCode: res?.statusCode,
		};

		// new Notification({
		// 	title: "Линии",
		// 	body: arg.message,
		// }).show();
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		// new Notification({
		// 	title: "Линии",
		// 	body: res.message,
		// }).show();
	}
});
