const { Menu } = require("electron");

const trayContextMenu = Menu.buildFromTemplate([
	{ label: "Закрыть", role: "quit" },
]);

module.exports = trayContextMenu;
