const { nativeImage } = require("electron");
const path = require("path");

const trayIcon = nativeImage.createFromPath(
	path.join(__dirname, "./data/images/icon.ico")
);
const appIcon = nativeImage.createFromPath(
	path.join(__dirname, "./data/images/icon.ico")
);

module.exports = {
	trayIcon,
	appIcon,
};
