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

ipcMain.handle(CHANNELS.BETTING_RESULTS.GET_RESULTS_LIST, async (e) => {
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

ipcMain.handle(
	CHANNELS.BETTING_RESULTS.DOWNLOAD_RESULTS,
	async (e, reqData) => {
		try {
			const params = new URLSearchParams(reqData);
			const res = await axios.get(`${endPoint}/download`, { params });

			const resData = {
				status: res?.status,
				statusText: res?.statusText,
				data: res?.data?.data,
				start: res?.data?.start,
				end: res?.data?.end,
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
	}
);

ipcMain.handle(CHANNELS.BETTING_RESULTS.DELETE_RESULTS, async (e, dataId) => {
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
