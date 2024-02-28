import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Typography } from "@mui/material";

import { TeamFormSelectStack } from "../../ui/teamSettings/index.js";

import { useGetAllCyber } from "../../hooks/msPage/useGetAllCyber.js";
import { useSetChampOptions } from "../../hooks/teamsTransfer/useSetChampOptions.js";
import { useGetShortChampList } from "../../hooks/teamNamesForm/index.js";
import CommonHandler from "../../helpers/classes/CommonHandler.js";
import { TeamsTransfer } from "../../helpers/classes/TeamsTransfer.js";

import { Header } from "../../ui/teamsTransfer/index.js";

import {
	getOutCyberId,
	getOutChampId,
	getOutChampOptions,
} from "../../redux/teamTransfer/teamTransferSelector.js";

import { CONSTANTS } from "../../constants/teamNameFormConstants.js";
import { TRANSFER_TYPE, TEXT } from "../../constants/teamsTransferConstants.js";

const TransferModal = () => {
	const [cyberList, setCyberList] = useState([]);
	const [champShortList, setChampShortList] = useState([]);

	const outCyberId = useSelector(getOutCyberId);
	const outChampId = useSelector(getOutChampId);
	const outChampOptions = useSelector(getOutChampOptions);

	const dispatch = useDispatch();

	const transferHandler = new TeamsTransfer(dispatch);

	useGetAllCyber(setCyberList);

	// Get short list of championships
	useGetShortChampList(setChampShortList);

	// Forming options for championship select
	useSetChampOptions(champShortList);

	const options = CommonHandler.getCyberSelectOptions(cyberList);

	const handleChange = () => {};

	return (
		<Box
			sx={{
				width: "100%",
				background: "white",
				height: "100%",
			}}
		>
			<Header />
			<Box sx={{ p: 3 }}>
				<Typography variant="h5" sx={{ mb: 2 }}>
					{TEXT.OUT_GROUP_TITLE}
				</Typography>
				<TeamFormSelectStack
					cyberId={outCyberId}
					selectedChamp={outChampId}
					pageType={CONSTANTS.PAGE_TYPE.MS}
					cyberOptions={options}
					champOptions={outChampOptions}
					handleChange={(e) => {
						transferHandler.handleIdsChange(e, TRANSFER_TYPE.OUT);
					}}
				/>
			</Box>
		</Box>
	);
};

export default TransferModal;
