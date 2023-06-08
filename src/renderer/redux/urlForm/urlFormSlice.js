import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isFormOpen: false,
};

const urlFormSlice = createSlice({
	name: "urlForm",
	initialState,
	reducers: {
		handleOpenState(state, { payload }) {
			state.isFormOpen = payload;
		},
	},
});

export const { handleOpenState } = urlFormSlice.actions;
export const urlFormReducer = urlFormSlice.reducer;
