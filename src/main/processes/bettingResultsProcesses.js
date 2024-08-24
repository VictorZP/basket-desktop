const axios = require("axios");
const { ipcMain, Notification } = require("electron");

const endPoint = "/desktop/betting_results";

const { CHANNELS, BETTING_RESULTS } = require("../../common/constants");

ipcMain.handle(CHANNELS.BETTING_RESULTS.GET_RESULTS, async (e, data) => {
	try {
		const params = new URLSearchParams(data);

		const res = await axios.get(`${endPoint}/generate`, {
			params,
		});

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		new Notification({
			title: BETTING_RESULTS.NOTIFICATION_TITLE,
			body: res?.data?.message ?? BETTING_RESULTS.DEFAULT_MESSAGE_GENERATE,
		}).show();

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
