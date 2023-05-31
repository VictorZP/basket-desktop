const getCyberAddStatus = (state) => state.matchSettings.addCyber;
const getCyberEditStatus = (state) => state.matchSettings.editCyber;
const getCyberData = (state) => state.matchSettings.cyberData;

const getChampAddStatus = (state) => state.matchSettings.addChamp;
const getChampEditStatus = (state) => state.matchSettings.editChamp;
const getChampionshipsLoadingStatus = (state) =>
	state.matchSettings.isChampLoading;
const getChampData = (state) => state.matchSettings.champData;

const getExpandedVal = (state) => state.matchSettings.expanded;

export {
	getCyberAddStatus,
	getChampAddStatus,
	getCyberEditStatus,
	getChampEditStatus,
	getChampionshipsLoadingStatus,
	getCyberData,
	getChampData,
	getExpandedVal,
};
