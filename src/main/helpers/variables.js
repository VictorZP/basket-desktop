const fs = require("fs");
const path = require("path");

const mode = process.env.NODE_ENV;

let config;

if (mode !== "production") {
	config = {
		MAIN_ADDRESS: "localhost",
		MAIN_WS_PARSER_ADDRESS: "localhost",
		PORT: "8000",
		WS_PARSER_PORT: "8010",
	};
} else {
	const rawConfigData = fs.readFileSync(
		path.join(__dirname, "./data/config.json")
	);
	config = JSON.parse(rawConfigData);
}

const ADDRESS = config.MAIN_ADDRESS;
const WS_ADDRESS = config.MAIN_WS_PARSER_ADDRESS;
const PORT = config.PORT;
const WS_PORT = config.WS_PARSER_PORT;

module.exports = {
	ADDRESS,
	WS_ADDRESS,
	PORT,
	WS_PORT,
};
