import { ACTIVE_PAGE } from "../../../constants/activeGamesPage";

const isActiveStatus = (match) => match?.statusFront !== ACTIVE_PAGE.STATUS;
const hasBets = (match) => !match?.noBets;
const hasTotal = (match) => match?.total !== 0;
const hasKickOff = (match) => match?.kickOff !== 0;

const makeMatchesFilteredList = (matches, isManual) => {
	return matches.filter((match) => {
		if (isManual) {
			return (
				isActiveStatus(match) &&
				(!hasBets(match) ||
					!hasKickOff(match) ||
					(hasBets(match) && !hasTotal(match)))
			);
		} else {
			return (
				isActiveStatus(match) &&
				hasBets(match) &&
				hasTotal(match) &&
				hasKickOff(match)
			);
		}
	});
};

export default makeMatchesFilteredList;
