import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
	setTransferTeamsIds,
	refreshTransferTeamsIds,
} from "../../redux/teamTransfer/teamTransferSlice.js";

export const useSetTeamsIds = (listForTransfer, disabledIds) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const isListChanged = listForTransfer?.find((team) => {
			const isTeamIn = disabledIds.indexOf(team.teamId);

			if (isTeamIn === -1) {
				return true;
			}
		});

		if (isListChanged) {
			const idsArray = listForTransfer.map((team) => team.teamId);

			dispatch(setTransferTeamsIds(idsArray));
		} else {
			dispatch(refreshTransferTeamsIds());
		}
	}, [listForTransfer]);
};
