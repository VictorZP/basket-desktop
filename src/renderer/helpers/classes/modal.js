import {
	handleModalOpen,
	setModalType,
	refreshModalState,
} from "../../redux/modal/modalSlice.js";

import {
	handleEditTeam,
	refreshTeamData,
	refreshSelectedChamp,
} from "../../redux/matchSettings/matchSettingsSlice.js";

import { MODAL_TYPES } from "../../constants/modalTypes.js";

class ModalHandler {
	openModal(dispatch, type) {
		dispatch(handleModalOpen(true));
		dispatch(setModalType(type));
	}

	closeModal(dispatch, type) {
		dispatch(handleModalOpen(false));
		dispatch(refreshModalState());

		// Refresh championship data after closing championship modal
		// TODO

		// Refresh team data and selected champ after closing team names modal
		if (type === MODAL_TYPES.TEAM_ADD) {
			dispatch(refreshTeamData());
			dispatch(refreshSelectedChamp());
			dispatch(handleEditTeam(false));
		}
	}
}

export default new ModalHandler();
