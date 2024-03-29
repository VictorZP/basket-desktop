import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
	Box,
	FormControl,
	TextField,
	Typography,
	Divider,
} from "@mui/material";

import SaveBtn from "../../ui/SaveBtn.jsx";
import IconBtn from "../../ui/iconBtn.jsx";
import NameTextField from "../../ui/teamNames/NameTextField.jsx";

import {
	getTeamData,
	getSelectedChamp,
	getTeamEditStatus,
	getTeamLoadingStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CONSTANTS } from "../../constants/teamNameFormConstants.js";

const TeamFormInputStack = ({ handleTeamNames, onClearBtn }) => {
	const onEdit = useSelector(getTeamEditStatus);
	const teamData = useSelector(getTeamData);
	const selectedChamp = useSelector(getSelectedChamp);
	const isLoading = useSelector(getTeamLoadingStatus);

	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	const isAddBtnDisabled =
		selectedChamp?.id?.length > 0 &&
		teamData.teamName?.length > 0 &&
		(teamData.fibaliveTeamName?.length > 0 ||
			teamData.betsapiTeamName?.length > 0 ||
			teamData.otherSiteTeamName?.length > 0);

	const isClearBtnDisabled =
		teamData.cyberId?.length > 0 ||
		selectedChamp?.id?.length > 0 ||
		teamData.customName?.length > 0 ||
		teamData.fibaliveTeamName?.length > 0 ||
		teamData.betsapiTeamName?.length > 0 ||
		teamData.otherSiteTeamName?.length > 0;

	const isInputDisabled = selectedChamp?.id;

	return (
		<Box
			sx={{
				display: "grid",
				gap: 2,
				padding: "10px 0px",
			}}
		>
			<Typography variant="p">Личное название команды</Typography>
			<NameTextField
				name={CONSTANTS.TEAM_NAME_INP}
				label={TEAM_NAMES_FORM.CUSTOM_TEAM_NAME_LABEL}
				value={teamData?.teamName}
				onChange={handleTeamNames}
				disabled={!isInputDisabled && !onEdit}
				required={true}
			/>
			<Typography variant="p">
				Названия команды в соответствии с Fibalive
			</Typography>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(150px, 210px)) ",
					gap: 2,
				}}
			>
				<NameTextField
					name={CONSTANTS.FIBALIVE_NAME_INP}
					label={`${TEAM_NAMES_FORM.FIBALIVE_TEAM_NAME_LABEL} 1`}
					value={teamData?.fibaliveTeamName}
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.FIBALIVE_NAME_INP}
					label={`${TEAM_NAMES_FORM.FIBALIVE_TEAM_NAME_LABEL} 2`}
					value={teamData?.fibaliveTeamName}
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.FIBALIVE_NAME_INP}
					label={`${TEAM_NAMES_FORM.FIBALIVE_TEAM_NAME_LABEL} 3`}
					value={teamData?.fibaliveTeamName}
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
					style={false}
				/>
			</Box>
			<Typography variant="p">
				Названия команды в соответствии с BetsApi
			</Typography>
			<NameTextField
				name={CONSTANTS.BETSAPI_NAME_INP}
				label={TEAM_NAMES_FORM.BETSAPI_TEAM_NAME_LABEL}
				value={teamData?.betsapiTeamName}
				onChange={handleTeamNames}
				disabled={!isInputDisabled && !onEdit}
			/>
			<Typography variant="p">
				Названия команды в соответствии с сайтом чемпионата
			</Typography>
			<NameTextField
				name={CONSTANTS.OTHER_SITE_INP}
				label={TEAM_NAMES_FORM.OTHER_SITE_TEAM_NAME_LABEL}
				value={teamData?.otherSiteTeamName}
				variant="outlined"
				size="small"
				onChange={handleTeamNames}
				disabled={!isInputDisabled && !onEdit}
			/>
			{/* <SaveBtn
				isLoading={isLoading}
				onEdit={onEdit}
				isDisabled={!isAddBtnDisabled}
			/>
			<IconBtn isDisabled={!isClearBtnDisabled} onClearBtn={onClearBtn} /> */}
		</Box>
	);
};

TeamFormInputStack.propTypes = {
	handleTeamNames: PropTypes.func.isRequired,
	onClearBtn: PropTypes.func.isRequired,
};

export default TeamFormInputStack;
