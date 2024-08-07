import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button } from "@mui/material";

import {
	getTeamData,
	getSelectedChamp,
	getTeamEditStatus,
	getTeamLoadingStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";
import { getModalType } from "../../redux/modal/modalSelector.js";

import SaveBtn from "../../ui/SaveBtn.jsx";

import ModalHandler from "../../helpers/classes/modal.js";

import { TEXT } from "../../constants/teamNameFormConstants.js";

const TeamNamesModalBtn = () => {
	const selectedChamp = useSelector(getSelectedChamp);
	const teamData = useSelector(getTeamData);
	const onEdit = useSelector(getTeamEditStatus);
	const isLoading = useSelector(getTeamLoadingStatus);
	const type = useSelector(getModalType);

	const dispatch = useDispatch();

	const closeModal = () => {
		ModalHandler.closeModal(dispatch, type);
	};

	const isAddBtnDisabled =
		selectedChamp?.id?.length > 0 &&
		teamData.teamName?.length > 0 &&
		(teamData.fibaliveTeamName1?.length > 0 ||
			teamData.fibaliveTeamName2?.length > 0 ||
			teamData.fibaliveTeamName3?.length > 0 ||
			teamData.betsapiTeamName1?.length > 0 ||
			teamData.betsapiTeamName2?.length > 0 ||
			teamData.betsapiTeamName3?.length > 0 ||
			teamData.otherSiteTeamName1?.length > 0 ||
			teamData.otherSiteTeamName2?.length > 0 ||
			teamData.otherSiteTeamName3?.length > 0);

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

export default TeamNamesModalBtn;
