export const handleChampFilter = (list, searchValue) => {
	const regex = new RegExp(searchValue, "i");

	return list.filter(
		(champ) =>
			regex.test(champ.cyber.name) ||
			regex.test(champ.championshipName) ||
			regex.test(champ.fibaliveName) ||
			regex.test(champ.betsapiName) ||
			regex.test(champ.otherSiteName)
	);
};
