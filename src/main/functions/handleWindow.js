const { BrowserWindow } = require("electron");

const { appIcon } = require("../helpers/icons.js");

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		minWidth: 600,
		minHeight: 400,
		icon: appIcon,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// and load the index.html of the app.
	const window = mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	return window;
};

module.exports = createWindow;
