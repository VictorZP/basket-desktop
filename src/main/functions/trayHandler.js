const { BrowserWindow } = require("electron");

const createWindow = require("./handleWindow.js");

const trayHandler = (tray) => {
	tray.setToolTip("Who wins");

	tray.on("click", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}

		if (BrowserWindow.getAllWindows().length === 1) {
			BrowserWindow.getAllWindows().forEach((win) => {
				win.show();
			});
		}
	});
};

module.exports = trayHandler;
