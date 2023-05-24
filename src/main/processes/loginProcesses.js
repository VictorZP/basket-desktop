const { ipcMain } = require("electron");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/auth.js");
const { LOGIN_PAGE } = require("../../common/constants/index.js");
const { CHANNELS } = require("../../common/constants/channels.js");

const { SECRET_KEY } = require("../helpers/variables.js");

ipcMain.on(CHANNELS.AUTH.LOGIN, async (event, arg) => {
	try {
		const { email, password } = arg;
		const user = await User.findOne({ email });

		if (!user) {
			event.sender.send(CHANNELS.AUTH.LOGIN, LOGIN_PAGE.ERR_MESSAGES.ON_LOGIN);
			return;
		}

		const comparePassword = await bcrypt.compare(password, user.password);

		if (!comparePassword) {
			event.sender.send(CHANNELS.AUTH.LOGIN, LOGIN_PAGE.ERR_MESSAGES.ON_LOGIN);
			return;
		}

		const payload = {
			id: user.id,
		};

		const token = jwt.sign(payload, SECRET_KEY);
		await User.findByIdAndUpdate(user.id, { token });

		const res = {
			message: "OK",
			token: token,
		};

		event.sender.send(CHANNELS.AUTH.LOGIN, res);
	} catch (error) {
		console.log(error);
	}
});
