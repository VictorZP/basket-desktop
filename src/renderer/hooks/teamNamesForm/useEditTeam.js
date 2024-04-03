import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	getTeamData,
	getTeamCyberId,
} from "../../redux/matchSettings/matchSettingSelector.js";
import {
	setTeamNames,
	setSelectedChamp,
	refreshSelectedChamp,
} from "../../redux/matchSettings/matchSettingsSlice.js";

// Hook for editing team data
export const useEditTeam = (champShortList, generateChampOptions) => {
	const teamData = useSelector(getTeamData);
	const cyberId = useSelector(getTeamCyberId);

	const dispatch = useDispatch();

	useEffect(() => {
		if (teamData?.teamId && champShortList?.length > 0) {
			dispatch(refreshSelectedChamp());
			const champ = champShortList?.find(({ championshipId }) => {
				return championshipId === teamData?.championshipId;
			});

			const champData = {
				id: champ?.championshipId ?? "",
				value: champ?.championshipId ?? "",
				label: champ?.championshipName ?? "",
			};

			const teamEditData = {
				teamName: teamData?.teamName,
				fibaliveTeamName1: teamData?.fibaliveTeamName1,
				fibaliveTeamName2: teamData?.fibaliveTeamName2,
				fibaliveTeamName3: teamData?.fibaliveTeamName3,
				betsapiTeamName: teamData?.betsapiTeamName,
				otherSiteTeamName: teamData?.otherSiteTeamName,
			};

			generateChampOptions();
			dispatch(setSelectedChamp(champData));
			dispatch(setTeamNames(teamEditData));
		}
	}, [cyberId, teamData, champShortList]);
};
