const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/desktop/cyber";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.on(CHANNELS.CYBER.ADD_CYBER, async (event, arg) => {
	try {
		const { cyberName } = arg;

		const res = await axios.post(`${endPoint}/add`, {
			cyberName,
		});

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.CYBER.ADD_CYBER, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.CYBER.ADD_CYBER, res);
	}
});

ipcMain.on(CHANNELS.CYBER.GET_ALL_CYBER, async (event, arg) => {
	try {
		const res = await axios.get(`${endPoint}/list`);
		const list = res?.data?.list;

		const resData = {
			statusCode: res?.status,
			statusText: res?.statusText,
			list,
		};

		event.sender.send(CHANNELS.CYBER.GET_ALL_CYBER, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.CYBER.GET_ALL_CYBER, res);
	}
});

ipcMain.on(CHANNELS.CYBER.EDIT_CYBER, async (event, arg) => {
	try {
		const { id, newName } = arg;

		const res = await axios.put(`${endPoint}/${id}`, { newName });
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.CYBER.EDIT_CYBER, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.CYBER.EDIT_CYBER, res);
	}
});

ipcMain.on(CHANNELS.CYBER.DEL_CYBER, async (event, arg) => {
	try {
		const { id } = arg;

		const res = await axios.delete(`${endPoint}/${id}`);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.CYBER.DEL_CYBER, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.CYBER.DEL_CYBER, res);
	}
});
