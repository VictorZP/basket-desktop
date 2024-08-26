const ipcRenderer = window.require("electron").ipcRenderer;

import {
	setTransferData,
	handleTeamsUpdated,
	handleSearchQuery,
} from "../../redux/teamTransfer/teamTransferSlice.js";
import { CONSTANTS } from "../../constants/teamNameFormConstants.js";
import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";
import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";

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
				key =
					type === TRANSFER_TYPE.LEFT
						? TRANSFER_TYPE.LEFT_CYBER_ID
						: TRANSFER_TYPE.RIGHT_CYBER_ID;
				break;
			case CONSTANTS.CHAMP_SELECT_NAME:
				key =
					type === TRANSFER_TYPE.LEFT
						? TRANSFER_TYPE.LEFT_CHAMP_ID
						: TRANSFER_TYPE.RIGHT_CHAMP_ID;
				break;

			default:
				break;
		}

		this.dispatch(setTransferData({ id, key }));
	};

	// Handle bool value for loading button
	handleBtnDisabled = (transferType, leftTeamIdsArray, rightTeamsIdsArray) => {
		return (
			transferType === TRANSFER_TYPE.VALUE_FULL ||
			(transferType === TRANSFER_TYPE.VALUE_CUSTOM &&
				(leftTeamIdsArray.length > 0 || rightTeamsIdsArray.length > 0))
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
		searchSide,
		leftList,
		rightList,
		searchTimeOut,
		setSearchTimeOut,
		setLeftVisibleList,
		setRightVisibleList
	) => {
		const searchQuery = e.target.value
			.replaceAll(MATCHES_SETTINGS.REGEX.ONE, "")
			.replaceAll(MATCHES_SETTINGS.REGEX.TWO, "\\(")
			.replaceAll(MATCHES_SETTINGS.REGEX.THREE, "\\)");

		const regex = new RegExp(`^${searchQuery}`, "i");

		clearTimeout(searchTimeOut);

		const getFilteredList = (teamList) =>
			teamList.filter((team) => regex.test(team.teamName));

		setSearchTimeOut(
			setTimeout(() => {
				switch (searchSide) {
					case TRANSFER_TYPE.LEFT: {
						const filterRes = getFilteredList(leftList);
						this.dispatch(
							handleSearchQuery({
								key: TRANSFER_TYPE.LEFT_SEARCH_QUERY_KEY,
								value: searchQuery,
							})
						);
						setLeftVisibleList(filterRes);
						break;
					}
					case TRANSFER_TYPE.RIGHT: {
						const filterRes = getFilteredList(rightList);
						this.dispatch(
							handleSearchQuery({
								key: TRANSFER_TYPE.RIGHT_SEARCH_QUERY_KEY,
								value: searchQuery,
							})
						);
						setRightVisibleList(filterRes);
						break;
					}
					default:
						break;
				}
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
