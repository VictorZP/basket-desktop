export const handleVisibleFilteredList = (list, page, rowsPerPage) => {
	return list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

export const handleParenthesesChars = (searchValue) => {
	// Escape special characters in the searchValue, especially parentheses,
	// cause they are used in championship / team names
	let escapedSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

	// Check if the searchValue contains the pattern "(W".
	// Cause sometimes user can search for a championship/team name that contains "(W" in it without the closing parenthesis.
	const containsPattern = /\(W/.test(searchValue);

	if (containsPattern) {
		// Check for unbalanced parentheses and handle them
		const openParenthesesCount = (escapedSearchValue.match(/\\\(/g) || [])
			.length;
		const closeParenthesesCount = (escapedSearchValue.match(/\\\)/g) || [])
			.length;

		let balancedSearchValue = escapedSearchValue;

		if (openParenthesesCount > closeParenthesesCount) {
			balancedSearchValue += "\\)"; // Add a closing parenthesis if unbalanced
		} else if (closeParenthesesCount > openParenthesesCount) {
			balancedSearchValue = "\\(" + balancedSearchValue; // Add an opening parenthesis if unbalanced
		}

		escapedSearchValue = balancedSearchValue;
	}

	return escapedSearchValue;
};

export const handleChampFilter = (list, searchValue) => {
	const escapedSearchValue = handleParenthesesChars(searchValue);
	const regex = new RegExp(escapedSearchValue, "i");

	return list.filter(
		(champ) =>
			regex.test(champ.cyber.name) ||
			regex.test(champ.championshipName) ||
			regex.test(champ.fibaliveName) ||
			regex.test(champ.betsapiName) ||
			regex.test(champ.otherSiteName)
	);
};

export const handleTeamNamesFilter = (list, searchValue) => {
	const escapedSearchValue = handleParenthesesChars(searchValue);
	const regex = new RegExp(escapedSearchValue, "i");

	return list.filter(
		(team) =>
			regex.test(team.teamChamp.championshipName) ||
			regex.test(team.teamCyber.cyberName) ||
			regex.test(team.teamName) ||
			regex.test(team.fibaliveTeamName1) ||
			regex.test(team.fibaliveTeamName2) ||
			regex.test(team.fibaliveTeamName3) ||
			regex.test(team.betsapiTeamName) ||
			regex.test(team.otherSiteTeamName)
	);
};
