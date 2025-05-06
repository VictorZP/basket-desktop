const axios = require("axios");
const { ipcMain, Notification } = require("electron");

const endPoint = "/desktop/statistics/results_by_season";

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
