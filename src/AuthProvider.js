const {
	PublicClientApplication,
	InteractionRequiredAuthError,
} = require("@azure/msal-node");
const { shell } = require("electron");

class AuthProvider {
	msalConfig;
	clientApplication;
	account;
	cache;

	constructor(msalConfig) {
		this.msalConfig = msalConfig;
		this.clientApplication = new PublicClientApplication(this.msalConfig);
		this.cache = this.clientApplication.getTokenCache();
		this.account = null;
	}

	async login() {
		try {
			const authResponse = await this.getToken({
				scopes: [],
			});

			return this.handleResponse(authResponse);
		} catch (err) {
			throw err;
		}
	}

	async logout() {
		if (!this.account) return;

		try {
			if (this.account.idTokenClaims.hasOwnProperty("login_hint")) {
				await shell.openExternal(
					`${
						this.msalConfig.auth.authority
					}/oauth2/v2.0/logout?logout_hint=${encodeURIComponent(
						this.account.idTokenClaims.login_hint
					)}`
				);
			}

			await this.cache.removeAccount(this.account);
			this.account = null;
		} catch (err) {
			throw err;
		}
	}

	async getToken(tokenRequest) {
		let authResponse;
		try {
			const account = this.account || (await this.getAccount());

			if (account) {
				tokenRequest.account = account;
				authResponse = await this.getTokenSilent(tokenRequest);
			} else {
				authResponse = await this.getTokenInteractive(tokenRequest);
			}

			return authResponse || null;
		} catch (err) {
			throw err;
		}
	}

	async getTokenSilent(tokenRequest) {
		try {
			const token = await this.clientApplication.acquireTokenSilent(
				tokenRequest
			);
			return token;
		} catch (err) {
			if (err instanceof InteractionRequiredAuthError) {
				return await this.getTokenInteractive(tokenRequest);
			}

			throw err;
		}
	}

	async getTokenInteractive(tokenRequest) {
		try {
			const openBrowser = async (url) => {
				await shell.openExternal(url);
			};

			const authResponse = await this.clientApplication.acquireTokenInteractive(
				{
					...tokenRequest,
					openBrowser,
				}
			);

			return authResponse;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Handles the response from a popup or redirect. If response is null, will check if we have any accounts and attempt to sign in.
	 * @param response
	 */
	async handleResponse(response) {
		if (response !== null) {
			this.account = response.account;
		} else {
			this.account = await this.getAccount();
		}

		return this.account;
	}

	async getAccount() {
		const currentAccounts = await this.cache.getAllAccounts();

		if (!currentAccounts) {
			return null;
		}

		if (currentAccounts.length > 1) {
			return currentAccounts[0];
		} else if (currentAccounts.length === 1) {
			return currentAccounts[0];
		} else {
			return null;
		}
	}
}

module.exports = AuthProvider;
