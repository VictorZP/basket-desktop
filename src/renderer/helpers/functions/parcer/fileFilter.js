import { read, utils, write } from "xlsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import { CHANNELS } from "../../../../common/constants/channels.js";

import {
	PARCER_TEXT,
	FILTER_TEXT,
	FILTER_GROUPS,
} from "../../../constants/parcer";

const readOpts = {
	raw: true,
	cellText: false,
	cellDates: true,
};

const jsonOpts = {
	header: 1,
};

const fileFilter = async (file, filterArr = []) => {
	try {
		const wbFromFile = read(file, readOpts);
		const ws = wbFromFile.Sheets[wbFromFile.SheetNames[0]];
		const data = utils.sheet_to_json(ws, jsonOpts);
		const filteredWb = utils.book_new();

		FILTER_GROUPS.forEach((obj) => {
			const filteredMatches = [];

			const groupName = `${obj?.base} ${obj?.group}`;

			// массив отфильтрованих по группам чемпионтаов
			const sortedArr = filterArr?.filter((item) => {
				return item?.baseName === obj?.base && item?.group === obj?.group;
			});

			if (sortedArr.length === 0) {
				return;
			} else {
				sortedArr?.forEach((sortGroup) => {
					// отфильрованные с файла матчи
					const matches = data?.filter((item) => {
						return item?.includes(sortGroup.champName);
					});

					filteredMatches.push(...matches);
				});
			}

			const wbSheets = utils.aoa_to_sheet([...filteredMatches], {
				skipHeader: true,
			});
			utils.book_append_sheet(filteredWb, wbSheets, groupName);
		});

		const date = new Date();
		const normalizeDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
		const fileName = `${FILTER_TEXT.FILE_NAME}-${normalizeDate}.xlsx`;

		const dialogData = {
			title: PARCER_TEXT.SAVE_TITLE,
			defaultPath: process.env.USERPROFILE + "\\Downloads\\" + fileName,
			filters: [
				{
					name: ".xlsx",
					extensions: ["xlsx", "xls"],
				},
			],
		};

		const exportWB = write(filteredWb, {
			bookType: "xlsx",
			type: "buffer",
		});

		const dialogArgs = {
			dialogData,
			file: exportWB,
		};

		await ipcRenderer.invoke(CHANNELS.DIALOG.SAVE_FILE, dialogArgs);
	} catch (err) {
		return err;
	}
};

export default fileFilter;
