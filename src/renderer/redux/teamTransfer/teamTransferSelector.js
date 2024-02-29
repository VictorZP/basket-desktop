const getOutCyberId = (state) => state.teamTransfer.outCyberId;
const getOutChampId = (state) => state.teamTransfer.outChampId;
const getOutChampOptions = (state) => state.teamTransfer.outChampOptions;

const getTargetCyberId = (state) => state.teamTransfer.targetCyberId;
const getTargetChampId = (state) => state.teamTransfer.targetChampId;
const getTargetChampOptions = (state) => state.teamTransfer.targetChampOptions;

const getTransferType = (state) => state.teamTransfer.transferType;

export {
	getOutCyberId,
	getOutChampId,
	getOutChampOptions,
	getTargetCyberId,
	getTargetChampId,
	getTargetChampOptions,
	getTransferType,
};
