const axios = require("axios");
const { ipcMain } = require("electron");

const endPoint = "/parcer/data";

const { CHANNELS } = require("../../common/constants/channels");

ipcMain.handle(CHANNELS.PARCER_DATA.GET_DATA_LIST, async (event) => {
	try {
		const res = await axios.get(`${endPoint}/list`);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			list: res?.data?.dataList,
		};

		return resData;
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.PARCER_DATA.GET_DATA_LIST, res);
	}
});

ipcMain.handle(CHANNELS.PARCER_DATA.DOWNLOAD, async (event, reqData) => {
	try {
		const params = new URLSearchParams(reqData);
		const res = await axios.get(`${endPoint}/download`, { params });

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data?.data,
			type: res?.data?.type,
			title: res?.data?.title,
		};

		return resData;
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.PARCER_DATA.GET_DATA_LIST, res);
	}
});

ipcMain.handle(CHANNELS.PARCER_DATA.DELETE, async (event, dataId) => {
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
});
