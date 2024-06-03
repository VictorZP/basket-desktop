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
	COLUMN_NAME: "AE",
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
