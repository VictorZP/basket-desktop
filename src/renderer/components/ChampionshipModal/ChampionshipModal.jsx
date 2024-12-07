import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { Box, Button, Typography } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import { ChampFormSelectStack } from "../../ui/championshipSettings/index.js";
import ChampFormInputStack from "../ChampFormInputStack";
import ChampNamesModalBtn from "../ChampNamesModalBtn/ChampNamesModalBtn.jsx";
import LoadingSpinner from "../LoadingSpinner";

import {
	setChampCyberId,
	setChampName,
	refreshChampData,
	setChampLoadingStatus,
	handleEditModalLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getCyberList,
	getChampCyberId,
	getChampData,
} from "../../redux/matchSettings/matchSettingSelector.js";
import { useHandleChampAdd } from "../../hooks/championshipNamesForm";

import CommonHandler from "../../helpers/classes/CommonHandler.js";

import {
	ChampionshipModalContainer,
	ChampionshipModalInnerBox,
} from "../../helpers/reusableComponents/championshipsModal.js";

import { CONSTANTS, TEXT } from "../../constants/champNameFormConstants.js";
import { MATCHES_SETTINGS, CHANNELS } from "../../../common/constants";

const ChampionshipModal = () => {
	const cyberId = useSelector(getChampCyberId);
	const cyberList = useSelector(getCyberList);
	const champData = useSelector(getChampData);
	// const onEdit = useSelector(getChampEditStatus);
	// const isEditLoading = useSelector(getEditModalLoadingStatus);
	const onEdit = false;
	const isEditLoading = false;

	const dispatch = useDispatch();

	const { CHAMPIONSHIP_FORM } = MATCHES_SETTINGS;

	//  Handle champ add response
	useHandleChampAdd();

	const options = CommonHandler.getCyberSelectOptions(cyberList);

	const handleChange = (e) => {
		const name = e?.target?.name;
		const inputValue = e?.target?.value;

		switch (name) {
			case CONSTANTS.CYBER_SELECT_NAME:
				dispatch(setChampCyberId(inputValue));
				break;

			case CONSTANTS.CHAMP_NAME_INPUT:
			case CONSTANTS.FIBALIVE_NAME_INP_1:
			case CONSTANTS.FIBALIVE_NAME_INP_2:
			case CONSTANTS.FIBALIVE_NAME_INP_3:
			case CONSTANTS.BETSAPI_NAME_INP_1:
			case CONSTANTS.BETSAPI_NAME_INP_2:
			case CONSTANTS.BETSAPI_NAME_INP_3:
			case CONSTANTS.OTHER_SITE_INP_1:
			case CONSTANTS.OTHER_SITE_INP_2:
			case CONSTANTS.OTHER_SITE_INP_3:
				dispatch(setChampName({ name, value: inputValue }));
				break;

			case CONSTANTS.NO_BETS:
				dispatch(setChampName({ name, value: e?.target?.checked }));
				break;

			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		try {
			dispatch(setChampLoadingStatus(true));
			const reqData = {
				champ: {
					championshipName: champData.championshipName,
					fibaliveChampName1: champData.fibaliveChampName1,
					fibaliveChampName2: champData.fibaliveChampName2,
					fibaliveChampName3: champData.fibaliveChampName3,
					betsapiChampName1: champData.betsapiChampName1,
					betsapiChampName2: champData.betsapiChampName2,
					betsapiChampName3: champData.betsapiChampName3,
					otherSiteChampName1: champData.otherSiteChampName1,
					otherSiteChampName2: champData.otherSiteChampName2,
					otherSiteChampName3: champData.otherSiteChampName3,
					cyberId: champData.cyberId,
					noBetsList: champData.noBetsList,
				},
			};

			ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, reqData);

			dispatch(setChampLoadingStatus(false));
		} catch (err) {
			enqueueSnackbar(err?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR, {
				variant: "error",
			});
		}
	};

	const onClearBtn = () => {
		dispatch(refreshChampData());
		dispatch(setChampLoadingStatus(false));
	};

	const isClearBtnDisabled =
		champData.cyberId?.length > 0 ||
		champData.championshipName?.length > 0 ||
		champData.fibaliveChampName1?.length > 0 ||
		champData.fibaliveChampName2?.length > 0 ||
		champData.fibaliveChampName3?.length > 0 ||
		champData.betsapiChampName1?.length > 0 ||
		champData.betsapiChampName2?.length > 0 ||
		champData.betsapiChampName3?.length > 0 ||
		champData.otherSiteChampName1?.length > 0 ||
		champData.otherSiteChampName2?.length > 0 ||
		champData.otherSiteChampName3?.length > 0;

	return (
		<ChampionshipModalContainer>
			<ChampionshipModalInnerBox>
				<Typography variant="h5" mb={2}>
					{onEdit
						? CHAMPIONSHIP_FORM.EDIT_CHAMP_TITLE
						: CHAMPIONSHIP_FORM.ADD_CHAMP_TITLE}
				</Typography>
				{isEditLoading ? (
					<LoadingSpinner height={"562px"} />
				) : (
					<Box component="form" onSubmit={handleSubmit}>
						<Box mb={3}>
							<ChampFormSelectStack
								cyberId={cyberId}
								cyberOptions={options}
								pageType={CONSTANTS.PAGE_TYPE.MS}
								handleChange={handleChange}
							/>
							<ChampFormInputStack handleChampNames={handleChange} />
							<Button
								variant="outlined"
								color="error"
								disabled={!isClearBtnDisabled}
								sx={{ width: "210px" }}
								onClick={onClearBtn}
							>
								{TEXT.BTN_CLEAR}
							</Button>
						</Box>
						<ChampNamesModalBtn />
					</Box>
				)}
			</ChampionshipModalInnerBox>
		</ChampionshipModalContainer>
	);
};

export default ChampionshipModal;
