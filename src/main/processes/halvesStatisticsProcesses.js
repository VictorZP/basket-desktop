const axios = require("axios");
const { ipcMain, Notification } = require("electron");

const endPoint = "/desktop/statistics/halves_compare";

const { CHANNELS } = require("../../common/constants/channels");

ipcMain.on(
	CHANNELS.HALVES_STATISTICS.GET_HALVES_STATISTICS,
	async (event, data) => {
		try {
			const res = await axios.post(`${endPoint}/generate`, data);

			new Notification({
				title: "Статистика по половинам",
				body: res?.data?.message,
			}).show();
		} catch (err) {
			new Notification({
				title: "Статистика по половинам",
				body: err?.response?.data?.message,
			}).show();
		}
	}
);

ipcMain.handle(
	CHANNELS.HALVES_STATISTICS.GET_HALVES_STATISTICS_LIST,
	async () => {
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
	}
);

ipcMain.handle(
	CHANNELS.HALVES_STATISTICS.DOWNLOAD_HALVES_STATISTICS,
	async (event, reqData) => {
		try {
			const params = new URLSearchParams(reqData);
			const res = await axios.get(`${endPoint}/download`, { params });

			const resData = {
				status: res?.status,
				statusText: res?.statusText,
				data: res?.data?.data,
				title: res?.data?.title,
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

ipcMain.handle(
	CHANNELS.HALVES_STATISTICS.DELETE_HALVES_STATISTICS,
	async (event, dataId) => {
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
	}
);
