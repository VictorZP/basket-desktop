const { LogLevel } = require("@azure/msal-node");

const AAD_ENDPOINT_HOST = "https://login.microsoftonline.com/";

const msalConfig = {
	auth: {
		clientId: "fb53c7b4-5996-452c-9684-f4a8bbb247d6",
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
		endpoint: `${GRAPH_ENDPOINT_HOST}v1.0/me/drive/root/children`,
		scopes: ["Files.ReadWrite"],
	},
};

module.exports = {
	msalConfig: msalConfig,
	protectedResources: protectedResources,
};
