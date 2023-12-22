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
		console.log("🚀 ~ resData:", resData);

		return resData;
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};
		console.log("🚀 ~ res:", res);

		event.sender.send(CHANNELS.PARCER_DATA.GET_DATA_LIST, res);
	}
});
