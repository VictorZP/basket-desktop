import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	outCyberId: "",
	outChampId: "",
	targetCyberId: "",
	targetChampId: "",
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
			state.teamsIds = [...state.teamsIds, ...payload];
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
		refreshTransferModal(state) {
			state = initialState;
		},
	},
});

export const {
	setTransferData,
	setTransferChampOptions,
	setTransferTeamsIds,
	refreshTransferData,
	refreshTransferTeamsIds,
	refreshTransferChampOptions,
} = teamTransferSlice.actions;
export const teamTransferReducer = teamTransferSlice.reducer;
