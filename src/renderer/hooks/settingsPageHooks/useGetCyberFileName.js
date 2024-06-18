const { useEffect } = require("react");
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;
const { STATUS, CHANNELS } = require("../../../common/constants");

const useGetCyberFileName = (setFilesNames) => {
	useEffect(() => {
		ipcRenderer
			.invoke(CHANNELS.SETTINGS.GET_CYBER_FILE_NAME)
			.then((res) => {
				if (res?.status === STATUS.ERROR) {
					enqueueSnackbar(res.message, { variant: STATUS.ERROR });
					return;
				}

				setFilesNames({ ...res?.filesNames });
			})
			.catch((err) => {
				enqueueSnackbar(err.message, { variant: STATUS.ERROR });
			});
	}, []);
};

export default useGetCyberFileName;
