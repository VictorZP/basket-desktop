import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		token(state, { payload }) {
			state.token = payload;
		},
	},
});

export const { token } = authSlice.actions;
export const authReducer = authSlice.reducer;
