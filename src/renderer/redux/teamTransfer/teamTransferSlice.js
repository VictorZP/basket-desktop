import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	outCyberId: "",
	outChampId: "",
	targetCyberId: "",
	targetChampId: "",
	transferType: "",
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
		setTransferType(state, { payload }) {
			state.transferType = payload;
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
			state.outCyberId = initialState.outCyberId;
			state.outChampId = initialState.outChampId;
			state.targetCyberId = initialState.targetCyberId;
			state.targetChampId = initialState.targetChampId;
			state.transferType = initialState.transferType;
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
	refreshTransferData,
	refreshTransferTeamsIds,
	refreshTransferChampOptions,
	refreshTransferModal,
} = teamTransferSlice.actions;
export const teamTransferReducer = teamTransferSlice.reducer;
