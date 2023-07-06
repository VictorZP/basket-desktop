import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isFormOpen: false,
	isUrlAdded: false,
};

const urlFormSlice = createSlice({
	name: "urlForm",
	initialState,
	reducers: {
		handleOpenState(state, { payload }) {
			state.isFormOpen = payload;
		},
		handleUrlAdded(state, { payload }) {
			state.isUrlAdded = payload;
		},
	},
});

export const { handleOpenState, handleUrlAdded } = urlFormSlice.actions;
export const urlFormReducer = urlFormSlice.reducer;
