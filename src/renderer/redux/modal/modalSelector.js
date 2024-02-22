const getFileModalOpenStatus = (state) => state.modal.isFileModalOpen;

const getModalOpenStatus = (state) => state.modal.isModalOpen;
const getModalType = (state) => state.modal.modalType;

export { getFileModalOpenStatus, getModalOpenStatus, getModalType };
