const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/desktop/team";

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.on(CHANNELS.TEAM_NAME.ADD_NAME, async (event, arg) => {
	try {
		const reqData = arg;

		const res = await axios.post(`${endPoint}/add`, reqData);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.TEAM_NAME.ADD_NAME, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.TEAM_NAME.ADD_NAME, res);
	}
});

ipcMain.on(CHANNELS.TEAM_NAME.GET_ALL_NAMES, async (event) => {
	try {
		const res = await axios.get(`${endPoint}/list`);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			list: res?.data?.list,
		};

		event.sender.send(CHANNELS.TEAM_NAME.GET_ALL_NAMES, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};
		event.sender.send(CHANNELS.TEAM_NAME.GET_ALL_NAMES, res);
	}
});

ipcMain.on(CHANNELS.TEAM_NAME.EDIT_NAME, async (event, arg) => {
	try {
		const { data, teamId } = arg;
		const res = await axios.put(`${endPoint}/update/${teamId}`, data);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.TEAM_NAME.EDIT_NAME, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.TEAM_NAME.EDIT_NAME, res);
	}
});

ipcMain.on(CHANNELS.TEAM_NAME.DEL_NAME, async (event, arg) => {
	try {
		const { id } = arg;

		const res = await axios.delete(`${endPoint}/delete/${id}`);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.TEAM_NAME.DEL_NAME, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};
		event.sender.send(CHANNELS.TEAM_NAME.DEL_NAME, res);
	}
});

ipcMain.handle(CHANNELS.TEAMS_TRANSFER.SAVE, async (event, arg) => {
	try {
		const response = await axios.put(`${endPoint}/transfer`, arg);

		const responseData = {
			status: response?.status,
			statusText: response?.statusText,
			message: response?.data?.message,
		};

		return responseData;
	} catch (err) {
		const errorDataResponse = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		return errorDataResponse;
	}
});

ipcMain.on(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, async (event, arg) => {
	try {
		const res = await axios.get(`${endPoint}/list/short/${arg?.champId}`);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			list: res?.data?.list,
			type: arg?.listType,
		};

		event.sender.send(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
			type: arg?.listType,
		};
		event.sender.send(CHANNELS.TEAMS_TRANSFER.GET_TEAMS_LIST, res);
	}
});
