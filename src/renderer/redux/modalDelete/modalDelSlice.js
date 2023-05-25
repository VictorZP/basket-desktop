import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pageType: "",
	descriptionExtend: "",
	elemId: "",
	loading: false,
	isModalOpen: false,
};

const modalDelSlice = createSlice({
	name: "modalDel",
	initialState,
	reducers: {
		handleModalDelOpen(state) {
			state.isModalOpen = true;
		},
		handleModalDelClose(state) {
			state.isModalOpen = false;
		},
		setLoading(state) {
			state.loading = true;
		},
		setModalDelData(state, { payload }) {
			state.pageType = payload.pageType;
			state.descriptionExtend = payload.descriptionExtend;
			state.elemId = payload.elemId;
		},

		refreshModalDel(state) {
			state.pageType = initialState.pageType;
			state.descriptionExtend = initialState.descriptionExtend;
			state.elemId = initialState.elemId;
			state.loading = false;
		},
	},
});

export const {
	handleModalDelOpen,
	handleModalDelClose,
	setLoading,
	setModalDelData,
	refreshModalDel,
} = modalDelSlice.actions;
export const modalDelReducer = modalDelSlice.reducer;
