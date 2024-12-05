import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button } from "@mui/material";

import {
	getChampData,
	getChampEditStatus,
	getChampionshipsLoadingStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";
import { getModalType } from "../../redux/modal/modalSelector.js";

import SaveBtn from "../../ui/SaveBtn.jsx";

import ModalHandler from "../../helpers/classes/modal.js";

import { TEXT } from "../../constants/champNameFormConstants.js";

const ChampNamesModalBtn = () => {
	const champData = useSelector(getChampData);
	const onEdit = useSelector(getChampEditStatus);
	const isLoading = useSelector(getChampionshipsLoadingStatus);
	const type = useSelector(getModalType);

	const dispatch = useDispatch();

	const closeModal = () => {
		ModalHandler.closeModal(dispatch, type);
	};

	const isAddBtnDisabled =
		champData.cyberId?.length > 0 &&
		champData.championshipName?.length > 0 &&
		(champData.fibaliveChampName1?.length > 0 ||
			champData.fibaliveChampName2?.length > 0 ||
			champData.fibaliveChampName3?.length > 0 ||
			champData.betsapiChampName1?.length > 0 ||
			champData.betsapiChampName2?.length > 0 ||
			champData.betsapiChampName3?.length > 0 ||
			champData.otherSiteChampName1?.length > 0 ||
			champData.otherSiteChampName2?.length > 0 ||
			champData.otherSiteChampName3?.length > 0);

	return (
		<Box display={"flex"} justifyContent={"center"} gap={2}>
			<SaveBtn
				isLoading={isLoading}
				onEdit={onEdit}
				isDisabled={!isAddBtnDisabled}
			/>
			<Button variant="outlined" sx={{ width: "110px" }} onClick={closeModal}>
				{TEXT.BTN_BACK}
			</Button>
		</Box>
	);
};

export default ChampNamesModalBtn;
