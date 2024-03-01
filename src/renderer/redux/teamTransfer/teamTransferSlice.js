import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	outCyberId: "",
	outChampId: "",
	targetCyberId: "",
	targetChampId: "",
	transferType: "",
	searchQuery: "",
	isTeamsUpdated: false,
	teamsIds: [],
	outChampOptions: [],
	targetChampOptions: [],
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
		setTransferTeamsIds(state, { payload }) {
			state.teamsIds = payload;
		},
		setTransferType(state, { payload }) {
			state.transferType = payload;
		},
		handleTeamsUpdated(state) {
			state.isTeamsUpdated = !state.isTeamsUpdated;
		},
		handleSearchQuery(state, { payload }) {
			state.searchQuery = payload;
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
			state.outCyberId = initialState.outCyberId;
			state.outChampId = initialState.outChampId;
			state.targetCyberId = initialState.targetCyberId;
			state.targetChampId = initialState.targetChampId;
			state.transferType = initialState.transferType;
			state.searchQuery = initialState.searchQuery;
			state.isTeamsUpdated = initialState.isTeamsUpdated;
			state.teamsIds = initialState.teamsIds;
			state.outChampOptions = initialState.outChampOptions;
			state.targetChampOptions = initialState.targetChampOptions;
		},
	},
});

export const {
	setTransferData,
	setTransferChampOptions,
	setTransferTeamsIds,
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
