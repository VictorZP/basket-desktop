import { CHANNELS } from "../../../../common/constants/channels";
import { ACTIVE_PAGE } from "../../../constants/activeGamesPage";

const ipcRenderer = window.require("electron").ipcRenderer;

const handleGamesCheckFromResponse = (
	matches,
	gameFromResponse,
	setMatches
) => {
	const matchesData = [...matches];

	const ndx = matchesData.findIndex(
		(match) => match?.matchId === gameFromResponse?.matchId
	);

	// Checking for the presence of a match in the array, as well as checking the status of the match (whether to display it or not)
	if (ndx < 0) {
		matchesData.push(gameFromResponse);
		setMatches(matchesData);
		ipcRenderer.send(CHANNELS.ANALYZE.SHOW_NOTIFICATION, gameFromResponse); // Sends a notification when a bid first appears
		return;
	}

	if (matches[ndx]?.status === ACTIVE_PAGE.MOMENT_CHECKED) {
		matchesData.splice(ndx, 1);
		setMatches(matchesData);
		return;
	}

	if (matches[ndx]?.statusFront === ACTIVE_PAGE.STATUS) {
		return;
	}

	if (matches[ndx]?.statusFront !== ACTIVE_PAGE.STATUS) {
		matchesData.splice(ndx, 1, gameFromResponse);
		setMatches(matchesData);
	}
};

export default handleGamesCheckFromResponse;
