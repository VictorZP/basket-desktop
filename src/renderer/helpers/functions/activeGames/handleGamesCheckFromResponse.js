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

	// Check for the presence of a match in the array, as well as checking the status of the match (whether to display it or not)
	switch (true) {
		case ndx < 0 && gameFromResponse?.status === ACTIVE_PAGE.MOMENT_CHECKED:
		case ndx < 0 &&
			gameFromResponse?.difRes === ACTIVE_PAGE.NO_BET_DIFFERENCE &&
			!gameFromResponse?.noBets:
		case ndx >= 0 && matches[ndx]?.statusFront === ACTIVE_PAGE.STATUS:
			break;
		case ndx < 0:
			matchesData.push(gameFromResponse);
			setMatches(matchesData);
			ipcRenderer.send(CHANNELS.ANALYZE.SHOW_NOTIFICATION, gameFromResponse); // Sends a notification when a bid first appears
			break;
		case ndx >= 0 && gameFromResponse?.status === ACTIVE_PAGE.MOMENT_CHECKED:
			matchesData.splice(ndx, 1);
			setMatches(matchesData);
			break;
		case ndx >= 0 && matches[ndx]?.statusFront !== ACTIVE_PAGE.STATUS:
			matchesData.splice(ndx, 1, gameFromResponse);
			setMatches(matchesData);
			break;

		default:
			break;
	}
};

export default handleGamesCheckFromResponse;
