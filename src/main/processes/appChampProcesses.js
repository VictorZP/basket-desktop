const { ipcMain } = require("electron");

const { AppChamp, joiSchemas } = require("../models/appChampionship.js");
const authenticate = require("../helpers/authenticate.js");
const { CHANNELS } = require("../../common/constants/channels.js");
const { MATCHES_SETTINGS } = require("../../common/constants/index.js");

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, async (event, arg) => {
	try {
		const { champ, token } = arg;

		const { error } = joiSchemas.JoiAppChampAddSchema.validate(champ);

		if (error) {
			throw error;
		}

		const user = await authenticate(token);

		if (user?.code === 401) {
			throw user?.message;
		}

		const isChampExistByName = await AppChamp.findOne({
			championshipName: champ?.championshipName,
		});

		if (isChampExistByName) {
			event.sender.send(
				CHANNELS.APP_CHAMP.APP_CHAMP_ADD,
				MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_NAME
			);
			return;
		}

		if (champ?.fibaliveName) {
			const isChampExistByFibaliveName = await AppChamp.findOne({
				fibaliveName: champ?.fibaliveName,
			});
			if (isChampExistByFibaliveName) {
				event.sender.send(
					CHANNELS.APP_CHAMP.APP_CHAMP_ADD,
					MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_FIB_NAME
				);
				return;
			}
		}

		if (champ?.betsapiName) {
			const isChampExistByBetsName = await AppChamp.findOne({
				betsapiName: champ?.betsapiName,
			});
			if (isChampExistByBetsName) {
				event.sender.send(
					CHANNELS.APP_CHAMP.APP_CHAMP_ADD,
					MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_BETS_NAME
				);
				return;
			}
		}

		if (champ?.otherSiteName) {
			const isChampExistByOtherSiteName = await AppChamp.findOne({
				otherSiteName: champ?.otherSiteName,
			});
			if (isChampExistByOtherSiteName) {
				event.sender.send(
					CHANNELS.APP_CHAMP.APP_CHAMP_ADD,
					EXIST_CHAMP_OTHER_NAME
				);
				return;
			}
		}

		await AppChamp.create(champ);

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_ADD);
	} catch (err) {
		const res = {
			error: "",
			message: "",
		};
		if (err.coder === 401) {
			res.error = err.code;
			res.message = err.message;
		} else if (err instanceof ReferenceError) {
			res.error = err.name;
			res.message = MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR + " " + err.message;
		} else {
			res.error = err;
			res.message = MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR + err;
		}
	}
});
