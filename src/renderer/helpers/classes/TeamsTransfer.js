const ipcRenderer = window.require("electron").ipcRenderer;

import {
	setTransferData,
	handleTeamsUpdated,
	handleSearchQuery,
} from "../../redux/teamTransfer/teamTransferSlice.js";
import { CONSTANTS } from "../../constants/teamNameFormConstants.js";
import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";
import { CHANNELS } from "../../../common/constants/channels";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

// Class for handle operations in teams transfer modal
export class TeamsTransfer {
	constructor(dispatch) {
		this.dispatch = dispatch;
	}

	// Handle cybers ids and championships ids changes
	handleIdsChange = (e, type) => {
		const id = e.target.value;
		const name = e.target.name;

		let key = "";

		switch (name) {
			case CONSTANTS.CYBER_SELECT_NAME:
				key = type === TRANSFER_TYPE.OUT ? "outCyberId" : "targetCyberId";
				break;
			case CONSTANTS.CHAMP_SELECT_NAME:
				key = type === TRANSFER_TYPE.OUT ? "outChampId" : "targetChampId";
				break;

			default:
				break;
		}

		this.dispatch(setTransferData({ id, key }));
	};

	// Handle bool value for loading button
	handleBtnDisabled = (transferType, teamIdsArray) => {
		return (
			transferType === TRANSFER_TYPE.VALUE_FULL ||
			(transferType === TRANSFER_TYPE.VALUE_CUSTOM && teamIdsArray.length > 0)
		);
	};

	// Handle teams transfer
	handleTransfer = async (reqDataObj) => {
		try {
			const res = await ipcRenderer.invoke(
				CHANNELS.TEAMS_TRANSFER.SAVE,
				reqDataObj
			);
			this.dispatch(handleTeamsUpdated()); // Need for update team list in teams transfer list
			return res;
		} catch (err) {
			return err;
		}
	};

	// Handler for teams name search input
	handleInputSearch = (
		e,
		teamNamesList,
		searchTimeOut,
		setSearchTimeOut,
		setVisibleList
	) => {
		const searchQuery = e.target.value
			.replaceAll(MATCHES_SETTINGS.REGEX.ONE, "")
			.replaceAll(MATCHES_SETTINGS.REGEX.TWO, "\\(")
			.replaceAll(MATCHES_SETTINGS.REGEX.THREE, "\\)");

		const regex = new RegExp(`^${searchQuery}`, "i");

		clearTimeout(searchTimeOut);

		setSearchTimeOut(
			setTimeout(() => {
				this.dispatch(handleSearchQuery(searchQuery));

				const filterRes = teamNamesList.filter((team) =>
					regex.test(team.teamName)
				);

				setVisibleList(filterRes);
			}, 500)
		);
	};

	// Check if team isn't already in another list
	isNotInList = (a, b) => {
		const idsOfB = b.map((team) => team.teamId);
		return a.filter(({ teamId }) => idsOfB.indexOf(teamId) === -1);
	};

	// Method for include team in another list
	handleIntersection = (a, b) => {
		const idsOfB = b.map((team) => team.teamId);
		return a.filter(({ teamId }) => idsOfB.indexOf(teamId) !== -1);
	};
}
