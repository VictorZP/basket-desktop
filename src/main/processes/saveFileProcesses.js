const { ipcMain, dialog } = require("electron");
const fs = require("fs");

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.handle(CHANNELS.DIALOG.SAVE_FILE, async (event, args) => {
	const result = await dialog.showSaveDialog(null, args.dialogData);

	if (!result.canceled) {
		fs.writeFileSync(result.filePath, args.file);
	}

	return result;
});
