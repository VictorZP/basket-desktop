const ipcRenderer = window.require("electron").ipcRenderer;

import { CONSTANTS } from "../../../constants/matchesPage.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

//  Создает файл формата txt, который содержит сообщения о предупреждениях/ошибках
//  придобавлении матчей для анализа.
export const createWarnDetailsFile = async (data) => {
	const dataString = data
		.map((obj, index) => {
			return `${index + 1}) ${obj?.status}: ${obj?.message}`;
		})
		?.join("\n");

	const dialogData = {
		title: CONSTANTS.SAVE_TITLE,
		defaultPath:
			process.env.USERPROFILE + "\\Downloads\\" + CONSTANTS.FILE_NAME,
		filters: [
			{
				name: ".txt",
				extensions: ["txt"],
			},
		],
	};

	const dialogArgs = {
		dialogData,
		file: dataString,
	};

	try {
		await ipcRenderer.invoke(CHANNELS.DIALOG.SAVE_FILE, dialogArgs);
	} catch (err) {
		return err;
	}
};
