import { utils, write } from "xlsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import { PARCER_TEXT, ANALYZE_TEXT } from "../../../constants/parcer.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

export const createXlsxDoc = async (data) => {
	const workbook = utils.book_new();

	const matchResult = [];
	const matchQuartersResult = [];

	data.forEach((match) => {
		const dateForTable = `${match?.matchDate?.day}.${match?.matchDate?.month}.${match?.matchDate?.year}`;
		const team1 = match?.matchResults[0];
		const team2 = match?.matchResults[1];
		const quartersResult = (index) => {
			return match?.quarters
				?.map((quarter) => quarter?.split("-")[index])
				?.reduce((prev, next) => Number(prev) + Number(next), 0);
		};
		const quartersResultArr = [];
		const quartersArr = match?.quarters?.map((quarter) => quarter?.split("-"));
		quartersArr?.forEach((item) => quartersResultArr.push(...item));
		const quartersResultArrNumber = quartersResultArr?.map((item) =>
			Number(item)
		);
		if (quartersArr?.length < 5) {
			quartersResultArrNumber.push("", "");
		}
		const team1QuartersSum = quartersResult(0)
			? quartersResult(0)
			: [ANALYZE_TEXT.noData];
		const team2QuartersSum = quartersResult(1)
			? quartersResult(1)
			: [ANALYZE_TEXT.noData];
		const team1MatchResult = [];
		const team2MatchResult = [];
		const quartersData = [];
		if (team1 && team1?.results?.cellK !== 0) {
			const team1MatchResArr = [
				team1?.results?.cellE,
				team1?.results?.cellF,
				team1?.results?.cellG,
				team1?.results?.cellH,
				team1?.results?.cellI,
				team1?.results?.cellJ,
				team1?.results?.cellK,
				team1?.results?.cellL,
				team1?.results?.cellM,
				team1?.results?.cellN,
				team2?.teamName,
				team1?.results?.cellP,
				team1?.results?.cellQ,
			];
			team1MatchResult?.push(...team1MatchResArr);
		} else if (!team1 || team1?.results?.cellK === 0) {
			const team1MatchResArr = [
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				team2?.teamName,
				"",
				"",
				ANALYZE_TEXT.noData,
			];
			team1MatchResult?.push(...team1MatchResArr);
		}
		if (team2 && team2?.results?.cellK !== 0) {
			const team2MatchResArr = [
				team2?.results?.cellE,
				team2?.results?.cellF,
				team2?.results?.cellG,
				team2?.results?.cellH,
				team2?.results?.cellI,
				team2?.results?.cellJ,
				team2?.results?.cellK,
				team2?.results?.cellL,
				team2?.results?.cellM,
				team2?.results?.cellN,
				team1?.teamName,
				team2?.results?.cellP,
				team2?.results?.cellQ,
			];
			team2MatchResult?.push(...team2MatchResArr);
		} else if (!team2 || team2?.results?.cellK === 0) {
			const team2MatchResArr = [
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				team1?.teamName,
				"",
				"",
				ANALYZE_TEXT.noData,
			];
			team2MatchResult?.push(...team2MatchResArr);
		}
		const matchData1 = [
			dateForTable,
			match?.championship,
			team1?.teamName,
			"H",
			...team1MatchResult,
		];
		const matchData2 = [
			dateForTable,
			match?.championship,
			team2?.teamName,
			"A",
			...team2MatchResult,
		];
		if (quartersResult(0) && quartersResult(0) !== 0) {
			const result = [
				dateForTable,
				match?.championship,
				team1?.teamName,
				team2?.teamName,
				...quartersResultArrNumber,
				team1QuartersSum,
				team2QuartersSum,
			];
			quartersData?.push(...result);
		} else {
			const result = [
				dateForTable,
				match?.championship,
				team1?.teamName,
				team2?.teamName,
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				ANALYZE_TEXT.noData,
			];
			quartersData?.push(...result);
		}
		matchResult.push(matchData1);
		matchResult.push(matchData2);
		matchQuartersResult.push(quartersData);
	});

	const ws = utils.aoa_to_sheet([...matchResult], { skipHeader: true });
	const quartersWs = utils.aoa_to_sheet([...matchQuartersResult], {
		skipHeader: true,
	});
	utils.book_append_sheet(workbook, ws, PARCER_TEXT.FILE_NAME.CHAMPIONSHIPS);
	utils.book_append_sheet(workbook, quartersWs, PARCER_TEXT.FILE_NAME.QUARTERS);

	const date = new Date();
	const normalizeDate = `${date.getDate()}.${
		date.getMonth() + 1
	}.${date.getFullYear()}`;

	const fileName = `${PARCER_TEXT.FILE_NAME.STATISTICS}-${normalizeDate}`;

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
