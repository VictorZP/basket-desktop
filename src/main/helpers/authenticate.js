const jwt = require("jsonwebtoken");

const { User } = require("../models/auth.js");
const { SECRET_KEY } = require("./variables.js");

const MESSAGE = "Not authorized";

const authenticate = async (token) => {
	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		const user = await User.findById(id);

		if (!user || !user.token) {
			const res = {
				code: 401,
				message: MESSAGE,
			};
			throw res;
		}

		return id;
	} catch (err) {
		return err;
	}
};

module.exports = authenticate;
