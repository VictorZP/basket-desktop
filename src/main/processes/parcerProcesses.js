const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/parcer";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.on(CHANNELS.PARSER.ADD_URL, async (event, arg) => {
	try {
		const urlArr = arg;
		const res = await axios.post(`${endPoint}/add_url`, urlArr);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.ADD_URL, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.ADD_URL, res);
	}
});

ipcMain.on(CHANNELS.PARSER.UPD_URL, async (event, arg) => {
	try {
		const urlArr = arg;
		const res = await axios.put(`${endPoint}/upd_url`, urlArr);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.UPD_URL, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.UPD_URL, res);
	}
});

ipcMain.on(CHANNELS.PARSER.GET_URL, async (event, arg) => {
	try {
		const res = await axios.get(`${endPoint}/urls`);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data?.list,
		};

		event.sender.send(CHANNELS.PARSER.GET_URL, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};
		event.sender.send(CHANNELS.PARSER.GET_URL, res);
	}
});

ipcMain.on(CHANNELS.PARSER.DELETE_URLS, async (event, arg) => {
	try {
		const res = await axios.delete(`${endPoint}/delete_url`);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.DELETE_URLS, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};
		event.sender.send(CHANNELS.PARSER.DELETE_URLS, res);
	}
});
