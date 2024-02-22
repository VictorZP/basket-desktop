import {
	handleModalOpen,
	setModalType,
	refreshModalState,
} from "../../redux/modal/modalSlice.js";

class ModalHandler {
	openModal(dispatch, type) {
		dispatch(handleModalOpen(true));
		dispatch(setModalType(type));
	}

	closeModal(dispatch) {
		dispatch(handleModalOpen(false));
		dispatch(refreshModalState());
	}
}

export default new ModalHandler();
