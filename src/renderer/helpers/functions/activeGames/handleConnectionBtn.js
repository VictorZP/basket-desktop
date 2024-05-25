import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { STATUS } from "../../../../common/constants/index.js";
import { CHANNELS } from "../../../../common/constants/channels.js";
import { ACTIVE_PAGE } from "../../../constants/activeGamesPage.js";

const handleConnectionBtn = async (
	isConnected,
	connectedStatus,
	setIsConnected,
	setConnectionLoadingStatus
) => {
	setConnectionLoadingStatus(true);
	try {
		const connectionResult = await ipcRenderer.invoke(
			CHANNELS.ANALYZE.CONNECT,
			connectedStatus.current
		);

		if (connectionResult.status === STATUS.NOT_CONNECTED) {
			enqueueSnackbar(ACTIVE_PAGE.MESSAGES.NO_CONNECTION, {
				variant: "info",
			});

			if (isConnected) {
				setIsConnected(false); // only changes isConnected state for button styles
			}

			return;
		}

		// change both state and ref
		connectedStatus.current = !connectedStatus.current;
		setIsConnected((prevState) => !prevState);
	} catch (err) {
		enqueueSnackbar(err?.message ?? ACTIVE_PAGE.MESSAGES.CONNECTION_ERROR, {
			variant: "error",
		});
	} finally {
		setConnectionLoadingStatus(false);
	}
};

export default handleConnectionBtn;
