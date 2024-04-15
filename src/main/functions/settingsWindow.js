const { BrowserWindow } = require("electron");

const { appIcon } = require("../helpers/icons.js");

const handleSettingsWindow = (window) => {
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		parent: window,
		modal: true,
		icon: appIcon,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// Load the URL of the settings window
	win.loadURL(SETTINGS_WINDOW_WEBPACK_ENTRY);
	win.menuBarVisible = false;
};

module.exports = handleSettingsWindow;
