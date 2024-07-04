import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addCyber: false,
	addChamp: false,
	addTeam: false,
	editCyber: false,
	editChamp: false,
	editTeam: false,
	isEditModalLoading: false,
	isChampLoading: false,
	isTeamLoading: false,
	expanded: false,
	teamExpanded: false,
	cyberData: {
		cyberId: "",
		cyberName: "",
	},
	cyberList: [],
	champData: {
		champId: "",
		championshipName: "",
		fibaliveName: "",
		betsapiName: "",
		otherSiteName: "",
		cyberName: "",
		cyberId: "",
		noBetsList: "",
	},
	teamData: {
		teamId: "",
		teamName: "",
		fibaliveTeamName1: "",
		fibaliveTeamName2: "",
		fibaliveTeamName3: "",
		betsapiTeamName1: "",
		betsapiTeamName2: "",
		betsapiTeamName3: "",
		otherSiteTeamName1: "",
		otherSiteTeamName2: "",
		otherSiteTeamName3: "",
		cyberId: "",
		championshipId: "",
	},
	selectedChamp: { id: "", value: "", label: "" },
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
		handleEditModalLoadingStatus(state, { payload }) {
			state.isEditModalLoading = payload;
		},
		setCyberList(state, { payload }) {
			state.cyberList = payload;
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
			state.champData.noBetsList = payload.noBetsList ?? false;
		},
		setTeamData(state, { payload }) {
			state.teamData.teamId = payload.teamId ?? "";
			state.teamData.teamName = payload.teamName ?? "";
			state.teamData.fibaliveTeamName1 = payload.fibaliveTeamName1 ?? "";
			state.teamData.fibaliveTeamName2 = payload.fibaliveTeamName2 ?? "";
			state.teamData.fibaliveTeamName3 = payload.fibaliveTeamName3 ?? "";
			state.teamData.betsapiTeamName1 = payload.betsapiTeamName1 ?? "";
			state.teamData.betsapiTeamName2 = payload.betsapiTeamName2 ?? "";
			state.teamData.betsapiTeamName3 = payload.betsapiTeamName3 ?? "";
			state.teamData.otherSiteTeamName1 = payload.otherSiteTeamName1 ?? "";
			state.teamData.otherSiteTeamName2 = payload.otherSiteTeamName2 ?? "";
			state.teamData.otherSiteTeamName3 = payload.otherSiteTeamName3 ?? "";
			state.teamData.cyberId = payload.cyberId ?? "";
			state.teamData.championshipId = payload.championshipId ?? "";
		},
		setTeamCyberId(state, { payload }) {
			state.teamData.cyberId = payload ?? "";
		},
		setTeamChampionshipId(state, { payload }) {
			state.teamData.championshipId = payload ?? "";
		},
		setTeamName(state, { payload }) {
			state.teamData[payload.name] = payload.value;
		},
		setTeamNames(state, { payload }) {
			state.teamData.teamName = payload.teamName;
			state.teamData.fibaliveTeamName1 = payload.fibaliveTeamName1;
			state.teamData.fibaliveTeamName2 = payload.fibaliveTeamName2;
			state.teamData.fibaliveTeamName3 = payload.fibaliveTeamName3;
			state.teamData.betsapiTeamName1 = payload.betsapiTeamName1;
			state.teamData.betsapiTeamName2 = payload.betsapiTeamName2;
			state.teamData.betsapiTeamName3 = payload.betsapiTeamName3;
			state.teamData.otherSiteTeamName1 = payload.otherSiteTeamName1;
			state.teamData.otherSiteTeamName2 = payload.otherSiteTeamName2;
			state.teamData.otherSiteTeamName3 = payload.otherSiteTeamName3;
		},
		setSelectedChamp(state, { payload }) {
			state.selectedChamp.id = payload.id;
			state.selectedChamp.value = payload.value;
			state.selectedChamp.label = payload.label;
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
		refreshCyberList(state) {
			state.cyberList = initialState.cyberList;
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
			state.champData.cyberId = initialState.champData.cyberId;
		},
		refreshTeamData(state) {
			state.teamData = initialState.teamData;
		},
		refreshTeamNames(state) {
			state.teamData.teamName = initialState.teamData.teamName;
			state.teamData.fibaliveTeamName1 =
				initialState.teamData.fibaliveTeamName1;
			state.teamData.fibaliveTeamName2 =
				initialState.teamData.fibaliveTeamName2;
			state.teamData.fibaliveTeamName3 =
				initialState.teamData.fibaliveTeamName3;
			state.teamData.betsapiTeamName1 = initialState.teamData.betsapiTeamName1;
			state.teamData.betsapiTeamName2 = initialState.teamData.betsapiTeamName2;
			state.teamData.betsapiTeamName3 = initialState.teamData.betsapiTeamName3;
			state.teamData.otherSiteTeamName1 =
				initialState.teamData.otherSiteTeamName1;
			state.teamData.otherSiteTeamName2 =
				initialState.teamData.otherSiteTeamName2;
			state.teamData.otherSiteTeamName3 =
				initialState.teamData.otherSiteTeamName3;
		},
		refreshSelectedChamp(state) {
			state.selectedChamp = initialState.selectedChamp;
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
	handleEditModalLoadingStatus,
	setCyberList,
	setCyberData,
	setChampData,
	setTeamData,
	setTeamCyberId,
	setTeamChampionshipId,
	setTeamName,
	setTeamNames,
	setSelectedChamp,
	setExpanded,
	setTeamExpanded,
	setChampLoadingStatus,
	setTeamLoadingStatus,
	refreshCyberList,
	refreshCyberData,
	refreshChampData,
	refreshTeamData,
	refreshTeamNames,
	refreshMS,
	refreshSelectedChamp,
} = matchSettingsSlice.actions;
export const matchSettingsReducer = matchSettingsSlice.reducer;
