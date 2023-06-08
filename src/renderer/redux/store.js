import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/authSlice.js";
import { matchSettingsReducer } from "./matchSettings/matchSettingsSlice.js";
import { modalDelReducer } from "./modalDelete/modalDelSlice.js";
import { urlFormReducer } from "./urlForm/urlFormSlice.js";

const store = configureStore({
	reducer: {
		auth: authReducer,
		matchSettings: matchSettingsReducer,
		modalDel: modalDelReducer,
		urlForm: urlFormReducer,
	},
});

export { store };
