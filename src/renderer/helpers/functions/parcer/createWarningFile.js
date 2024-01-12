import { utils, write } from "xlsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import { PARCER_TEXT } from "../../../constants/parcer.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

export const createWarningFile = async (data, fileName) => {
	const workbook = utils.book_new();

	const dataForWs = data?.map((row) => {
		return {
			status: row?.status ? row.status : "",
			message: row?.message ? row.message : "",
			link: row?.link ? row.link : "",
			tooltip: row?.link ? PARCER_TEXT.HYPERLINK_TITLE : "",
		};
	});

	const ws = utils.json_to_sheet(dataForWs, { skipHeader: true });

	//	Длина для столбцов
	const messageMaxWidth = dataForWs.reduce(
		(w, r) => Math.max(w, r.message.length),
		5
	);
	const linkMaxWidth = dataForWs.reduce(
		(w, r) => Math.max(w, r.link?.length || 20),
		5
	);
	ws["!cols"] = [
		{ wch: 12 },
		{ wch: messageMaxWidth },
		{ wch: linkMaxWidth },
		{ wch: 20 },
	];

	//	Если присутствует ссылка на матч, добавлять гипер-ссылку
	dataForWs?.forEach((row, index) => {
		if (row?.link) {
			ws[`D${index + 1}`].l = {
				Target: typeof row?.link === "string" ? row.link : "",
				Tooltip:
					typeof row?.link === "string" ? PARCER_TEXT.HYPERLINK_TOOLTIP : "",
			};
		}
	});

	utils.book_append_sheet(workbook, ws, PARCER_TEXT.SHEET_NAME);

	const normalizedFileName = `${PARCER_TEXT.FILE_NAME.ERR_REPORT}-${fileName
		?.split(" ")
		?.at(0)}`;

	const dialogData = {
		title: PARCER_TEXT.SAVE_TITLE,
		fileName: normalizedFileName,
		filters: [
			{
				name: ".xlsx",
				extensions: ["xlsx", "xls"],
			},
		],
	};

	const wb = write(workbook, { bookType: "xlsx", type: "buffer" });

	const dialogArgs = {
		dialogData,
		file: wb,
	};

	try {
		await ipcRenderer.invoke(CHANNELS.DIALOG.SAVE_FILE, dialogArgs);
	} catch (err) {
		return err;
	}
};
