export const SIDE_MENU = {
	HOME_PAGE: { TITLE: "Начальная страница", PAGE_NAME: "" },
	MATCH_LIST: [
		{ TITLE: "Начальная страница", PAGE_NAME: "" },
		{ TITLE: "Матчи", PAGE_NAME: "matches" },
		{ TITLE: "Линии", PAGE_NAME: "lines_page" },
		{ TITLE: "Результат ставок", PAGE_NAME: "betting_results" },
		{ TITLE: "Настройка матчей", PAGE_NAME: "matches_setting" },
		{ TITLE: "Отслеживание матчей", PAGE_NAME: "active_games" },
		{ TITLE: "Ручной ввод", PAGE_NAME: "manual_results" },
	],
	PARSER_LIST: [
		{ TITLE: "Парсинг данных", PAGE_NAME: "parcer" },
		{ TITLE: "Настройка парсера", PAGE_NAME: "parcer_settings" },
	],
};

export const MATCHES_SETTINGS = {
	TITLE: "Настройка данных для анализа матчей",
	CYBER_FORM: {
		TITLE: "Редактирование Cyber",
		NAME_LABEL: "Название",
		BTN_ADD: "Добавить",
		BTN_UPD: "Обновить",
		BTN_DEL: "Удалить",
		MS_ADD: "Добавлено",
		MS_UPD: "Обновлено",
		MS_DEL: "Удалено",
	},
	CYBER_TABLE: {
		ACCORD_TITLE: "Список 'Cyber'",
		CELL_T: "название",
		DEL_BTN_N: "delCyber",
		EDIT_BTN_N: "editCyber",
		ACCORDION_NAME: "",
	},
	CHAMPIONSHIP_FORM: {
		TITLE: "Названия чемпионатов",
		SELECT_LABEL: "Cyber",
		CHAMP_NAME_INPUT: "Название чемпионата",
		FIBALIVE_NAME_INPUT: "Название fibalive",
		BETSAPI_NAME_INPUT: "Название betsApi",
		OTHER_SITE_NAME_INPUT: "Название с сайта",
		NO_BETS_CHECKBOX: "Без Bets",
		BTN_ADD: "Добавить",
		BTN_UPD: "Обновить",
		CHAMP_ADDED: "Чемпионат добавлен.",
		CHAMP_UPDATED: "Обновлено",
	},
	CHAMPIONSHIP_TABLE: {
		ACCORDION_TITLE: "Список чемпионатов",
		CELL_CYBER: "Cyber",
		CELL_CHAMP_NAME: "Название чемпионата",
		CELL_FIBALIVE_NAME: "Название fibalive",
		CELL_BETSAPI_NAME: "Название betsapi",
		CELL_OTHER_NAME: "Название с сайта",
		CELL_NO_BETS_LIST: "Отсутствует на betsApi",
		DEL_BTN_NAME: "delChampionship",
		EDIT_BTN_NAME: "editChampionship",
		ACCORDION_NAME: "champTableAccordion",
	},
	TEAM_NAMES_FORM: {
		TITLE: "Названия команд",
		ADD_TEAM_TITLE: "Добавление команды",
		EDIT_TEAM_TITLE: "Редактирование команды",
		CYBER_LABEL: "Выбор Cyber",
		CHAMP_LABEL: "Выбор чемпионата",
		CUSTOM_TEAM_NAME_TITLE: "Личное название команды",
		CUSTOM_TEAM_NAME_LABEL: "Название команды",
		FIBALIVE_TEAM_NAME_TITLE: "Названия команды в соответствии с Fibalive",
		FIBALIVE_TEAM_NAME_LABEL: "Название fibalive",
		BETSAPI_TEAM_NAME_TITLE: "Название команды в соответствии с BetsApi",
		BETSAPI_TEAM_NAME_LABEL: "Название betsapi",
		OTHER_SITE_TEAM_NAME_TITLE:
			"Название команды в соответствии с сайтом чемпионата",
		OTHER_SITE_TEAM_NAME_LABEL: "Название с сайта",
		BTN_ADD: "Добавить",
		BTN_UPD: "Обновить",
		ADDED: "Команда добавлена",
		UPDATED: "Обновлено",
		TEAM_ADD: "Добавить команду",
		TEAMS_TRANSFER: "Перенос команд",
	},
	TEAM_NAMES_TABLE: {
		ACCORDION_TITLE: "Список команд",
		ACCORDION_NAME: "teamNameAccordion",
		CELL_CYBER: "Cyber",
		CELL_CHAMP_NAME: "Название чемпионата",
		CELL_TEAM_NAME: "Название команды",
		CELL_FIBALIVE_NAME: "Название с fibalive",
		CELL_BETSAPI_NAME: "Название с betsapi",
		CELL_OTHER_NAME: "Название с сайта",
		DEL_TEAM_NAME: "delTeamName",
		EDIT_TEAM_NAME: "editTeamName",
	},
	SUCCESS_MESSAGES: {
		CREATE: "Создано успешно",
		UPD_SUCCESS: "Успешно изменено.",
		DELETED: "Удалено: ",
	},
	ERR_MESSAGES: {
		EXIST: "Такое навание уже имеется в базе.",
		ON_ERROR_CYBER_LIST: "Ошибка при запросе спика Cyber",
		ON_ERROR: "Произошла ошибка. Обратитесь в тех. поддержку.",
		ON_ERROR_C_DEL: "Ошибка при удаление cyber. ",
		ON_ERROR_CHAMP_DEL: "Ошибка при удаление чемпионата. ",
		ON_ERROR_TEAM_NAME_DEL: "Ошибка при удалении названия команды.",
	},
	REGEX: { ONE: /\\|\*|\?/g, TWO: /\(/g, THREE: /\)/g },
	BUTTON: {
		ADD: "Добавить",
		EDIT: "Редактировать",
	},
};

export const TOOLTIPS = {
	NAVBAR_MENU: "Показать меню",
	NAVBAR_MENU_MIN: "Свернуть меню",
	T_BTN_STACK_EDIT: "редактировать",
	T_BTN_STACK_DEL: "удалить",
};

export const STORAGE_KEYS = {
	TOKEN: "token",
	ADDRESS: "address",
};

export const ACTIVE_PAGE_NOTIFICATION = {
	TITLE_WITH_BETS: "Ставка",
	TITLE_WITHOUT_BETS: "Без бетс",
	TITLE_ERROR: "Ошибка в уведомлениях",
	BODY_ERROR: "Ошибка при фрмировании уведомления о ставке.",
};

export const STATUS = {
	NOT_CONNECTED: "not connected",
};
