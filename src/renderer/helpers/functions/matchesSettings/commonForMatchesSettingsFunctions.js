import { MATCHES_SETTINGS } from "../../../../common/constants";

export const handleVisibleFilteredList = (list, page, rowsPerPage) => {
	return list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

export const formSearchQuery = (searchQuery) => {
	return searchQuery
		.replaceAll(MATCHES_SETTINGS.REGEX.ONE, "")
		.replaceAll(MATCHES_SETTINGS.REGEX.TWO, "\\(")
		.replaceAll(MATCHES_SETTINGS.REGEX.THREE, "\\)");
};
