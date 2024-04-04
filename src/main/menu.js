const { app, Menu } = require("electron");

const isMac = process.platform === "darwin";

const template = [
	...(isMac
		? [
				{
					label: app.name,
					submenu: [
						{ role: "about" },
						{ type: "separator" },
						{ role: "services" },
						{ type: "separator" },
						{ role: "hide" },
						{ role: "hideOthers" },
						{ role: "unhide" },
						{ type: "separator" },
						{ role: "quit" },
					],
				},
		  ]
		: []),
	{
		label: "Файл",
		submenu: [isMac ? { role: "close" } : { label: "Закрыть", role: "quit" }],
	},
	{
		label: "Окно",
		submenu: [
			{ label: "Перезагрузка", role: "reload" },
			{ label: "Принудительная перезагрузка", role: "forceReload" },
			{ type: "separator" },
			{ label: "Сбросить зум", role: "resetZoom" },
			{ label: "Увеличить зум", role: "zoomIn" },
			{ label: "Уменьшить зум", role: "zoomOut" },
			{ type: "separator" },
			{ label: "Полноекранный/Оконный режим", role: "togglefullscreen" },
			{ type: "separator" },
			{ label: "Свернуть", role: "minimize" },
		],
	},
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
