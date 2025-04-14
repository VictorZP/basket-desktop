const { Menu, BrowserWindow } = require("electron");

const createWindow = require("../functions/handleWindow.js");
const handleStatsWindow = require("../functions/handleMatchesStatsWindow.js");

const trayContextMenu = Menu.buildFromTemplate([
	{
		label: "Открыть приложение",
		click: () => {
			// Logic to show the main app window
			const mainWindow = BrowserWindow.getAllWindows().find(
				(win) => win.title === "Who wins"
			);

			if (mainWindow) {
				mainWindow.show();
			} else {
				createWindow();
			}
		},
	},
	{
		label: "Открыть статистику игр",
		click: () => {
			// Logic to show the main app window
			const matchesStatsWindow = BrowserWindow.getAllWindows().find(
				(win) => win.title === "Статистика"
			);

			if (matchesStatsWindow) {
				matchesStatsWindow.show();
			} else {
				handleStatsWindow();
			}
		},
	},
	{ label: "Закрыть", role: "quit" },
]);

module.exports = trayContextMenu;
