const { app, BrowserWindow, Tray } = require("electron");

require("dotenv").config();

const updateApp = require("update-electron-app");

const createWindow = require("./functions/handleWindow.js");
const trayHandler = require("./functions/trayHandler.js");

const handleAppMenu = require("./menu.js");
const contextMenu = require("./helpers/trayContextMenu.js");
const { trayIcon } = require("./helpers/icons.js");

if (require("electron-squirrel-startup")) {
	app.quit();
}

let tray;
let window;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}

		if (BrowserWindow.getAllWindows().length === 1) {
			BrowserWindow.getAllWindows().forEach((win) => {
				win.show();
			});
		}
	});

	app.on("ready", () => {
		window = createWindow();
		handleAppMenu(window);

		tray = new Tray(trayIcon);

		tray.setContextMenu(contextMenu);

		trayHandler(tray);

		// Updater listener
		updateApp.updateElectronApp({
			updateInterval: "5 minutes",
			notifyUser: true,
		});
	});

	app.on("window-all-closed", () => {});

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			window = createWindow();
			handleAppMenu(window);
		}
	});
}

//  Processes for the main window
import "./processes/storeProcesses.js";
import "./processes/loginProcesses.js";
import "./processes/cyberProcesses.js";
import "./processes/appChampProcesses.js";
import "./processes/teamNameProcesses.js";
import "./processes/urlFormProcesses.js";
import "./processes/activeGamesProcesses.js";
import "./processes/parcerProcesses.js";
import "./processes/parcerDataProcesses.js";
import "./processes/saveFileProcesses.js";
import "./processes/manualResultsProcesses.js";
import "./processes/bettingResultsProcesses.js";
import "./processes/linesProcesses.js";
