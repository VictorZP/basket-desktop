import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	getLeftCyberId,
	getRightCyberId,
} from "../../redux/teamTransfer/teamTransferSelector.js";
import {
	setTransferChampOptions,
	refreshTransferData,
	refreshTransferType,
	handleSearchQuery,
} from "../../redux/teamTransfer/teamTransferSlice.js";
import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";

// Hook for setting championship options
export const useSetChampOptions = (champShortList) => {
	const leftCyberId = useSelector(getLeftCyberId);
	const rightCyberId = useSelector(getRightCyberId);
	const dispatch = useDispatch();

	const generateChampOptions = (id) => {
		const list = [...champShortList]?.filter((el) => {
			return el?.cyber?.cyberId === id;
		});
		const filteredOptions = list?.map((champ) => {
			return {
				value: champ?.championshipId,
				label: champ?.championshipName,
				id: champ?.championshipId,
			};
		});
		return filteredOptions;
	};

	// Forming options for championship select
	useEffect(() => {
		if (leftCyberId) {
			const options = generateChampOptions(leftCyberId);
			dispatch(refreshTransferType());
			dispatch(handleSearchQuery(""));
			dispatch(refreshTransferData({ key: TRANSFER_TYPE.LEFT_CHAMP_ID }));
			dispatch(
				setTransferChampOptions({
					key: TRANSFER_TYPE.LEFT_CHAMP_OPTIONS,
					options,
				})
			);
		}
	}, [leftCyberId]);

	useEffect(() => {
		if (rightCyberId) {
			const options = generateChampOptions(rightCyberId);
			dispatch(refreshTransferType());
			dispatch(refreshTransferData({ key: TRANSFER_TYPE.RIGHT_CHAMP_ID }));
			dispatch(
				setTransferChampOptions({
					key: TRANSFER_TYPE.RIGHT_CHAMP_OPTIONS,
					options,
				})
			);
		}
	}, [rightCyberId]);
};
