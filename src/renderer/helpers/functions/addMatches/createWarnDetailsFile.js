import { utils, write } from "xlsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import { CONSTANTS } from "../../../constants/matchesPage.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

//  Создает файл формата txt, который содержит сообщения о предупреждениях/ошибках
//  придобавлении матчей для анализа.
const createWarnDetailsFile = async (data) => {
	const workbook = utils.book_new();

	const dataForWs = data?.map((row) => {
		return {
			status: row?.status ? row.status : "",
			message: row?.message ? row.message : "",
			link: row?.link ? row.link : "",
			tooltip: row?.link ? CONSTANTS.HYPERLINK_TITLE : "",
		};
	});

	const ws = utils.json_to_sheet(dataForWs, { skipHeader: true });

	//	Длина для столбцов
	const messageMaxWidth = dataForWs.reduce(
		(w, r) => Math.max(w, r.message.length),
		5
	);
	const linkMaxWidth = dataForWs.reduce(
		(w, r) => Math.max(w, r.link.length),
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
				Target: row.link,
				Tooltip: CONSTANTS.HYPERLINK_TOOLTIP,
			};
		}
	});

	utils.book_append_sheet(workbook, ws, CONSTANTS.SHEET_NAME);

	const dialogData = {
		title: CONSTANTS.SAVE_TITLE,
		fileName: CONSTANTS.FILE_NAME,
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

export default createWarnDetailsFile;
