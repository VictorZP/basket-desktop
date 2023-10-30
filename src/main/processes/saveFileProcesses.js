const { ipcMain, dialog } = require("electron");
const fs = require("fs");

const { CHANNELS } = require("../../common/constants/channels.js");

ipcMain.handle(CHANNELS.DIALOG.SAVE_FILE, async (event, args) => {
	const defaultPath = process.env.USERPROFILE + "\\Downloads\\";

	//	Файлы в каталоге
	const dir = fs.readdirSync(defaultPath);

	// Количество фалов в каталоге с таким же именем
	const filesNumberWithSameName = dir?.filter((file) => {
		return file.includes(args.dialogData.fileName);
	})?.length;

	let dialogData = {
		title: args.dialogData.title,
		defaultPath: "",
		filters: args.dialogData.filters,
	};

	if (filesNumberWithSameName === 0) {
		const filePath = defaultPath + args.dialogData.fileName;

		dialogData.defaultPath = filePath;
	} else if (filesNumberWithSameName > 0) {
		const newFileName = `${args.dialogData.fileName} - ${filesNumberWithSameName}`;
		const filePath = defaultPath + newFileName;

		dialogData.defaultPath = filePath;
	}

	const result = await dialog.showSaveDialog(null, dialogData);

	if (!result.canceled) {
		fs.writeFileSync(result.filePath, args.file);
	}

	return result;
});
