import { read, utils } from "xlsx";

import { STATUS, FILES_HANDLERS, WARNING_MESSAGE } from "../../../constants";

const handleTempFile = (file) => {
	if (!file) {
		return { status: STATUS.WARNING, message: WARNING_MESSAGE.NO_TEMP_FILE };
	}
	try {
		const wb = read(file, FILES_HANDLERS.TEMP_READ_OPTIONS);
		const worksheet = wb.Sheets["Line"];
		const data = utils.sheet_to_json(worksheet, FILES_HANDLERS.JSON_OPTIONS);
		let result = [];

		data?.forEach((row) => {
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

			result.push(obj);
		});

		return { status: STATUS.FINISHED, data: result };
	} catch (err) {
		return { status: STATUS.ERROR, message: err?.message };
	}
};

export default handleTempFile;
