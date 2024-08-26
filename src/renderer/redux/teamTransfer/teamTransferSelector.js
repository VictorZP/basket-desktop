const getLeftCyberId = (state) => state.teamTransfer.leftCyberId;
const getLeftChampId = (state) => state.teamTransfer.leftChampId;
const getLeftChampOptions = (state) => state.teamTransfer.leftChampOptions;

const getRightCyberId = (state) => state.teamTransfer.rightCyberId;
const getRightChampId = (state) => state.teamTransfer.rightChampId;
const getRightChampOptions = (state) => state.teamTransfer.rightChampOptions;

const getTransferType = (state) => state.teamTransfer.transferType;

const getLeftListOfTeamsIds = (state) => state.teamTransfer.leftListOfTeamsIds;
const getRightListOfTeamsIds = (state) =>
	state.teamTransfer.rightListOfTeamsIds;

const getIsTeamsUpdated = (state) => state.teamTransfer.isTeamsUpdated;

const getLeftSearchQuery = (state) => state.teamTransfer.leftSearchQuery;
const getRightSearchQuery = (state) => state.teamTransfer.rightSearchQuery;

export {
	getLeftCyberId,
	getLeftChampId,
	getLeftChampOptions,
	getRightCyberId,
	getRightChampId,
	getRightChampOptions,
	getTransferType,
	getLeftListOfTeamsIds,
	getRightListOfTeamsIds,
	getIsTeamsUpdated,
	getLeftSearchQuery,
	getRightSearchQuery,
};
