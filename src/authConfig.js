const fs = require("fs");
const path = require("path");
const { LogLevel } = require("@azure/msal-node");

const rawConfigData = fs.readFileSync(
	path.join(__dirname, "./data/config.json")
);
const config = JSON.parse(rawConfigData);

const AAD_ENDPOINT_HOST = "https://login.microsoftonline.com/";

const msalConfig = {
	auth: {
		clientId: config.CLIENT_ID,
		authority: `${AAD_ENDPOINT_HOST}common`,
	},
	system: {
		loggerOptions: {
			loggerCallback(loglevel, message, containsPii) {},
			piiLoggingEnabled: false,
			logLevel: LogLevel.Verbose,
		},
	},
};

const GRAPH_ENDPOINT_HOST = "https://graph.microsoft.com/";

const protectedResources = {
	graphDocs: {
		endpoint: `${GRAPH_ENDPOINT_HOST}v1.0/me/drive/root/`,
		scopes: ["Files.ReadWrite"],
	},
	downloadFile: {
		endpoint: `${GRAPH_ENDPOINT_HOST}v1.0/me/drive/items/`,
		scopes: ["Files.ReadWrite"],
	},
};

module.exports = {
	msalConfig: msalConfig,
	protectedResources: protectedResources,
};
