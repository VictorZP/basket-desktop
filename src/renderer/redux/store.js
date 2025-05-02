import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/authSlice.js";
import { matchSettingsReducer } from "./matchSettings/matchSettingsSlice.js";
import { modalDelReducer } from "./modalDelete/modalDelSlice.js";
import { urlFormReducer } from "./urlForm/urlFormSlice.js";
import { modalReducer } from "./modal/modalSlice.js";
import { parcerDataReducer } from "./parcerData/parcerDataSlice.js";
import { linesDataReducer } from "./linesData/linesDataSlice.js";
import { bettingResultsReducer } from "./bettingResultsData/bettingResultsDataSlice.js";
import { teamTransferReducer } from "./teamTransfer/teamTransferSlice.js";
import { halvesStatsDataReducer } from "./halvesStatsData/halvesStatsDataSlice.js";

const store = configureStore({
	reducer: {
		auth: authReducer,
		matchSettings: matchSettingsReducer,
		modalDel: modalDelReducer,
		urlForm: urlFormReducer,
		modal: modalReducer,
		parcerData: parcerDataReducer,
		linesData: linesDataReducer,
		teamTransfer: teamTransferReducer,
		bettingResultsData: bettingResultsReducer,
		halvesStatsData: halvesStatsDataReducer,
	},
});

export { store };
