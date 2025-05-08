const MESSAGES = {
	ON_WARNING_START:
		"Возникли конфликты при формировании статистки результатов матчей за сезон. Измените параметры даты и попробуйте снова.",
	ON_ERROR_START:
		"Произошла ошибка при формировании статистки результатов матчей за сезон.",
	ON_ERROR_GET_LIST:
		"Произошла ошибка при получении списка статистки результатов матчей за сезон.",
};

const RESULTS_DATA = {
	BTN_DOWNLOAD: "Скачать",
	BTN_DELETE: "Удалить",
	HEADER_NAMES: [
		"№",
		"Дата формирования",
		"Начальная дата",
		"Конечная дата",
		"",
		"",
	],
};

const FILE_TEXT = {
	SHEET_NAME: "Рузультаты",
	HYPERLINK_TITLE: "Открыть в браузере",
	HYPERLINK_TOOLTIP: "Перейти по выбранной ссылке для просмотра страницы матча",
	SAVE_TITLE: "Сохранить как",
	FILE_NAME: "Результаты матчей(ставок)",
};

const MATCHES_RESULTS_BY_SEASON_CONSTANTS = {
	MESSAGES,
	FILE_TEXT,
	RESULTS_DATA,
};

export default MATCHES_RESULTS_BY_SEASON_CONSTANTS;
