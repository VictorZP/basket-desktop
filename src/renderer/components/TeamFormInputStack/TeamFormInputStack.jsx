import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

import NameTextField from "../../ui/teamNames/NameTextField.jsx";

import {
	getTeamData,
	getSelectedChamp,
	getTeamEditStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CONSTANTS } from "../../constants/teamNameFormConstants.js";

const TeamFormInputStack = ({ handleTeamNames }) => {
	const onEdit = useSelector(getTeamEditStatus);
	const teamData = useSelector(getTeamData);
	const selectedChamp = useSelector(getSelectedChamp);

	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	const isInputDisabled = selectedChamp?.id;

	return (
		<Box
			sx={{
				display: "grid",
				gap: 2,
				padding: "10px 0px",
				mb: 2,
			}}
		>
			<Typography variant="p">
				{TEAM_NAMES_FORM.CUSTOM_TEAM_NAME_TITLE}
			</Typography>
			<NameTextField
				name={CONSTANTS.TEAM_NAME_INP}
				label={TEAM_NAMES_FORM.CUSTOM_TEAM_NAME_LABEL}
				value={teamData?.teamName}
				onChange={handleTeamNames}
				disabled={!isInputDisabled && !onEdit}
				required={true}
			/>
			<Typography variant="p">
				{TEAM_NAMES_FORM.FIBALIVE_TEAM_NAME_TITLE}
			</Typography>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(150px, 210px)) ",
					gap: 2,
				}}
			>
				<NameTextField
					name={CONSTANTS.FIBALIVE_NAME_INP_1}
					label={`${TEAM_NAMES_FORM.FIBALIVE_TEAM_NAME_LABEL} 1`}
					value={teamData?.fibaliveTeamName1}
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.FIBALIVE_NAME_INP_2}
					label={`${TEAM_NAMES_FORM.FIBALIVE_TEAM_NAME_LABEL} 2`}
					value={teamData?.fibaliveTeamName2}
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.FIBALIVE_NAME_INP_3}
					label={`${TEAM_NAMES_FORM.FIBALIVE_TEAM_NAME_LABEL} 3`}
					value={teamData?.fibaliveTeamName3}
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
					style={false}
				/>
			</Box>
			<Typography variant="p">
				{TEAM_NAMES_FORM.BETSAPI_TEAM_NAME_TITLE}
			</Typography>
			<NameTextField
				name={CONSTANTS.BETSAPI_NAME_INP}
				label={TEAM_NAMES_FORM.BETSAPI_TEAM_NAME_LABEL}
				value={teamData?.betsapiTeamName}
				onChange={handleTeamNames}
				disabled={!isInputDisabled && !onEdit}
			/>
			<Typography variant="p">
				{TEAM_NAMES_FORM.OTHER_SITE_TEAM_NAME_TITLE}
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
		</Box>
	);
};

TeamFormInputStack.propTypes = {
	handleTeamNames: PropTypes.func.isRequired,
};

export default TeamFormInputStack;
