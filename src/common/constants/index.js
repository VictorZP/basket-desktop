export const LOGIN_PAGE = {
	TITLE: "Войти",
	LABEL: {
		EMAIL: "Почта",
		PASSWORD: "Пароль",
	},
	BUTTON: {
		LOGIN: "Войти",
	},
	ERR_MESSAGES: {
		ON_LOGIN: "Почта и/или пароль не совпадают",
	},
};

export const SIDE_MENU = {
	MATCH_LIST: [
		{ TITLE: "Матчи", PAGE_NAME: "matches" },
		{ TITLE: "Настройка матчей", PAGE_NAME: "matches_setting" },
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
	},
	SUCCESS_MESSAGES: {
		CREATE: "Создано успешно",
		DELETED: "Удалено: ",
	},
	ERR_MESSAGES: {
		EXIST: "Такое навание уже имеется в базе",
		ON_ERROR: "Произошла ошибка. Обратитесь в тех. поддержку.",
		ON_ERROR_C_DEL: "Ошибка при удаление cyber. ",
	},
};

export const TOOLTIPS = {
	NAVBAR_MENU: "Показать меню",
	NAVBAR_MENU_MIN: "Свернуть меню",
	T_BTN_STACK_EDIT: "редактировать",
	T_BTN_STACK_DEL: "удалить",
};

export const MODAL_DEL = {
	TITLE: "Удалить?",
	CONFIRM_TEXT: "Подтверждаете удаление ",
	YES: "Да",
	NO: "Нет",
	PAGE_TYPE_C: "delCyber",
};
