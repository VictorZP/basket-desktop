import { read, utils } from "xlsx";

import { STATUS, FILES_HANDLERS } from "../../../constants";

const handleTempFile = async (file) => {
	try {
		const fileBuffer = await file.arrayBuffer();
		const wb = read(fileBuffer, FILES_HANDLERS.TEMP_READ_OPTIONS);
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
