import { utils, write } from "xlsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import { CHANNELS } from "../../../../common/constants/channels.js";

export const createHalvesCompareXlsxFile = async (responseData) => {
	const { data, title } = responseData;
	const workbook = utils.book_new();
	const date = title.split("_")?.at(0);

	let worksheet = utils.aoa_to_sheet([]);

	// Order data by championship name
	const orderedData = data
		.sort((a, b) => {
			if (a.championship < b.championship) return -1;
			if (a.championship > b.championship) return 1;
			return 0;
		})
		.map((item) => {
			let formattedBetResult;

			switch (item.currentBetResult) {
				case "less":
					formattedBetResult = "UNDER";
					break;
				case "more":
					formattedBetResult = "OVER";
					break;
				case "not":
					formattedBetResult = "No Bet";
					break;
				default:
					formattedBetResult = item.currentBetResult;
			}

			return {
				Date: date,
				Championship: item.championship,
				"Home Team": item.homeTeam,
				"Away Team": item.awayTeam,
				"Result 1Half": item.firstHalf,
				"Total Second Half": item.totalSecondHalf,
				"Total In Moment": item.totalInMoment,
				"Bet Result": formattedBetResult,
				"Percent Av": item.percentAv,
				"Match Result": item.matchResult,
			};
		});

	worksheet = utils.json_to_sheet(orderedData);

	const formattedTitle = title.replaceAll(" ", "_")?.replaceAll("/", "-");
	const fileName = `${formattedTitle}.xlsx`;

	utils.book_append_sheet(workbook, worksheet, "Статистика из половин");

	// Write the workbook to a file
	const wb = write(workbook, {
		bookType: "xlsx",
		type: "buffer",
	});

	const dialogData = {
		title: "Сохранить файл",
		fileName: fileName,
		filters: [
			{
				name: ".xlsx",
				extensions: ["xlsx", "xls"],
			},
		],
	};

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
