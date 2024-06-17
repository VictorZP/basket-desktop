const { ipcMain } = require("electron");

const getGraphClient = require("../../graph");
const { protectedResources } = require("../../authConfig");
const { CHANNELS } = require("../../common/constants/channels");
const { STATUS } = require("../../common/constants/index");

const authHandlers = (authProvider) => {
	ipcMain.handle(CHANNELS.MICROSOFT.IS_USER_AUTHENTICATED, async () => {
		try {
			const isUserAuthenticated = await authProvider.getAccount();
			return {
				status: STATUS.SUCCESS,
				isAuthenticated: !!isUserAuthenticated,
			};
		} catch (err) {
			return {
				status: STATUS.ERROR,
				message: err.message,
			};
		}
	});

	ipcMain.handle(CHANNELS.MICROSOFT.LOGIN, async () => {
		try {
			const account = await authProvider.login();

			return {
				status: STATUS.SUCCESS,
				token: account.idToken,
			};
		} catch (err) {
			return {
				status: STATUS.ERROR,
				message: err.message,
			};
		}
	});

	ipcMain.handle(CHANNELS.MICROSOFT.LOGOUT, async () => {
		try {
			await authProvider.logout();
			return {
				status: STATUS.SUCCESS,
			};
		} catch (err) {
			return {
				status: STATUS.ERROR,
				message: err.message,
			};
		}
	});

	ipcMain.handle(CHANNELS.MICROSOFT.GET_ONEDRIVE_DOCS, async () => {
		try {
			const tokenRequest = {
				scopes: protectedResources.graphDocs.scopes,
			};

			const tokenResponse = await authProvider.getToken(tokenRequest);

			const graphResponse = await getGraphClient(tokenResponse.accessToken)
				.api(`${protectedResources.graphDocs.endpoint}`)
				.get();

			return { tokenResponse, graphResponse };
		} catch (err) {
			return err;
		}
	});
};

module.exports = authHandlers;
