const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/desktop/data/games";

const { CHANNELS, STATUS } = require("../../common/constants");

ipcMain.handle(CHANNELS.ANALYZE.ADD_URL, async (event, reqData) => {
	try {
		const res = await axios.post(`${endPoint}/generate`, reqData);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
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

ipcMain.on(CHANNELS.ANALYZE.GET_STATIC_LIST, async (event, reqData) => {
	const params = new URLSearchParams(reqData);
	try {
		const res = await axios.get(`${endPoint}/list/static`, { params });
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data,
		};
		event.sender.send(CHANNELS.ANALYZE.GET_STATIC_LIST, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.ANALYZE.GET_STATIC_LIST, res);
	}
});

ipcMain.handle(CHANNELS.ANALYZE.UPD_TEMP, async (event, data) => {
	try {
		const res = await axios.put(`${endPoint}/list/static/temp`, data);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
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

ipcMain.on(CHANNELS.ANALYZE.MATCH_CHECK, async (e, id) => {
	try {
		const res = await axios.patch(`${endPoint}/set_status/${id}`);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
		};

		e.sender.send(CHANNELS.ANALYZE.MATCH_CHECK, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		e.sender.send(CHANNELS.ANALYZE.MATCH_CHECK, res);
	}
});

ipcMain.handle(
	CHANNELS.ANALYZE.SET_EMP_AND_PREDICT_FROM_FILE,
	async (e, data) => {
		try {
			const res = await axios.patch(`${endPoint}/data/set_temp_predict`, data);

			const resData = {
				status: res?.data?.status,
				message: res?.data?.message,
			};
			return resData;
		} catch (err) {
			return {
				status: STATUS.ERROR,
				message: err?.response?.data?.message || err.message,
			};
		}
	}
);
