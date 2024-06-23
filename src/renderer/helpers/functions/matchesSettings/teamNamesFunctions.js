export const handleTeamNamesFilter = (list, searchValue) => {
	const regex = new RegExp(searchValue, "i");
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
