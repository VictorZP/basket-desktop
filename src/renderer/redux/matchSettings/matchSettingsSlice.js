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
		cyberId: "",
	},
	teamData: {
		teamId: "",
		customName: "",
		fibaliveTeamName: "",
		betsapiTeamName: "",
		otherSiteTeamName: "",
		cyberTeamName: "",
		championshipName: "",
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
			state.champData.cyberId = payload.cyberId ?? "";
		},
		setTeamData(state, { payload }) {
			state.teamData.teamId = payload.teamId ?? "";
			state.teamData.customName = payload.customName ?? "";
			state.teamData.fibaliveTeamName = payload.fibaliveTeamName ?? "";
			state.teamData.betsapiTeamName = payload.betsapiTeamName ?? "";
			state.teamData.otherSiteTeamName = payload.otherSiteTeamName ?? "";
			state.teamData.cyberTeamName = payload.cyberTeamName ?? "";
			state.teamData.championshipName = payload.championshipName ?? "";
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
			state.teamData.teamId = initialState.teamData.teamId;
			state.teamData.customName = initialState.teamData.customName;
			state.teamData.fibaliveTeamName = initialState.teamData.fibaliveTeamName;
			state.teamData.betsapiTeamName = initialState.teamData.betsapiTeamName;
			state.teamData.otherSiteTeamName =
				initialState.teamData.otherSiteTeamName;
			state.teamData.cyberTeamName = initialState.teamData.cyberTeamName;
			state.teamData.championshipName = initialState.teamData.championshipName;
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
	handleEditTeam,
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
