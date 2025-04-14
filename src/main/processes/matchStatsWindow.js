const { ipcMain } = require("electron");
const axios = require("axios");

const handleStatsWindow = require("../functions/handleMatchesStatsWindow.js");

const endPoint = "/desktop/data/games";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.handle(CHANNELS.MATCHES_STATS.OPEN_STATS_WINDOW, async () => {
	try {
		handleStatsWindow();
	} catch (error) {
		return {
			status: 500,
			message: error?.message || "Error opening stats window",
		};
	}
});

ipcMain.handle(
	CHANNELS.MATCHES_STATS.GET_MATCHES_DATA,
	async (event, reqData) => {
		try {
			const params = new URLSearchParams(reqData);
			const res = await axios.get(`${endPoint}/list/day_stats`, { params });

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
	}
);
