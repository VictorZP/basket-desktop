import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getOutCyberId } from "../../redux/teamTransfer/teamTransferSelector.js";
import {
	setTransferChampOptions,
	refreshTransferData,
} from "../../redux/teamTransfer/teamTransferSlice.js";

// Hook for setting championship options
export const useSetChampOptions = (champShortList) => {
	const outCyberId = useSelector(getOutCyberId);
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
		if (outCyberId) {
			const options = generateChampOptions(outCyberId);
			dispatch(refreshTransferData({ key: "outChampId" }));
			dispatch(setTransferChampOptions({ key: "outChampOptions", options }));
		}
	}, [outCyberId]);

	// useEffect(() => {
	// 	if (outCyberId) {
	// 		const options = generateChampOptions(outCyberId);
	// 		dispatch(setTransferChampOptions({ key: "outChampOptions", options }));
	// 	}
	// }, [outCyberId]);
};
