import { read, utils } from "xlsx";

import { STATUS, FILES_HANDLERS, WARNING_MESSAGE } from "../../../constants";

const handleTempFile = (file) => {
	if (!file) {
		return { status: STATUS.WARNING, message: WARNING_MESSAGE.NO_TEMP_FILE };
	}
	try {
		const wb = read(file, FILES_HANDLERS.TEMP_READ_OPTIONS);
		const worksheet = wb.Sheets["Line"];
		const lineData = utils.sheet_to_json(
			worksheet,
			FILES_HANDLERS.JSON_OPTIONS
		);
		let lineResult = [];

		lineData?.forEach((row) => {
			if (!row[2]) {
				return;
			}

			let obj = {
				championship: row[2],
				homeTeam: row[3],
				awayTeam: row[4],
				temp: row[9],
				total: row[6] || 0,
				colO: row[14] || "-",
				colP: row[15] || "-",
			};

			lineResult.push(obj);
		});

		const predictWS = wb.Sheets["Predict"];
		const predictData = utils.sheet_to_json(
			predictWS,
			FILES_HANDLERS.JSON_OPTIONS
		);
		let predictResult = [];

		predictData?.forEach((row) => {
			if (!row[1]) {
				return;
			}

			let obj = {
				championship: row[2],
				homeTeam: row[3],
				awayTeam: row[4],
				predict: row[8],
			};

			predictResult.push(obj);
		});

		return {
			status: STATUS.FINISHED,
			data: { lines: lineResult, predict: predictResult },
		};
	} catch (err) {
		return { status: STATUS.ERROR, message: err?.message };
	}
};

export default handleTempFile;
