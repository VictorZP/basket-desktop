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

ipcMain.on(CHANNELS.CYBER.GET_ALL_CYBER, async (event, arg) => {
	try {
		const { token } = arg;

		const user = await authenticate(token);
		if (user?.code === 401) {
			throw user?.message;
		}

		const res = await Cyber.find(
			{ owner: user },
			{ createdAt: 0, updatedAt: 0, owner: 0 }
		)
			.sort("cyberName")
			.lean();

		const list = [...res].map((el) => {
			return {
				id: el?._id?.toString(),
				cyberName: el?.cyberName,
			};
		});

		event.sender.send(CHANNELS.CYBER.GET_ALL_CYBER, { list });
	} catch (err) {
		const res = {
			error: "",
			message: "",
		};
		if (err.coder === 401) {
			res.error = err.code;
			res.message = err.message;
		} else {
			res.error = err;
			res.message = MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR + err;
		}

		event.sender.send(CHANNELS.CYBER.GET_ALL_CYBER, res);
	}
});

ipcMain.on(CHANNELS.CYBER.DEL_CYBER, async (event, arg) => {
	try {
		const { token, id } = arg;

		const user = await authenticate(token);
		if (user?.code === 401) {
			throw user?.message;
		}

		const res = await Cyber.findByIdAndDelete({ _id: id });
		if (res?._id?.toString() !== id) {
			const err = MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR_C_DEL;
			throw err;
		}

		const resMessage = `${MATCHES_SETTINGS.SUCCESS_MESSAGES.DELETED}${res?.cyberName}`;
		event.sender.send(CHANNELS.CYBER.DEL_CYBER, resMessage);
	} catch (err) {
		const res = {
			error: "",
			message: "",
		};
		if (err.coder === 401) {
			res.error = err.code;
			res.message = err.message;
		} else {
			res.error = err;
			res.message = MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR + err;
		}

		event.sender.send(CHANNELS.CYBER.GET_ALL_CYBER, res);
	}
});
