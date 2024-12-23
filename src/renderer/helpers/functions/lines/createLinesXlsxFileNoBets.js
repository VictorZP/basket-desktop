import { utils, write } from "xlsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import { LINES_TEXT } from "../../../constants/lines.js";
import { CHANNELS } from "../../../../common/constants/channels.js";
import { CYBER_LIST_LINES } from "../../../constants/cyberList.js";

export const createLinesXlsxFileNoBets = async (
	linesData = [],
	dateString = ""
) => {
	if (linesData.length === 0) {
		return { status: "empty" };
	}

	const dataForFile = [];

	// Filter data to get only games with no bets field or where total is 0
	const filteredData = linesData.filter(
		(game) => game?.noBets === true || game?.total === 0
	);

	if (filteredData?.length === 0) {
		return { status: "empty" };
	}

	//  Format data for file
	CYBER_LIST_LINES.forEach((cyber) => {
		const filteredGames = filteredData
			.filter((game) => game?.homeTeam?.teamCyber?.name === cyber)
			?.sort(
				(a, b) => a?.homeTeam?.teamChamp?.name - b?.homeTeam?.teamChamp?.name
			);

		if (filteredGames?.length > 0)
			dataForFile.push({ cyber, events: filteredGames });
	});

	const workbook = utils.book_new();
	let worksheet = utils.aoa_to_sheet([]);

	let columnNumber = 0;
	let maxRows = 0;

	dataForFile.forEach((item) => {
		let rowsCounter = 0;
		let orderedIndex = 1; // Index for ordered events

		// Set cyber name as header
		let cell = { v: item.cyber, t: "s" };
		let cellRef = utils.encode_cell({ r: 0, c: columnNumber });
		worksheet[cellRef] = cell;

		// Set event info as rows
		item.events.forEach((event) => {
			if (rowsCounter === 15) {
				const emptyCell = { v: "", t: "s" };
				const emptyCellRef = utils.encode_cell({
					r: orderedIndex,
					c: columnNumber,
				});
				worksheet[emptyCellRef] = emptyCell;

				rowsCounter = 0;
				orderedIndex += 1;
			}

			const champCell = {
				v: event.homeTeam.teamChamp.name,
				t: "s",
			};
			const homeTeamCell = {
				v: event?.homeTeam?.teamName,
				t: "s",
			};
			const awayTeamCell = {
				v: event?.awayTeam?.teamName,
				t: "s",
			};
			const handicapCell = { v: "-", t: "s" };
			const OUCell = { v: "-", t: "s" };
			const totalPointsHalfCell = { v: "-", t: "s" };

			const champCellRef = utils.encode_cell({
				r: orderedIndex,
				c: columnNumber,
			});
			const homeTeamCellRef = utils.encode_cell({
				r: orderedIndex,
				c: columnNumber + 1,
			});
			const awayTeamCellRef = utils.encode_cell({
				r: orderedIndex,
				c: columnNumber + 2,
			});
			const handicapCellRef = utils.encode_cell({
				r: orderedIndex,
				c: columnNumber + 3,
			});
			const OUCellRef = utils.encode_cell({
				r: orderedIndex,
				c: columnNumber + 4,
			});
			const totalPointsHalfCellRef = utils.encode_cell({
				r: orderedIndex,
				c: columnNumber + 5,
			});

			worksheet[champCellRef] = champCell;
			worksheet[homeTeamCellRef] = homeTeamCell;
			worksheet[awayTeamCellRef] = awayTeamCell;
			worksheet[handicapCellRef] = handicapCell;
			worksheet[OUCellRef] = OUCell;
			worksheet[totalPointsHalfCellRef] = totalPointsHalfCell;

			rowsCounter += 1;
			orderedIndex += 1;
		});

		columnNumber += 7;
		if (maxRows < item.events.length) {
			maxRows = item.events.length;
		}
	});

	// Update the '!ref' property of the worksheet to include the new cells
	worksheet["!ref"] = utils.encode_range({
		s: { r: 0, c: 0 },
		e: { r: maxRows, c: columnNumber },
	});

	// Append the worksheet to the workbook
	utils.book_append_sheet(workbook, worksheet, LINES_TEXT.ORANGE_LINES);

	// Write workbook to file
	const wb = await write(workbook, { bookType: "xlsx", type: "buffer" });

	const fileName = `${LINES_TEXT.ORANGE_TITLE}${dateString}`;

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
		return { status: "error", err };
	}
};
