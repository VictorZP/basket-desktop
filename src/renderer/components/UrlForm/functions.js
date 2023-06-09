import { read, utils } from "xlsx";

const readOpts = {
	raw: true,
	cellText: false,
	cellDates: true,
};

const jsonOpts = {
	header: 1,
};

const TEXT = {
	COLUMN_NAME: "AE",
	START_VAL: "1H",
	END_VAL: "WIN",
};

export const handleFile = async (file) => {
	try {
		const fileBuffer = await file.arrayBuffer();
		const wb = read(fileBuffer, readOpts);
		const col_index = utils.decode_col(TEXT.COLUMN_NAME);
		let checkObj = {};

		for (const [key, value] of Object.entries(wb.Sheets)) {
			const data = utils.sheet_to_json(value, jsonOpts);
			let stIndx = 0;
			let fnIndx = 0;
			let checkArr = [];

			data?.find((row, index) => {
				if (row[col_index] === TEXT.START_VAL) {
					stIndx = index;
				}
				if (row[col_index] === TEXT.END_VAL) {
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

		return checkObj;
	} catch (error) {
		console.log(error);
	}
};
