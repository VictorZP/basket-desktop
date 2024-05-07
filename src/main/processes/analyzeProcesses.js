const Store = require("electron-store");
const fs = require("fs");
const path = require("path");
const { io } = require("socket.io-client");

const {
	ipcMain,
	Notification,
	BrowserWindow,
	webContents,
} = require("electron");

const { STORAGE_KEYS } = require("../../common/constants/index.js");

const { CHANNELS } = require("../../common/constants/channels.js");
const { ACTIVE_PAGE_NOTIFICATION } = require("../../common/constants/index.js");
const { ACTIVE_PAGE } = require("../../renderer/constants/activeGamesPage.js");

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

socket.on("connect", () => {
	console.log("Connected to the server");
});

socket.on("connect_error", (err) => {
	console.error("Connection failed", err.message);
	console.error("Error code", err.data);
});

socket.on("message", (message) => {
	webContents.getAllWebContents().forEach((content) => {
		content.send(CHANNELS.ANALYZE.ACTIVE, message);
	});
});

ipcMain.handle(CHANNELS.ANALYZE.CONNECT, async (event, arg) => {
	const { isConnected } = arg;

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

ipcMain.on(CHANNELS.ANALYZE.SHOW_NOTIFICATION, async (event, arg) => {
	try {
		const {
			champ,
			teamHome,
			teamAway,
			difRes,
			betLimit,
			deviation,
			total2ndHALF,
			noBets,
			statusFront,
			total,
			kickOFF,
		} = arg;

		if (
			statusFront === ACTIVE_PAGE.STATUS &&
			!noBets &&
			total !== 0 &&
			kickOFF !== 0
		) {
			return;
		}

		let betPrediction = "-";

		switch (difRes) {
			case "more":
				betPrediction = "OVER";
				break;
			case "less":
				betPrediction = "UNDER";
				break;
			default:
				break;
		}

		const notificationObj = {
			title:
				betPrediction !== "-"
					? ACTIVE_PAGE_NOTIFICATION.TITLE_WITH_BETS
					: ACTIVE_PAGE_NOTIFICATION.TITLE_WITHOUT_BETS,
			body:
				betPrediction !== "-"
					? `${champ}\n${teamHome} - ${teamAway} ${betPrediction} ${betLimit}\n${deviation}`
					: `${champ}\n${teamHome} - ${teamAway} ${total2ndHALF}\n${deviation}`,
		};

		const notification = new Notification(notificationObj);
		const mainWindow = BrowserWindow.getAllWindows()?.at(0);

		notification.timeoutType = "never";

		notification.on("click", () => {
			// Restore and focus the window when the notification is clicked
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		});

		notification.show();
	} catch (err) {
		const errNotificationObj = {
			title: ACTIVE_PAGE_NOTIFICATION.TITLE_ERROR,
			body: ACTIVE_PAGE_NOTIFICATION.BODY_ERROR,
		};

		const errNotification = new Notification(errNotificationObj);

		errNotification.show();
	}
});
