const { BrowserWindow, ipcMain, Menu } = require("electron");

ipcMain.on("show-context-menu", (event) => {
	const template = [
		{
			label: "Копировать        ",
			accelerator: "CmdOrCtrl+C",
			role: "copy",
		},
		{
			label: "Вставить        ",
			accelerator: "CmdOrCtrl+V",
			role: "paste",
		},
		{
			type: "separator",
		},
		{
			label: "Выбрать всё        ",
			accelerator: "CmdOrCtrl+A",
			role: "selectAll",
		},
		{
			label: "Вырезать          ",
			accelerator: "CmdOrCtrl+X",
			role: "cut",
		},
		{
			label: "Удалить        ",
			role: "delete",
		},
		{
			type: "separator",
		},
		{
			label: "Перезагрузка        ",
			accelerator: "CmdOrCtrl+R",
			role: "reload",
		},
		{
			label: "Принудительная перезагрузка        ",
			accelerator: "",
			role: "forceReload",
		},
		{
			type: "separator",
		},
		{
			label: "Полноэкранный режим        ",
			accelerator: "F11",
			role: "togglefullscreen",
		},
	];

	const contextMenu = Menu.buildFromTemplate(template);
	contextMenu.popup(BrowserWindow.fromWebContents(event.sender));
});
