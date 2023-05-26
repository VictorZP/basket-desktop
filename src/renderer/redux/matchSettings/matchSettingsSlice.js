import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addCyber: false,
	editCyber: false,
	cyberData: {
		cyberId: "",
		cyberName: "",
	},
};

const matchSettingsSlice = createSlice({
	name: "matchSettings",
	initialState,
	reducers: {
		handleAddCyber(state, { payload }) {
			state.addCyber = payload;
		},
		handleEditCyber(state, { payload }) {
			state.editCyber = payload;
		},
		setCyberData(state, { payload }) {
			state.cyberData.cyberId = payload.id;
			state.cyberData.cyberName = payload.name;
		},
		refreshCyberData(state) {
			state.cyberData.cyberId = initialState.cyberData.cyberId;
			state.cyberData.cyberName = initialState.cyberData.cyberName;
		},
		refreshMS(state) {
			state = { ...initialState };
		},
	},
});

export const {
	handleAddCyber,
	handleEditCyber,
	setCyberData,
	refreshCyberData,
	refreshMS,
} = matchSettingsSlice.actions;
export const matchSettingsReducer = matchSettingsSlice.reducer;
