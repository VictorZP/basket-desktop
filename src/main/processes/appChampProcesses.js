const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/desktop/championship";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, async (event, arg) => {
	try {
		const { champ } = arg;

		const res = await axios.post(`${endPoint}/add`, champ);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, res);
	}
});

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL, async (event) => {
	try {
		const res = await axios.get(`${endPoint}/list`);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			list: res?.data?.list,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL, res);
	}
});

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT, async (event) => {
	try {
		const res = await axios.get(`${endPoint}/short_list`);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			list: res?.data?.list,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT, res);
	}
});

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT, async (event, arg) => {
	try {
		const { id, champ } = arg;

		const res = await axios.put(`${endPoint}/${id}`, champ);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT, res);
	}
});

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_DEL, async (event, arg) => {
	try {
		const { id } = arg;

		const res = await axios.delete(`${endPoint}/${id}`);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_DEL, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data,
		};
		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_DEL, res);
	}
});
