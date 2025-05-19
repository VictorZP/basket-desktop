const { app, BrowserWindow, Tray } = require("electron");

require("dotenv").config();

const updateApp = require("update-electron-app");

const createWindow = require("./functions/handleWindow.js");
const handleAuthProvider = require("./functions/handleAuthProvider.js");
const authHandlers = require("./processes/authProcesses.js");
const filesHandlers = require("./processes/filesProcesses");
const trayHandler = require("./functions/trayHandler.js");

const handleAppMenu = require("./menu.js");
const trayContextMenu = require("./helpers/trayContextMenu.js");
const { trayIcon } = require("./helpers/icons.js");

if (require("electron-squirrel-startup")) {
	app.quit();
}

let tray;
let window;
let authProvider;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}

		if (BrowserWindow.getAllWindows().length >= 1) {
			BrowserWindow.getAllWindows().forEach((win) => {
				win.show();
			});
		}
	});

	app.on("ready", () => {
		window = createWindow();
		authProvider = handleAuthProvider();

		authHandlers(authProvider);
		filesHandlers(authProvider);
		handleAppMenu(window);

		tray = new Tray(trayIcon);

		tray.setContextMenu(trayContextMenu);

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
import "./processes/linesProcesses.js";
import "./processes/parcerProcesses.js";
import "./processes/urlFormProcesses.js";
import "./processes/analyzeProcesses.js";
import "./processes/appChampProcesses.js";
import "./processes/teamNameProcesses.js";
import "./processes/saveFileProcesses.js";
import "./processes/parcerDataProcesses.js";
import "./processes/manualResultsProcesses.js";
import "./processes/matchesResultsBySeason.js";
// import "./processes/authProcesses.js";
import "./processes/matchStatsWindow.js";
import "./processes/halvesStatisticsProcesses.js";

// Context menu
import "./helpers/contextMenu.js";
