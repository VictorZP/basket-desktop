const axios = require("axios");
const Store = require("electron-store");
const fs = require("fs");
const path = require("path");
const { io } = require("socket.io-client");

const { ipcMain, Notification } = require("electron");

const { STORAGE_KEYS } = require("../../common/constants/index.js");

const endPoint = "/analyze";

const { CHANNELS } = require("../../common/constants/channels.js");

let store = new Store();
const TOKEN = store.get(STORAGE_KEYS.TOKEN);
const WS_ADDRESS = store.get(STORAGE_KEYS.ADDRESS) ?? "localhost";

// get port data
const rawConfigData = fs.readFileSync(
	path.join(__dirname, "./data/config.json")
);
const config = JSON.parse(rawConfigData);

const socket = io(
	`ws://${WS_ADDRESS}:${config.WS_ANALYZE_PORT}/api/v1/analyze/`,
	{
		auth: {
			token: TOKEN,
		},
	}
);

// client-side
socket.on("connect", () => {
	console.log("Connected to the server");
});

socket.on("connect_error", (err) => {
	console.error("Connection failed", err.message);
	console.error("Error code", err.data);
});

ipcMain.handle(CHANNELS.ANALYZE.ACTIVE, async (event, arg) => {
	const { isConnected } = arg;
	console.log("🚀 ~ isOn:", isConnected);
	try {
		if (!isConnected) {
			socket.emit("join_room", "analyze-room");
		} else {
			socket.emit("leave_room", "analyze-room");
		}

		const resData = {
			status: 200,
			statusText: "OK",
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
