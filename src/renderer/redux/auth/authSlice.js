import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, { payload }) {
			state.token = payload;
		},
	},
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
