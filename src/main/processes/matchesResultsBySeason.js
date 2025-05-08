const axios = require("axios");
const { ipcMain, Notification } = require("electron");

const endPoint = "/desktop/statistics/results_by_season";

const {
	createSeasonStatisticsFile,
} = require("../functions/createSeasonStatisticsFile.js");

const { CHANNELS } = require("../../common/constants/channels");

ipcMain.on(
	CHANNELS.MATCHES_STATS_BY_SEASON.FORM_MATCHES_STATS_BY_SEASON,
	async (event, data) => {
		try {
			const res = await axios.post(`${endPoint}/generate`, data);

			new Notification({
				title: "Статистика матчей за сезон",
				body: res?.data?.message,
			}).show();
		} catch (err) {
			new Notification({
				title: "Статистика матчей за сезон",
				body: err?.response?.data?.message,
			}).show();
		}
	}
);

ipcMain.handle(
	CHANNELS.MATCHES_STATS_BY_SEASON.GET_MATCHES_STATS_BY_SEASON_LIST,
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
	CHANNELS.MATCHES_STATS_BY_SEASON.DOWNLOAD_MATCHES_STATS_BY_SEASON,
	async (event, reqData) => {
		try {
			const params = new URLSearchParams(reqData);
			const res = await axios.get(`${endPoint}/download`, { params });

			const rows = res?.data?.data;
			const title = res?.data?.title || "matches_stats";

			if (!Array.isArray(rows) || rows.length === 0) {
				return { status: "error", message: "Нет данных для экспорта." };
			}

			const saveFileResult = await createSeasonStatisticsFile(rows, title);

			if (saveFileResult.status === "error") {
				return { status: "error", message: saveFileResult.message };
			}

			const resData = {
				status: saveFileResult.status,
			};

			return resData;
		} catch (err) {
			const res = {
				statusCode: err?.response?.status,
				statusText: err?.response?.statusText,
				message: err?.response?.data?.message,
				status: "error",
			};

			return res;
		}
	}
);

ipcMain.handle(
	CHANNELS.MATCHES_STATS_BY_SEASON.DELETE_MATCHES_STATS_BY_SEASON,
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
