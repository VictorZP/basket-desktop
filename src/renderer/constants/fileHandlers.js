const READ_OPTIONS = {
	raw: true,
	cellText: false,
	cellDates: true,
};

const TEMP_READ_OPTIONS = {
	type: "buffer",
};

const JSON_OPTIONS = {
	header: 1,
};

const FILE_CHECK_TEXT = {
	SKIP_SHEETS: "ChampLIST",
	COLUMN_NAME: "AE",
	COLUMN_NAME_AG: "AG",
	START_VAL: "1H",
	END_VAL: "WIN",
	TEMP_COLUMN_NAME: "J",
};

export default {
	READ_OPTIONS,
	JSON_OPTIONS,
	FILE_CHECK_TEXT,
	TEMP_READ_OPTIONS,
};
