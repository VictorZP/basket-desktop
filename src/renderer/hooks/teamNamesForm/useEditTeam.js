import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	getTeamData,
	getTeamCyberId,
	getTeamEditStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";
import {
	setTeamNames,
	setSelectedChamp,
	refreshSelectedChamp,
} from "../../redux/matchSettings/matchSettingsSlice.js";

// Hook for editing team data
export const useEditTeam = (champShortList, generateChampOptions) => {
	const teamData = useSelector(getTeamData);
	const onEdit = useSelector(getTeamEditStatus);
	const cyberId = useSelector(getTeamCyberId);

	const dispatch = useDispatch();

	useEffect(() => {
		if (teamData?.teamId) {
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
				fibaliveTeamName: teamData?.fibaliveTeamName,
				betsapiTeamName: teamData?.betsapiTeamName,
				otherSiteTeamName: teamData?.otherSiteTeamName,
			};

			generateChampOptions();
			dispatch(setSelectedChamp(champData));
			dispatch(setTeamNames(teamEditData));
		}
	}, [cyberId, onEdit, teamData]);
};
