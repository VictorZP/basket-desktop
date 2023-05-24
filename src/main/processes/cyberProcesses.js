const { ipcMain } = require("electron");

const { Cyber } = require("../models/cyber.js");
const authenticate = require("../helpers/authenticate.js");
const { CHANNELS } = require("../../common/constants/channels.js");
const { MATCHES_SETTINGS } = require("../../common/constants/index.js");

ipcMain.on(CHANNELS.CYBER.ADD_CYBER, async (event, arg) => {
	try {
		const { cyberName, token } = arg;

		const user = await authenticate(token);

		if (user?.code === 401) {
			throw user?.message;
		}

		const isCyberExist = await Cyber.findOne({ cyberName });

		if (isCyberExist) {
			event.sender.send(
				CHANNELS.CYBER.ADD_CYBER,
				MATCHES_SETTINGS.ERR_MESSAGES.EXIST
			);
			return;
		}

		await Cyber.create({
			cyberName,
			owner: user,
		});

		event.sender.send(
			CHANNELS.CYBER.ADD_CYBER,
			MATCHES_SETTINGS.SUCCESS_MESSAGES.CREATE
		);
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

		event.sender.send(CHANNELS.CYBER.ADD_CYBER, res);
	}
});
