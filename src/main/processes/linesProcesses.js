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
