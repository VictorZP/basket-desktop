import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isFileModalOpen: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		handleFileModalOpen(state, { payload }) {
			state.isFileModalOpen = payload;
		},
	},
});

export const { handleFileModalOpen } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
