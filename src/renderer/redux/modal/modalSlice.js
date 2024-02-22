import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isFileModalOpen: false,
	isModalOpen: false,
	modalType: "",
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		handleFileModalOpen(state, { payload }) {
			state.isFileModalOpen = payload;
		},
		handleModalOpen(state, { payload }) {
			state.isModalOpen = payload;
		},
		setModalType(state, { payload }) {
			state.modalType = payload;
		},
		refreshModalState(state) {
			state = initialState;
		},
	},
});

export const {
	handleFileModalOpen,
	handleModalOpen,
	setModalType,
	refreshModalState,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
