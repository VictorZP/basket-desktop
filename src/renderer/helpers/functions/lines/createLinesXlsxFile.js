import { utils, write } from "xlsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import { LINES_TEXT } from "../../../constants/lines.js";
import { CHANNELS } from "../../../../common/constants/channels.js";
import { CYBER_LIST_LINES } from "../../../constants/cyberList.js";

export const createLinesXlsxFile = async (linesData) => {
	const workbook = utils.book_new();

	let worksheet = utils.aoa_to_sheet([]);
	let columnNumber = 0;
	let maxRows = 0;

	const orderedEventsList = [];

	//	Order events by cyber name
	CYBER_LIST_LINES.forEach((cyberName) => {
		const cyberEvents = linesData.data.find(
			(item) => item.cyberName === cyberName
		);

		if (cyberEvents?.events?.length > 0) {
			orderedEventsList.push(cyberEvents);
		}
	});

	// Set cyber names as headers in the first row
	orderedEventsList.forEach((item) => {
		// Check if the events array is not empty
		if (item.events.length > 0) {
			let rowsCounter = 0;
			// Set cyber name as header
			let cell = { v: item.cyberName, t: "s" };
			let cellRef = utils.encode_cell({ r: 0, c: columnNumber });
			worksheet[cellRef] = cell;

			// Set event info as rows
			item.events.forEach((event, index) => {
				if (rowsCounter === 15) {
					const emptyCell = { v: "", t: "s" };
					const emptyCellRef = utils.encode_cell({
						r: index + 1,
						c: columnNumber,
					});
					worksheet[emptyCellRef] = emptyCell;
					rowsCounter = 0;
				} else {
					const startCell = { v: event.startTime, t: "s" };
					const champCell = {
						v:
							event.champName !== "-"
								? event.champName
								: event.betsChampionship,
						t: "s",
					};
					const homeTeamCell = {
						v: event.homeName !== "-" ? event.homeName : event.homeTeamName,
						t: "s",
					};
					const awayTeamCell = {
						v: event.awayName !== "-" ? event.awayName : event.awayTeamName,
						t: "s",
					};
					const handicapCell = { v: event.handicap, t: "s" };
					const OUCell = { v: event.OU, t: "s" };

					const startCellRef = utils.encode_cell({
						r: index + 1,
						c: columnNumber,
					});
					const champCellRef = utils.encode_cell({
						r: index + 1,
						c: columnNumber + 1,
					});
					const homeTeamCellRef = utils.encode_cell({
						r: index + 1,
						c: columnNumber + 2,
					});
					const awayTeamCellRef = utils.encode_cell({
						r: index + 1,
						c: columnNumber + 3,
					});
					const handicapCellRef = utils.encode_cell({
						r: index + 1,
						c: columnNumber + 4,
					});
					const OUCellRef = utils.encode_cell({
						r: index + 1,
						c: columnNumber + 5,
					});

					worksheet[startCellRef] = startCell;
					worksheet[champCellRef] = champCell;
					worksheet[homeTeamCellRef] = homeTeamCell;
					worksheet[awayTeamCellRef] = awayTeamCell;
					worksheet[OUCellRef] = OUCell;
					worksheet[handicapCellRef] = handicapCell;

					rowsCounter += 1;
				}
			});

			columnNumber += 7;
			if (maxRows < item.events.length) {
				maxRows = item.events.length + 1;
			}
		}
	});

	// Update the '!ref' property of the worksheet to include the new cells
	worksheet["!ref"] = utils.encode_range({
		s: { r: 0, c: 0 },
		e: { r: maxRows, c: columnNumber + 1 },
	});

	// Append the worksheet to the workbook
	utils.book_append_sheet(workbook, worksheet, LINES_TEXT.LINES);

	// Write the workbook to a file
	const wb = write(workbook, { bookType: "xlsx", type: "buffer" });

	let timeString = "";
	switch (true) {
		case linesData?.start !== null && linesData?.end !== null:
			timeString = ` с ${linesData?.start.replace(
				":",
				"-"
			)} до ${linesData?.end.replace(":", "-")}`;
			break;
		case linesData?.start !== null && !linesData?.end:
			timeString = ` с ${linesData?.start.replace(":", "-")}`;
			break;
		case !linesData?.start && linesData?.end !== null:
			timeString = `до ${linesData?.end.replace(":", "-")}`;
			break;

		default:
			break;
	}

	const fileName = `${LINES_TEXT.TITLE}${linesData?.title}${timeString}`;

	const dialogData = {
		title: LINES_TEXT.SAVE_MODAL_TITLE,
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
