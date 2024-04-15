const axios = require("axios");
const Store = require("electron-store");
const fs = require("fs");
const path = require("path");

const { STORAGE_KEYS } = require("../../common/constants/index.js");

let store = new Store();

const address = store.get(STORAGE_KEYS.ADDRESS) ?? "";

const rawConfigData = fs.readFileSync(
	path.join(__dirname, "./data/config.json")
);
const config = JSON.parse(rawConfigData);

const api = () => {
	axios.defaults.baseURL = `http://${address}:${config.PORT}/api/v1`;
};

module.exports = { api };
