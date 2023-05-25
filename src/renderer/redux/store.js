import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/authSlice.js";
import { matchSettingsReducer } from "./matchSettings/matchSettingsSlice.js";
import { modalDelReducer } from "./modalDelete/modalDelSlice.js";

const store = configureStore({
	reducer: {
		auth: authReducer,
		matchSettings: matchSettingsReducer,
		modalDel: modalDelReducer,
	},
});

export { store };
