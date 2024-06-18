const { useEffect } = require("react");
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;
const { STATUS, CHANNELS } = require("../../../common/constants");

const useGetHalvesFilesNames = (setFilesNames) => {
	useEffect(() => {
		ipcRenderer
			.invoke(CHANNELS.SETTINGS.GET_HALVES_FILES_NAMES)
			.then((res) => {
				if (res?.status === STATUS.ERROR) {
					enqueueSnackbar(res.message, { variant: STATUS.ERROR });
				}

				setFilesNames({ ...res?.filesNames });
			})
			.catch((err) => {
				return err;
			});
	}, []);
};

export default useGetHalvesFilesNames;
