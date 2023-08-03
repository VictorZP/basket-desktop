const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/parcer";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.on(CHANNELS.PARSER.ADD_URL, async (event, arg) => {
	try {
		const urlArr = arg;
		const res = await axios.post(`${endPoint}/add_url`, urlArr);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.ADD_URL, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.ADD_URL, res);
	}
});
