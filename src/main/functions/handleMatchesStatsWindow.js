const { BrowserWindow } = require("electron");

const { appIcon } = require("../helpers/icons.js");

const handleStatsWindow = () => {
	let win = new BrowserWindow({
		width: 1360,
		height: 980,
		icon: appIcon,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// Load the URL of the settings window
	win.loadURL(MATCHES_STATS_WINDOW_WEBPACK_ENTRY);
	win.menuBarVisible = false;
};

module.exports = handleStatsWindow;
