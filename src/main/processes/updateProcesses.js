const { ipcMain, dialog } = require("electron");

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.handle(CHANNELS.AUTO_UPDATE.UPDATE, (event) => {
	const result = dialog.showSaveDialog(null, { title: "Обновление" });
	return result;
});
