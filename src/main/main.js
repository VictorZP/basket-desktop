const { app, BrowserWindow } = require("electron");

require("dotenv").config();

const updateApp = require("update-electron-app");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		minWidth: 600,
		minHeight: 400,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//
app.on("ready", () => {
	createWindow();
	// Updater listener
	updateApp.updateElectronApp({
		updateInterval: "5 minutes",
		notifyUser: true,
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
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
