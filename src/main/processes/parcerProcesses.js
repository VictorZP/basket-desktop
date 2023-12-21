const axios = require("axios");
const { ipcMain, Notification } = require("electron");
//
const { io } = require("socket.io-client");
const Store = require("electron-store");
//

const endPoint = "/parcer";
const filterEndPoint = "/filter";

const { CHANNELS } = require("../../common/constants/channels.js");
const { WS_ADDRESS, WS_PORT } = require("../helpers/variables.js");

const NOTIFICATION_TITLE = "Результаты парсера";

//
let store = new Store();
const TOKEN = store.get("token");

const socket = io(`ws://${WS_ADDRESS}:${WS_PORT}/api/v1/parcer/`, {
	auth: {
		token: TOKEN,
	},
});

// client-side
socket.on("connect", () => {
	socket.emit("room", "parcerHandler");
});

socket.on("errRoom", (arg) => {
	next(new Error(arg));
});

socket.on("parcer", (arg) => {
	new Notification({
		title: NOTIFICATION_TITLE,
		body: arg.message,
	}).show();
});

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

ipcMain.on(CHANNELS.PARSER.ANALYZE, async (event, arg) => {
	try {
		const res = await axios.get(`${endPoint}/analyze`);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data,
		};

		socket.connect();

		event.sender.send(CHANNELS.PARSER.ANALYZE, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.ANALYZE, res);
	}
});

ipcMain.handle(CHANNELS.PARSER.FILTER_ADD_CHAMP, async (event, arg) => {
	try {
		const res = await axios.post(`${filterEndPoint}/add`, arg);

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

		event.sender.send(CHANNELS.PARSER.FILTER_ADD_CHAMP, res);
	}
});

ipcMain.handle(CHANNELS.PARSER.FILTER_LIST, async (event) => {
	try {
		const res = await axios.get(`${filterEndPoint}/list`);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			list: res?.data,
		};

		return resData;
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.FILTER_LIST, res);
	}
});

ipcMain.on(CHANNELS.PARSER.FILTER_DELETE_CHAMP, async (event, arg) => {
	try {
		const { id } = arg;
		const res = await axios.delete(`${filterEndPoint}/filter_league/${id}`);

		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			message: res?.data?.message,
		};

		event.sender.send(CHANNELS.PARSER.FILTER_DELETE_CHAMP, resData);
	} catch (err) {
		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};
		event.sender.send(CHANNELS.PARSER.FILTER_DELETE_CHAMP, res);
	}
});
