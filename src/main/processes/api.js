const axios = require("axios");

const { ADDRESS, PORT } = require("../helpers/variables.js");

const api = () => {
	axios.defaults.baseURL = `http://${ADDRESS}:${PORT}/api/v1`;
};

module.exports = { api };
