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

		const data = {
			...champ,
			owner: user,
		};

		await AppChamp.create(data);

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

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL, async (event, arg) => {
	try {
		const { token } = arg;

		const user = await authenticate(token);

		if (user?.code === 401) {
			throw user?.message;
		}

		const res = await AppChamp.find(
			{ owner: user },
			{ createdAt: 0, updatedAt: 0, owner: 0 }
		)
			.sort({ cyberName: "asc", championshipName: "asc" })
			.lean();

		const list = [...res]?.map((el) => {
			return {
				id: el?._id?.toString(),
				championshipName: el?.championshipName,
				fibaliveName: el?.fibaliveName,
				betsapiName: el?.betsapiName,
				otherSiteName: el?.otherSiteName,
				cyberName: el?.cyberName,
			};
		});

		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_ALL, {
			list,
		});
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

//Допилить проверки

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT, async (event, arg) => {
	try {
		const { id, champ, token } = arg;
		console.log("🚀 ~ champ:", champ);

		const user = await authenticate(token);

		if (user?.code === 401) {
			throw user?.message;
		}

		const isChampExistByName = await AppChamp.findOne({
			championshipName: champ?.championshipName,
		});

		if (isChampExistByName && isChampExistByName?._id?.toString() !== id) {
			event.sender.send(
				CHANNELS.APP_CHAMP.APP_CHAMP_EDIT,
				MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_NAME
			);
			return;
		}

		if (champ?.fibaliveName) {
			const isChampExistByFibaliveName = await AppChamp.findOne({
				fibaliveName: champ?.fibaliveName,
			});
			if (
				isChampExistByFibaliveName &&
				isChampExistByFibaliveName?._id?.toString() !== id
			) {
				event.sender.send(
					CHANNELS.APP_CHAMP.APP_CHAMP_EDIT,
					MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_FIB_NAME
				);
				return;
			}
		}

		if (champ?.betsapiName) {
			const isChampExistByBetsName = await AppChamp.findOne({
				betsapiName: champ?.betsapiName,
			});
			if (
				isChampExistByBetsName &&
				isChampExistByBetsName?._id?.toString() !== id
			) {
				event.sender.send(
					CHANNELS.APP_CHAMP.APP_CHAMP_EDIT,
					MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_BETS_NAME
				);
				return;
			}
		}

		if (champ?.otherSiteName) {
			const isChampExistByOtherSiteName = await AppChamp.findOne({
				otherSiteName: champ?.otherSiteName,
			});
			if (
				isChampExistByOtherSiteName &&
				isChampExistByOtherSiteName?._id?.toString() !== id
			) {
				console.log(first);
				event.sender.send(
					CHANNELS.APP_CHAMP.APP_CHAMP_EDIT,
					EXIST_CHAMP_OTHER_NAME
				);
				return;
			}
		}

		const res = await AppChamp.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					championshipName: champ?.championshipName,
					fibaliveName: champ?.fibaliveName,
					betsapiName: champ?.betsapiName,
					otherSiteName: champ?.otherSiteName,
					cyberName: champ?.cyberName,
				},
			}
		);

		event.sender.send(
			CHANNELS.APP_CHAMP.APP_CHAMP_EDIT,
			MATCHES_SETTINGS.SUCCESS_MESSAGES.UPD_SUCCESS
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
	}
});

ipcMain.on(CHANNELS.APP_CHAMP.APP_CHAMP_DEL, async (event, arg) => {
	try {
		const { token, id } = arg;

		const user = await authenticate(token);
		if (user?.code === 401) {
			throw user?.message;
		}

		const res = await AppChamp.findByIdAndDelete({ _id: id });
		if (res?._id?.toString() !== id) {
			const err = MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR_CHAMP_DEL;
			throw err;
		}

		const resMessage = `${MATCHES_SETTINGS.SUCCESS_MESSAGES.DELETED}${res?.championshipName}`;
		event.sender.send(CHANNELS.APP_CHAMP.APP_CHAMP_DEL, resMessage);
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
	}
});
