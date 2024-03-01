import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { Box, Typography, Divider } from "@mui/material";

import { useGetAllCyber } from "../../hooks/msPage/useGetAllCyber.js";
import { useSetChampOptions } from "../../hooks/teamsTransfer/useSetChampOptions.js";
import { useGetShortChampList } from "../../hooks/teamNamesForm/index.js";
import CommonHandler from "../../helpers/classes/CommonHandler.js";
import ModalHandler from "../../helpers/classes/modal.js";
import { TeamsTransfer } from "../../helpers/classes/TeamsTransfer.js";

import { TeamFormSelectStack } from "../../ui/teamSettings/index.js";
import {
	Header,
	TransferTypeSelect,
	TransferList,
} from "../../ui/teamsTransfer/index.js";

import ButtonStack from "../../ui/ButtonStack.jsx";

import {
	getOutCyberId,
	getOutChampId,
	getOutChampOptions,
	getTargetCyberId,
	getTargetChampId,
	getTargetChampOptions,
	getTransferType,
	getTeamsIdsArray,
} from "../../redux/teamTransfer/teamTransferSelector.js";
import { refreshTransferModal } from "../../redux/teamTransfer/teamTransferSlice.js";

import { CONSTANTS } from "../../constants/teamNameFormConstants.js";
import { TRANSFER_TYPE, TEXT } from "../../constants/teamsTransferConstants.js";

const TransferModal = () => {
	const [cyberList, setCyberList] = useState([]);
	const [champShortList, setChampShortList] = useState([]);

	const outCyberId = useSelector(getOutCyberId);
	const outChampId = useSelector(getOutChampId);
	const outChampOptions = useSelector(getOutChampOptions);
	const targetCyberId = useSelector(getTargetCyberId);
	const targetChampId = useSelector(getTargetChampId);
	const targetChampOptions = useSelector(getTargetChampOptions);
	const transferType = useSelector(getTransferType);
	const teamIdsArray = useSelector(getTeamsIdsArray);

	const dispatch = useDispatch();

	const transferHandler = new TeamsTransfer(dispatch);

	useGetAllCyber(setCyberList);

	// Get short list of championships
	useGetShortChampList(setChampShortList);

	// Forming options for championship select
	useSetChampOptions(champShortList);

	// Clear redux state on unmount
	useEffect(() => {
		return () => {
			dispatch(refreshTransferModal());
		};
	}, []);

	const options = CommonHandler.getCyberSelectOptions(cyberList);
	const isBtnDisabled = transferHandler.handleBtnDisabled(
		transferType,
		teamIdsArray
	);

	const handleTeamTransfer = async () => {
		const reqDataObj = {
			outCyberId,
			targetCyberId,
			outChampId,
			targetChampId,
			transferType,
			teamIdsArray,
		};
		const res = await transferHandler.handleTransfer(reqDataObj);

		if (res?.statusText !== "OK") {
			enqueueSnackbar(res?.message ?? TEXT.TRANSFER_ERROR, {
				variant: "error",
			});
		}

		if (res?.status === 200) {
			enqueueSnackbar(TEXT.TRANSFER_SUCCESS, { variant: "success" });
		}
	};

	const handleClose = () => {
		ModalHandler.closeModal(dispatch);
	};

	return (
		<Box
			sx={{
				minWidth: "1100px",
				height: "100%",
				background: "white",
			}}
		>
			<Header />
			<Box
				sx={{
					p: 3,
					display: "grid",
					gridTemplateColumns: "repeat(2, 500px)",
					gap: 2,
				}}
			>
				<Box>
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
				<Box>
					<Typography variant="h5" sx={{ mb: 2 }}>
						{TEXT.TARGET_GROUP_TITLE}
					</Typography>
					<TeamFormSelectStack
						cyberId={targetCyberId}
						selectedChamp={targetChampId}
						pageType={CONSTANTS.PAGE_TYPE.MS}
						cyberOptions={options}
						champOptions={targetChampOptions}
						handleChange={(e) => {
							transferHandler.handleIdsChange(e, TRANSFER_TYPE.TARGET);
						}}
					/>
				</Box>
			</Box>
			<Divider />
			<TransferTypeSelect />
			{transferType === TRANSFER_TYPE.VALUE_CUSTOM ? (
				<TransferList
					isNotInList={transferHandler.isNotInList}
					handleIntersection={transferHandler.handleIntersection}
					handleInputSearch={transferHandler.handleInputSearch}
				/>
			) : null}
			<Divider />
			<ButtonStack
				saveText={TEXT.TRANSFER_BTN}
				closeText={TEXT.CLOSE_BTN}
				isDisabled={!isBtnDisabled}
				handleSave={handleTeamTransfer}
				handleClose={handleClose}
			/>
		</Box>
	);
};

export default TransferModal;
