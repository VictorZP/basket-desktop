import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	add: false,
};

const matchSettingsSlice = createSlice({
	name: "matchSettings",
	initialState,
	reducers: {
		onAdd(state, { payload }) {
			state.add = payload;
		},
	},
});

export const { onAdd } = matchSettingsSlice.actions;
export const matchSettingsReducer = matchSettingsSlice.reducer;
