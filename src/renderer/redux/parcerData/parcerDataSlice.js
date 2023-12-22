import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	onClickRequest: false,
	onClickLoading: false,
};

const parcerDataSlice = createSlice({
	name: "parcerData",
	initialState,
	reducers: {
		handleClickRequest(state) {
			state.onClickRequest = true;
		},
		handleOnClickLoading(state, { payload }) {
			state.onClickLoading = payload;
		},
		refresh: () => initialState,
	},
});

export const { handleClickRequest, handleOnClickLoading, refresh } =
	parcerDataSlice.actions;
export const parcerDataReducer = parcerDataSlice.reducer;
