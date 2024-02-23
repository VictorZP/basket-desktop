const getCyberAddStatus = (state) => state.matchSettings.addCyber;
const getCyberEditStatus = (state) => state.matchSettings.editCyber;
const getCyberData = (state) => state.matchSettings.cyberData;

const getChampAddStatus = (state) => state.matchSettings.addChamp;
const getChampEditStatus = (state) => state.matchSettings.editChamp;
const getChampionshipsLoadingStatus = (state) =>
	state.matchSettings.isChampLoading;
const getChampData = (state) => state.matchSettings.champData;

const getExpandedVal = (state) => state.matchSettings.expanded;

const getTeamAddStatus = (state) => state.matchSettings.addTeam;
const getTeamEditStatus = (state) => state.matchSettings.editTeam;
const getTeamLoadingStatus = (state) => state.matchSettings.isTeamLoading;
const getTeamData = (state) => state.matchSettings.teamData;
const getTeamExpandedVal = (state) => state.matchSettings.teamExpanded;
const getTeamCyberId = (state) => state.matchSettings.teamData.cyberId;

const getSelectedChamp = (state) => state.matchSettings.selectedChamp;

const getOutCyberId = (state) => state.matchSettings.transferModal.outCyberId;

export {
	getCyberAddStatus,
	getChampAddStatus,
	getTeamAddStatus,
	getCyberEditStatus,
	getChampEditStatus,
	getTeamEditStatus,
	getChampionshipsLoadingStatus,
	getTeamLoadingStatus,
	getCyberData,
	getChampData,
	getTeamData,
	getExpandedVal,
	getTeamExpandedVal,
	getTeamCyberId,
	getSelectedChamp,
	getOutCyberId,
};
