import { read, utils } from "xlsx";
import { STATUS, FILES_HANDLERS } from "../../../constants";

const handleHalvesForStatistics = (fileData) => {
	try {
		if (!fileData) {
			return { status: STATUS.FINISHED, data: {} };
		}

		const wb = read(fileData, FILES_HANDLERS.READ_OPTIONS);
		const col_index_ae = utils.decode_col(
			FILES_HANDLERS.FILE_CHECK_TEXT.COLUMN_NAME
		);
		let handlerResult = {};

		for (const [key, value] of Object.entries(wb.Sheets)) {
			if (key === FILES_HANDLERS.FILE_CHECK_TEXT.SKIP_SHEETS) {
				continue;
			}

			const data = utils.sheet_to_json(value, FILES_HANDLERS.JSON_OPTIONS);
			let stIndx = 0;
			let fnIndx = 0;
			let checkArr = [];

			data?.find((row, index) => {
				if (row[col_index_ae] === FILES_HANDLERS.FILE_CHECK_TEXT.START_VAL) {
					stIndx = index;
				}
				if (row[col_index_ae] === FILES_HANDLERS.FILE_CHECK_TEXT.END_VAL) {
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
					firstHalf: row[30]?.toFixed(1),
				};
				checkArr.push(dataObj);
			});

			handlerResult[key] = checkArr;
		}

		return { status: STATUS.FINISHED, data: handlerResult };
	} catch (err) {
		return { status: STATUS.ERROR, message: err?.message };
	}
};

export default handleHalvesForStatistics;
