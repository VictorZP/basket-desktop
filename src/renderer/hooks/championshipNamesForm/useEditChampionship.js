import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getChampData } from "../../redux/matchSettings/matchSettingSelector.js";
import { setChampNames } from "../../redux/matchSettings/matchSettingsSlice.js";

// Hook for editing championship data
export const useEditChampionship = () => {
	const champData = useSelector(getChampData);

	const dispatch = useDispatch();

	useEffect(() => {
		if (champData?.championshipId) {
			const champEditData = {
				championshipName: champData?.championshipName,
				fibaliveChampName1: champData?.fibaliveChampName1,
				fibaliveChampName2: champData?.fibaliveChampName2,
				fibaliveChampName3: champData?.fibaliveChampName3,
				betsapiChampName1: champData?.betsapiChampName1,
				betsapiChampName2: champData?.betsapiChampName2,
				betsapiChampName3: champData?.betsapiChampName3,
				otherSiteChampName1: champData?.otherSiteChampName1,
				otherSiteChampName2: champData?.otherSiteChampName2,
				otherSiteChampName3: champData?.otherSiteChampName3,
				cyberId: champData?.cyberId,
				noBetsList: champData?.noBetsList,
			};

			dispatch(setChampNames(champEditData));
		}
	}, [champData]);
};
