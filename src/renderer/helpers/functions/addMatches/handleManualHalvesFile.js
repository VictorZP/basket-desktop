import { read, utils } from "xlsx";

import { STATUS, FILES_HANDLERS } from "../../../constants";

const handleManualHalvesFile = async (file) => {
	if (!file) {
		return null;
	}

	try {
		const fileBuffer = await file.arrayBuffer();
		const wb = read(fileBuffer, FILES_HANDLERS.READ_OPTIONS);
		const col_index = utils.decode_col(
			FILES_HANDLERS.FILE_CHECK_TEXT.COLUMN_NAME
		);
		let checkObj = {};

		for (const [key, value] of Object.entries(wb.Sheets)) {
			const data = utils.sheet_to_json(value, FILES_HANDLERS.JSON_OPTIONS);
			let stIndx = 0;
			let fnIndx = 0;
			let checkArr = [];

			data?.find((row, index) => {
				if (row[col_index] === FILES_HANDLERS.FILE_CHECK_TEXT.START_VAL) {
					stIndx = index;
				}
				if (row[col_index] === FILES_HANDLERS.FILE_CHECK_TEXT.END_VAL) {
					fnIndx = index;
				}
			});

			const slicedData = data?.slice(stIndx + 1, fnIndx);

			slicedData?.forEach((row) => {
				if (!row[29]) {
					return;
				}
				const dataObj = {
					teamName: row[29],
					val: row[32]?.toFixed(1),
				};
				checkArr.push(dataObj);
			});

			checkObj[key] = checkArr;
		}

		return { status: STATUS.FINISHED, data: checkObj };
	} catch (err) {
		return { status: STATUS.ERROR, message: err?.message };
	}
};

export default handleManualHalvesFile;
