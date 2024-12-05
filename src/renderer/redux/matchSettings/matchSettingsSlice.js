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
		fibaliveChampName1: "",
		fibaliveChampName2: "",
		fibaliveChampName3: "",
		betsapiChampName1: "",
		betsapiChampName2: "",
		betsapiChampName3: "",
		otherSiteChampName1: "",
		otherSiteChampName2: "",
		otherSiteChampName3: "",
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
	selectedCyber: { id: "", value: "", label: "" },
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
			state.champData.fibaliveChampName1 = payload.fibaliveChampName1 ?? "";
			state.champData.fibaliveChampName2 = payload.fibaliveChampName2 ?? "";
			state.champData.fibaliveChampName3 = payload.fibaliveChampName3 ?? "";
			state.champData.betsapiChampName1 = payload.betsapiChampName1 ?? "";
			state.champData.betsapiChampName2 = payload.betsapiChampName2 ?? "";
			state.champData.betsapiChampName3 = payload.betsapiChampName3 ?? "";
			state.champData.otherSiteChampName1 = payload.otherSiteChampName1 ?? "";
			state.champData.otherSiteChampName2 = payload.otherSiteChampName2 ?? "";
			state.champData.otherSiteChampName3 = payload.otherSiteChampName3 ?? "";
			state.champData.cyberId = payload.cyberId ?? "";
			state.champData.noBetsList = payload.noBetsList ?? false;
		},
		setChampCyberId(state, { payload }) {
			state.champData.cyberId = payload ?? "";
		},
		setChampName(state, { payload }) {
			state.champData[payload.name] = payload.value;
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
			state.teamData.noBetsList = payload.noBetsList ?? false;
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
			state.champData.fibaliveChampName1 =
				initialState.champData.fibaliveChampName1;
			state.champData.fibaliveChampName2 =
				initialState.champData.fibaliveChampName2;
			state.champData.fibaliveChampName3 =
				initialState.champData.fibaliveChampName3;
			state.champData.betsapiChampName1 =
				initialState.champData.betsapiChampName1;
			state.champData.betsapiChampName2 =
				initialState.champData.betsapiChampName2;
			state.champData.betsapiChampName3 =
				initialState.champData.betsapiChampName3;
			state.champData.otherSiteChampName1 =
				initialState.champData.otherSiteChampName1;
			state.champData.otherSiteChampName2 =
				initialState.champData.otherSiteChampName2;
			state.champData.otherSiteChampName3 =
				initialState.champData.otherSiteChampName3;
			state.champData.cyberId = initialState.champData.cyberId;
			state.champData.noBetsList = initialState.champData.noBetsList;
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
	setChampCyberId,
	setChampName,
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
