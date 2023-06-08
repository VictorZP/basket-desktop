import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Box, FormControl, TextField, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ClearIcon from "@mui/icons-material/Clear";

import { getTeamEditStatus } from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CONSTANTS } from "../MSTeamNameForm/constants.js";

const TeamFormInputStack = ({
	teamNames,
	cyberName,
	selectedId,
	isLoading,
	handleTeamNames,
	onClearBtn,
}) => {
	const onEdit = useSelector(getTeamEditStatus);
	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	const isAddBtnDisabled =
		selectedId?.length > 0 &&
		teamNames.customName?.length > 0 &&
		(teamNames.fibaliveTeamName?.length > 0 ||
			teamNames.betsapiTeamName?.length > 0 ||
			teamNames.otherSiteName?.length > 0);

	const isClearBtnDisabled =
		cyberName?.length > 0 ||
		selectedId?.length > 0 ||
		teamNames.customName?.length > 0 ||
		teamNames.fibaliveTeamName?.length > 0 ||
		teamNames.betsapiTeamName?.length > 0 ||
		teamNames.otherSiteName?.length > 0;

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
					name={CONSTANTS.CUSTOM_NAME_INP}
					label={TEAM_NAMES_FORM.CUSTOM_TEAM_NAME_LABEL}
					value={teamNames?.customName}
					variant="outlined"
					size="small"
					onChange={handleTeamNames}
					disabled={!isInputDisabled}
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
					disabled={!isInputDisabled}
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
					disabled={!isInputDisabled}
				/>
			</FormControl>
			<FormControl>
				<TextField
					name={CONSTANTS.OTHER_SITE_INP}
					label={TEAM_NAMES_FORM.OTHER_SITE_TEAM_NAME_LABEL}
					value={teamNames?.otherSiteName}
					variant="outlined"
					size="small"
					onChange={handleTeamNames}
					disabled={!isInputDisabled}
				/>
			</FormControl>
			<LoadingButton
				type="submit"
				loading={isLoading}
				variant="outlined"
				disabled={!isAddBtnDisabled}
			>
				{!onEdit ? TEAM_NAMES_FORM.BTN_ADD : TEAM_NAMES_FORM.BTN_UPD}
			</LoadingButton>
			<IconButton
				size="small"
				sx={{ width: 35 }}
				color="error"
				disabled={!isClearBtnDisabled}
				onClick={onClearBtn}
			>
				<ClearIcon />
			</IconButton>
		</Box>
	);
};

TeamFormInputStack.propTypes = {
	teamNames: PropTypes.objectOf(PropTypes.string),
	cyberName: PropTypes.string,
	selectedId: PropTypes.string,
	isLoading: PropTypes.bool,
	handleTeamNames: PropTypes.func.isRequired,
	onClearBtn: PropTypes.func.isRequired,
};

export default TeamFormInputStack;