import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addCyber: false,
	addChamp: false,
	editCyber: false,
	editChamp: false,
	isChampLoading: false,
	expanded: false,
	cyberData: {
		cyberId: "",
		cyberName: "",
	},
	champData: {
		champId: "",
		championshipName: "",
		fibaliveName: "",
		betsapiName: "",
		otherSiteName: "",
		cyberName: "",
	},
};

const matchSettingsSlice = createSlice({
	name: "matchSettings",
	initialState,
	reducers: {
		handleAddCyber(state, { payload }) {
			state.addCyber = payload;
		},
		handleAddChamp(state, { payload }) {
			state.addChamp = payload;
		},
		handleEditCyber(state, { payload }) {
			state.editCyber = payload;
		},
		handleEditChamp(state, { payload }) {
			state.editChamp = payload;
		},
		setCyberData(state, { payload }) {
			state.cyberData.cyberId = payload.id;
			state.cyberData.cyberName = payload.name;
		},
		setChampData(state, { payload }) {
			state.champData.champId = payload.champId ?? "";
			state.champData.championshipName = payload.championshipName ?? "";
			state.champData.fibaliveName = payload.fibaliveName ?? "";
			state.champData.betsapiName = payload.betsapiName ?? "";
			state.champData.otherSiteName = payload.otherSiteName ?? "";
			state.champData.cyberName = payload.cyberName ?? "";
		},
		setExpanded(state, { payload }) {
			state.expanded = payload ?? "";
		},
		setChampLoadingStatus(state, { payload }) {
			state.isChampLoading = payload ?? false;
		},
		refreshCyberData(state) {
			state.cyberData.cyberId = initialState.cyberData.cyberId;
			state.cyberData.cyberName = initialState.cyberData.cyberName;
		},
		refreshChampData(state) {
			state.champData.champId = initialState.champData.id;
			state.champData.championshipName =
				initialState.champData.championshipName;
			state.champData.fibaliveName = initialState.champData.fibaliveName;
			state.champData.betsapiName = initialState.champData.betsapiName;
			state.champData.otherSiteName = initialState.champData.otherSiteName;
			state.champData.cyberName = initialState.champData.cyberName;
		},
		refreshMS: () => initialState,
	},
});

export const {
	handleAddCyber,
	handleAddChamp,
	handleEditCyber,
	handleEditChamp,
	setCyberData,
	setChampData,
	setExpanded,
	setChampLoadingStatus,
	refreshCyberData,
	refreshChampData,
	refreshMS,
} = matchSettingsSlice.actions;
export const matchSettingsReducer = matchSettingsSlice.reducer;
