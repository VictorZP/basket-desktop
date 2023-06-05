import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addCyber: false,
	addChamp: false,
	addTeam: false,
	editCyber: false,
	editChamp: false,
	editTeam: false,
	isChampLoading: false,
	isTeamLoading: false,
	expanded: false,
	teamExpanded: false,
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
	teamData: {
		champId: "",
		customName: "",
		fibaliveTeamName: "",
		betsapiTeamName: "",
		otherSiteTeamName: "",
		cyberTeamName: "",
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
		handleAddTeam(state, { payload }) {
			state.addTeam = payload;
		},
		handleEditCyber(state, { payload }) {
			state.editCyber = payload;
		},
		handleEditChamp(state, { payload }) {
			state.editChamp = payload;
		},
		handleEditTeam(state, { payload }) {
			state.editTeam = payload;
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
		setTeamData(state, { payload }) {
			state.champId = payload.champId ?? "";
			state.customName = payload.customName ?? "";
			state.fibaliveTeamName = payload.fibaliveTeamName ?? "";
			state.betsapiTeamName = payload.betsapiTeamName ?? "";
			state.otherSiteTeamName = payload.otherSiteTeamName ?? "";
			state.cyberTeamName = payload.cyberTeamName ?? "";
		},
		setExpanded(state, { payload }) {
			state.expanded = payload ?? "";
		},
		setTeamExpanded(state, { payload }) {
			state.teamExpanded = payload;
		},
		setChampLoadingStatus(state, { payload }) {
			state.isChampLoading = payload ?? false;
		},
		setTeamLoadingStatus(state, { payload }) {
			state.isTeamLoading = payload;
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
		refreshTeamData(state) {
			state.champId = initialState.teamData.champId;
			state.customName = initialState.teamData.customName;
			state.fibaliveTeamName = initialState.teamData.fibaliveTeamName;
			state.betsapiTeamName = initialState.teamData.betsapiTeamName;
			state.otherSiteTeamName = initialState.teamData.otherSiteTeamName;
			state.cyberTeamName = initialState.teamData.cyberTeamName;
		},
		refreshMS: () => initialState,
	},
});

export const {
	handleAddCyber,
	handleAddChamp,
	handleAddTeam,
	handleEditCyber,
	handleEditChamp,
	setCyberData,
	setChampData,
	setTeamData,
	setExpanded,
	setTeamExpanded,
	setChampLoadingStatus,
	setTeamLoadingStatus,
	refreshCyberData,
	refreshChampData,
	refreshTeamData,
	refreshMS,
} = matchSettingsSlice.actions;
export const matchSettingsReducer = matchSettingsSlice.reducer;
