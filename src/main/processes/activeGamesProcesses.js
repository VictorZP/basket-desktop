const axios = require("axios");
const { ipcMain, BrowserWindow, Notification } = require("electron");

const endPoint = "/desktop/data/games";

const { CHANNELS } = require("../../common/constants/channels.js");
const { ACTIVE_PAGE_NOTIFICATION } = require("../../common/constants/index.js");

ipcMain.on(CHANNELS.ANALYZE.ACTIVE, async (event, arg) => {
	try {
		const res = await axios.post(`${endPoint}/active`, arg);
		const resData = {
			status: res?.status,
			statusText: res?.statusText,
			data: res?.data,
		};
		event.sender.send(CHANNELS.ANALYZE.ACTIVE, resData);
	} catch (err) {
		if (
			err?.name === "TypeError" &&
			err?.message === "Object has been destroyed"
		) {
			return;
		}

		const res = {
			statusCode: err?.response?.status,
			statusText: err?.response?.statusText,
			message: err?.response?.data?.message,
		};

		event.sender.send(CHANNELS.ANALYZE.ACTIVE, res);
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
		} = arg;

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
