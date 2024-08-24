import { utils, write } from "xlsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import { CHANNELS } from "../../../../common/constants";
import { BETTING_RESULTS_CONSTANTS } from "../../../constants";

const createBettingResultsXlsxFile = async (resultsData) => {
	const { FILE_TEXT } = BETTING_RESULTS_CONSTANTS;
	const workbook = utils.book_new();

	const formattedData = resultsData?.data?.map((row) => {
		return {
			matchDate: row?.matchDate ?? "",
			championship: row?.championship ?? "",
			homeTeam: row?.homeTeam ?? "",
			awayTeam: row?.awayTeam ?? "",
			temp: row?.temp || 0,
			calcTemp: row?.calcTemp || 0,
			deviation: row?.deviation || 0,
			totalSecondHalf: row?.totalSecondHalf || 0,
			totalInMoment: row?.totalInMoment || 0,
			matchDiff: row?.matchDiff || 0,
			homeScore: row?.homeScore || 0,
			awayScore: row?.awayScore || 0,
			url: row?.url ?? "",
			tooltip: row?.url ? FILE_TEXT.HYPERLINK_TITLE : "",
		};
	});

	const ws = utils.json_to_sheet(formattedData, { skipHeader: true });

	// Column width
	const matchDateMaxWidth = formattedData.reduce(
		(w, r) => Math.max(w, r.matchDate.length),
		5
	);
	const championshipMaxWidth = formattedData.reduce(
		(w, r) => Math.max(w, r.championship.length),
		5
	);
	const homeTeamMaxWidth = formattedData.reduce(
		(w, r) => Math.max(w, r.homeTeam.length),
		5
	);
	const awayTeamMaxWidth = formattedData.reduce(
		(w, r) => Math.max(w, r.awayTeam.length),
		5
	);
	const urlMaxWidth = formattedData.reduce(
		(w, r) => Math.max(w, r.url.length),
		5
	);
	ws["!cols"] = [
		{ wch: matchDateMaxWidth },
		{ wch: championshipMaxWidth },
		{ wch: homeTeamMaxWidth },
		{ wch: awayTeamMaxWidth },
		{ wch: 5 },
		{ wch: 5 },
		{ wch: 6 },
		{ wch: 5 },
		{ wch: 5 },
		{ wch: 5 },
		{ wch: 5 },
		{ wch: 5 },
		{ wch: urlMaxWidth },
		{ wch: 20 },
	];

	//  If there is a link to the match, add a hyperlink
	formattedData?.forEach((row, index) => {
		if (row?.url) {
			ws[`N${index + 1}`].l = {
				Target: row.url,
				Tooltip: FILE_TEXT.HYPERLINK_TOOLTIP,
			};
		}
	});

	utils.book_append_sheet(workbook, ws, FILE_TEXT.SHEET_NAME);

	const wb = write(workbook, { bookType: "xlsx", type: "buffer" });

	let timeString = "";
	switch (true) {
		case resultsData?.start !== "-" &&
			resultsData?.start !== null &&
			resultsData?.end !== null &&
			resultsData?.end !== "-":
			timeString = ` с ${resultsData?.start} до ${resultsData?.end}`;
			break;
		case resultsData?.start !== "-" &&
			resultsData?.start !== null &&
			(resultsData?.end === "-" || resultsData?.end === null):
			timeString = ` с ${resultsData?.start}`;
			break;
		case (resultsData?.start === "-" || resultsData?.start === null) &&
			resultsData?.end !== "-" &&
			resultsData?.end !== null:
			timeString = `до ${resultsData?.end}`;
			break;

		default:
			break;
	}

	const fileName = `${FILE_TEXT.FILE_NAME}${timeString}`;

	const dialogData = {
		title: FILE_TEXT.SAVE_TITLE,
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

export default createBettingResultsXlsxFile;
