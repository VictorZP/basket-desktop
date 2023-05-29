const getCyberAddStatus = (state) => state.matchSettings.addCyber;
const getCyberEditStatus = (state) => state.matchSettings.editCyber;
const getCyberData = (state) => state.matchSettings.cyberData;

const getChampAddStatus = (state) => state.matchSettings.addChamp;
const getChampEditStatus = (state) => state.matchSettings.editChamp;
const getChampData = (state) => state.matchSettings.champData;

export {
	getCyberAddStatus,
	getChampAddStatus,
	getCyberEditStatus,
	getChampEditStatus,
	getCyberData,
	getChampData,
};
