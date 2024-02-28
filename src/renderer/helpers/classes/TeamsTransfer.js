import { setTransferData } from "../../redux/teamTransfer/teamTransferSlice.js";
import { CONSTANTS } from "../../constants/teamNameFormConstants.js";
import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";

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
				key = type === TRANSFER_TYPE.OUT ? "outCyberId" : "";
				break;
			case CONSTANTS.CHAMP_SELECT_NAME:
				key = type === TRANSFER_TYPE.OUT ? "outChampId" : "";
				break;

			default:
				break;
		}

		this.dispatch(setTransferData({ id, key }));
	};

	// Handler for championship options
	handleChampOptions = (cyberId, champShortList, generateChampOptions) => {
		if (cyberId) {
			generateChampOptions();
		}
	};
}
