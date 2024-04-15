const { app, Menu } = require("electron");

const handleSettingsWindow = require("./functions/settingsWindow.js");

const isMac = process.platform === "darwin";

const handleAppMenu = (window) => {
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
			label: "Приложение",
			submenu: [
				{
					label: "Настройки",
					click: () => handleSettingsWindow(window),
				},
				{ type: "separator" },
				isMac ? { role: "close" } : { label: "Закрыть", role: "quit" },
			],
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
				{ label: "Инструменты разработчика", role: "toggleDevTools" },
				{ type: "separator" },
				{ label: "Полноекранный/Оконный режим", role: "togglefullscreen" },
				{ type: "separator" },
				{ label: "Свернуть", role: "minimize" },
			],
		},
	];
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
};

module.exports = handleAppMenu;
