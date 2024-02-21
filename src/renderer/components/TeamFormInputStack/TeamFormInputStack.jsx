import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Box, FormControl, TextField } from "@mui/material";

import SaveBtn from "../../ui/SaveBtn.jsx";
import IconBtn from "../../ui/iconBtn.jsx";

import { getTeamEditStatus } from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CONSTANTS } from "../../constants/teamNameFormConstants.js";

const TeamFormInputStack = ({
	teamNames,
	cyberId,
	selectedId,
	isLoading,
	handleTeamNames,
	onClearBtn,
}) => {
	const onEdit = useSelector(getTeamEditStatus);
	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	const isAddBtnDisabled =
		selectedId?.length > 0 &&
		teamNames.teamName?.length > 0 &&
		(teamNames.fibaliveTeamName?.length > 0 ||
			teamNames.betsapiTeamName?.length > 0 ||
			teamNames.otherSiteTeamName?.length > 0);

	const isClearBtnDisabled =
		cyberId?.length > 0 ||
		selectedId?.length > 0 ||
		teamNames.customName?.length > 0 ||
		teamNames.fibaliveTeamName?.length > 0 ||
		teamNames.betsapiTeamName?.length > 0 ||
		teamNames.otherSiteTeamName?.length > 0;

	const isInputDisabled = selectedId;

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
					value={teamNames?.teamName}
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
					value={teamNames?.fibaliveTeamName}
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
					value={teamNames?.betsapiTeamName}
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
					value={teamNames?.otherSiteTeamName}
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
	teamNames: PropTypes.objectOf(PropTypes.string),
	cyberId: PropTypes.string,
	selectedId: PropTypes.string,
	isLoading: PropTypes.bool,
	handleTeamNames: PropTypes.func.isRequired,
	onClearBtn: PropTypes.func.isRequired,
};

export default TeamFormInputStack;
