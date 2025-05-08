const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	onClickRequest: false,
	onClickLoading: false,
	isDataLoading: false,
};

const resultsBySeasonSlice = createSlice({
	name: "resultsBySeasonData",
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
} = resultsBySeasonSlice.actions;
export const resultsBySeasonReducer = resultsBySeasonSlice.reducer;
