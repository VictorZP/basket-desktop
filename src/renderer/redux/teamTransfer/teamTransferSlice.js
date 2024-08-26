import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	leftCyberId: "",
	leftChampId: "",
	rightCyberId: "",
	rightChampId: "",
	transferType: "",
	leftSearchQuery: "",
	rightSearchQuery: "",
	isTeamsUpdated: false,
	leftListOfTeamsIds: [],
	rightListOfTeamsIds: [],
	leftChampOptions: [],
	rightChampOptions: [],
};

const teamTransferSlice = createSlice({
	name: "teamTransfer",
	initialState,
	reducers: {
		setTransferData(state, { payload }) {
			state[payload.key] = payload.id;
		},
		setTransferChampOptions(state, { payload }) {
			state[payload.key] = payload.options;
		},
		setTeamsIdList(state, { payload }) {
			state[payload.key] = payload.idsArray;
		},
		setTransferType(state, { payload }) {
			state.transferType = payload;
		},
		handleTeamsUpdated(state) {
			state.isTeamsUpdated = !state.isTeamsUpdated;
		},
		handleSearchQuery(state, { payload }) {
			state[payload.key] = payload.value;
		},
		refreshTransferData(state, { payload }) {
			state[payload.key] = initialState[payload.key];
		},
		refreshTransferTeamsIds(state) {
			state.teamsIds = initialState.teamsIds;
		},
		refreshTransferChampOptions(state, { payload }) {
			state[payload.key] = initialState[payload.key];
		},
		refreshTransferType(state) {
			state.transferType = initialState.transferType;
		},
		refreshTransferModal(state) {
			state.leftCyberId = initialState.leftCyberId;
			state.leftChampId = initialState.leftChampId;
			state.rightCyberId = initialState.rightCyberId;
			state.rightChampId = initialState.rightChampId;
			state.transferType = initialState.transferType;
			state.leftSearchQuery = initialState.leftSearchQuery;
			state.rightSearchQuery = initialState.rightSearchQuery;
			state.isTeamsUpdated = initialState.isTeamsUpdated;
			state.leftListOfTeamsIds = initialState.leftListOfTeamsIds;
			state.rightListOfTeamsIds = initialState.rightListOfTeamsIds;
			state.leftChampOptions = initialState.leftChampOptions;
			state.rightChampOptions = initialState.rightChampOptions;
		},
	},
});

export const {
	setTransferData,
	setTransferChampOptions,
	setTeamsIdList,
	setTransferType,
	handleTeamsUpdated,
	handleSearchQuery,
	refreshTransferData,
	refreshTransferTeamsIds,
	refreshTransferChampOptions,
	refreshTransferType,
	refreshTransferModal,
} = teamTransferSlice.actions;
export const teamTransferReducer = teamTransferSlice.reducer;
