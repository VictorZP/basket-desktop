const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/desktop/analyze/url";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.on(CHANNELS.ANALYZE.ADD_URL, async (event, arg) => {
	try {
		const res = await axios.post(`${endPoint}`, arg);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.ANALYZE.ADD_URL, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.ANALYZE.ADD_URL, res);
	}
});
