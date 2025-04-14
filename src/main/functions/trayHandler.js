const { BrowserWindow } = require("electron");

const createWindow = require("./handleWindow.js");

const trayHandler = (tray) => {
	tray.setToolTip("Who wins");

	tray.on("click", () => {
		const windows = BrowserWindow.getAllWindows();

		if (windows.length === 0) {
			createWindow();
		}

		if (windows.length > 0) {
			const mainWindow = windows.find((win) => win.title === "Who wins");

			if (mainWindow) {
				mainWindow.show();
			} else {
				createWindow();
			}

			windows.forEach((win) => {
				if (win.title !== "Who wins") {
					win.show();
				}
			});
		}
	});
};

module.exports = trayHandler;
