const ipcRenderer = window.require("electron").ipcRenderer;

import { setTransferData } from "../../redux/teamTransfer/teamTransferSlice.js";
import { CONSTANTS } from "../../constants/teamNameFormConstants.js";
import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";
import { CHANNELS } from "../../../common/constants/channels";

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
			return res;
		} catch (err) {
			console.log("err", err);
			return err;
		}
	};
}
