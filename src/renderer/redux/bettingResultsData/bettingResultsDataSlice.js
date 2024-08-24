const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	onClickRequest: false,
	onClickLoading: false,
	isDataLoading: false,
};

const bettingResultsSlice = createSlice({
	name: "bettingResultsData",
	initialState,
	reducers: {
		handleClickRequest(state) {
			state.onClickRequest = true;
		},
		handleOnClickLoading(state, { payload }) {
			state.onClickLoading = payload;
		},
		handleIsDataLoading(state, { payload }) {
			state.isDataLoading = payload;
		},
		refresh: () => initialState,
	},
});

export const {
	handleClickRequest,
	handleOnClickLoading,
	handleIsDataLoading,
	refresh,
} = bettingResultsSlice.actions;
export const bettingResultsReducer = bettingResultsSlice.reducer;
