const { ipcMain, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

const { CHANNELS } = require("../../common/constants/channels.js");

autoUpdater.on(CHANNELS.AUTO_UPDATE.AVAILABLE, () => {
	mainWindow.webContents.send(CHANNELS.AUTO_UPDATE.AVAILABLE);
});
autoUpdater.on(CHANNELS.AUTO_UPDATE.DOWNLOAD, () => {
	mainWindow.webContents.send(CHANNELS.AUTO_UPDATE.DOWNLOAD);
});

ipcMain.handle(CHANNELS.AUTO_UPDATE.UPDATE, (event) => {
	const result = dialog.showSaveDialog(null, { title: "Обновление" });
	return result;
});
