const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/desktop/data/games";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.handle(CHANNELS.BETTING_RESULTS.GET_RESULTS, async (e, data) => {
	try {
		const params = new URLSearchParams(data);

		const res = await axios.get(`${endPoint}/betting_results`, { params });
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data,
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
