const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/desktop/data/games/manual";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.handle(CHANNELS.MANUAL_ADDING.ADD_MANUAL_URL, async (e, reqData) => {
	try {
		const res = await axios.put(`${endPoint}/add`, reqData);

		const resData = {
			resStatus: res?.status,
			resStatusText: res?.statusText,
			resMessage: res?.data?.message,
			status: res?.data?.status,
			unsuccessfulData: res?.data?.data,
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

ipcMain.handle(CHANNELS.MANUAL_ADDING.GET_MANUAL_LIST, async (e, reqData) => {
	try {
		const params = new URLSearchParams(reqData);
		const res = await axios.get(`${endPoint}/list`, { params });

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data?.data,
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

ipcMain.handle(CHANNELS.MANUAL_ADDING.SAVE_MANUAL_LIST, async (e, reqData) => {
	try {
		const res = await axios.put(`${endPoint}/list`, reqData);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data?.data?.games,
			message: res.data?.data?.message,
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
