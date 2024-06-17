const AuthProvider = require("../../AuthProvider");
const { msalConfig } = require("../../authConfig");

const handleAuthProvider = () => {
	return new AuthProvider(msalConfig);
};

module.exports = handleAuthProvider;
