import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Box, FormControl, TextField } from "@mui/material";

import SaveBtn from "../../ui/SaveBtn.jsx";
import IconBtn from "../../ui/iconBtn.jsx";

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
				gridTemplateColumns: "repeat(4, minmax(150px, 210px)) 10% 5%",
				columnGap: "10px",
				alignItems: "center",
				padding: "10px 0px",
			}}
		>
			<FormControl>
				<TextField
					required
					name={CONSTANTS.TEAM_NAME_INP}
					label={TEAM_NAMES_FORM.CUSTOM_TEAM_NAME_LABEL}
					value={teamData?.teamName}
					variant="outlined"
					size="small"
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
				/>
			</FormControl>
			<FormControl>
				<TextField
					name={CONSTANTS.FIBALIVE_NAME_INP}
					label={TEAM_NAMES_FORM.FIBALIVE_TEAM_NAME_LABEL}
					value={teamData?.fibaliveTeamName}
					variant="outlined"
					size="small"
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
				/>
			</FormControl>
			<FormControl>
				<TextField
					name={CONSTANTS.BETSAPI_NAME_INP}
					label={TEAM_NAMES_FORM.BETSAPI_TEAM_NAME_LABEL}
					value={teamData?.betsapiTeamName}
					variant="outlined"
					size="small"
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
				/>
			</FormControl>
			<FormControl>
				<TextField
					name={CONSTANTS.OTHER_SITE_INP}
					label={TEAM_NAMES_FORM.OTHER_SITE_TEAM_NAME_LABEL}
					value={teamData?.otherSiteTeamName}
					variant="outlined"
					size="small"
					onChange={handleTeamNames}
					disabled={!isInputDisabled && !onEdit}
				/>
			</FormControl>
			<SaveBtn
				isLoading={isLoading}
				onEdit={onEdit}
				isDisabled={!isAddBtnDisabled}
			/>
			<IconBtn isDisabled={!isClearBtnDisabled} onClearBtn={onClearBtn} />
		</Box>
	);
};

TeamFormInputStack.propTypes = {
	handleTeamNames: PropTypes.func.isRequired,
	onClearBtn: PropTypes.func.isRequired,
};

export default TeamFormInputStack;
