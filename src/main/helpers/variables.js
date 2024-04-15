const fs = require("fs");
const path = require("path");

const rawConfigData = fs.readFileSync(
	path.join(__dirname, "./data/config.json")
);
const config = JSON.parse(rawConfigData);

const PORT = config.PORT;
const WS_PORT = config.WS_PARSER_PORT;

module.exports = {
	PORT,
	WS_PORT,
};
