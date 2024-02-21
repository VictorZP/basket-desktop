import { useEffect } from "react";

// Hook for editing team data
export const useEditTeam = (
	teamData,
	setId,
	setSelectedChamp,
	initialChamp,
	champShortList,
	generateChampOptions,
	setTeamNames,
	cyberId,
	onEdit
) => {
	useEffect(() => {
		if (teamData?.teamId) {
			setId(teamData?.cyberId);
			setSelectedChamp(initialChamp);
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
			setSelectedChamp(champData);
			setTeamNames(teamEditData);
		}
	}, [cyberId, onEdit, teamData]);
};
