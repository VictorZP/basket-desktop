const axios = require("axios");
const { ipcMain } = require("electron");
const { api } = require("./api.js");
const { handleToken } = require("../helpers/handleToken.js");
const endPoint = "/auth";

api();

const { LOGIN_PAGE } = require("../../common/constants/index.js");
const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.on(CHANNELS.AUTH.LOGIN, async (event, arg) => {
	try {
		const res = await axios.post(`${endPoint}/desktop/login"`, arg);
		handleToken.set(res?.data?.token);

		event.sender.send(CHANNELS.AUTH.LOGIN, res?.data);
	} catch (e) {
		const err = {};
		if (e.response) {
			console.log("🚀 ~ e.response:", e.response);
			err.message = e.response.data.message;
			err.statusCode = e.response.status;
		} else if (e.request) {
			console.log("🚀 ~ e.request:", e.request);
			err.statusCode = 500;
			err.message = "Что-то пошло не так. Попробуйте ще раз.";
		} else {
			err.message =
				"Прозошла ошибка. Попробуйте еще раз или перезагрузите приложение.";
		}

		console.log(e.config);
		event.sender.send(CHANNELS.AUTH.LOGIN, err);
	}
});
