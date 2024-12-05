const getCyberAddStatus = (state) => state.matchSettings.addCyber;
const getCyberEditStatus = (state) => state.matchSettings.editCyber;
const getCyberList = (state) => state.matchSettings.cyberList;
const getCyberData = (state) => state.matchSettings.cyberData;

const getChampAddStatus = (state) => state.matchSettings.addChamp;
const getChampEditStatus = (state) => state.matchSettings.editChamp;
const getChampionshipsLoadingStatus = (state) =>
	state.matchSettings.isChampLoading;
const getChampData = (state) => state.matchSettings.champData;
const getChampCyberId = (state) => state.matchSettings.champData.cyberId;
const getEditModalLoadingStatus = (state) =>
	state.matchSettings.isEditModalLoading;

const getExpandedVal = (state) => state.matchSettings.expanded;

const getTeamAddStatus = (state) => state.matchSettings.addTeam;
const getTeamEditStatus = (state) => state.matchSettings.editTeam;
const getTeamLoadingStatus = (state) => state.matchSettings.isTeamLoading;
const getTeamData = (state) => state.matchSettings.teamData;
const getTeamExpandedVal = (state) => state.matchSettings.teamExpanded;
const getTeamCyberId = (state) => state.matchSettings.teamData.cyberId;

const getSelectedChamp = (state) => state.matchSettings.selectedChamp;

export {
	getCyberAddStatus,
	getChampAddStatus,
	getTeamAddStatus,
	getCyberEditStatus,
	getChampEditStatus,
	getTeamEditStatus,
	getTeamLoadingStatus,
	getCyberList,
	getCyberData,
	getChampData,
	getChampCyberId,
	getTeamData,
	getExpandedVal,
	getTeamExpandedVal,
	getTeamCyberId,
	getSelectedChamp,
	getChampionshipsLoadingStatus,
	getEditModalLoadingStatus,
};
