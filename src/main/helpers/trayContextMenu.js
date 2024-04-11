const { Menu } = require("electron");

const contextMenu = Menu.buildFromTemplate([
	{ label: "Закрыть", role: "quit" },
]);

module.exports = contextMenu;
