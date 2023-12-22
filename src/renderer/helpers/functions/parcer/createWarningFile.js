const ipcRenderer = window.require("electron").ipcRenderer;

import { PARCER_TEXT } from "../../../constants/parcer.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

export const createWarningFile = async (data, fileName) => {
	const dataString = data
		.map((obj, index) => {
			return `${index + 1}) ${obj?.status}: ${obj?.message}`;
		})
		?.join("\n");

	const normalizedFileName = `${PARCER_TEXT.FILE_NAME.ERR_REPORT}-${fileName
		?.split(" ")
		?.at(0)}`;

	const dialogData = {
		title: PARCER_TEXT.SAVE_TITLE,
		fileName: normalizedFileName,
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
