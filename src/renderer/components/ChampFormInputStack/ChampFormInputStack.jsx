import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
	Box,
	Typography,
	Checkbox,
	FormControl,
	FormControlLabel,
} from "@mui/material";

import NameTextField from "../../ui/teamNames/NameTextField.jsx";

import {
	getChampData,
	getChampCyberId,
	getChampEditStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CONSTANTS } from "../../constants/champNameFormConstants.js";

const ChampFormInputStack = ({ handleChampNames }) => {
	const onEdit = useSelector(getChampEditStatus);
	const champData = useSelector(getChampData);
	const selectedCyber = useSelector(getChampCyberId);

	const isInputDisabled = selectedCyber;

	const { CHAMPIONSHIP_FORM } = MATCHES_SETTINGS;
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
				{CHAMPIONSHIP_FORM.CUSTOM_CHAMP_NAME_TITLE}
			</Typography>
			<NameTextField
				name={CONSTANTS.CHAMP_NAME_INPUT}
				label={CHAMPIONSHIP_FORM.CUSTOM_CHAMP_NAME_LABEL}
				value={champData?.championshipName || ""}
				onChange={handleChampNames}
				disabled={!isInputDisabled && !onEdit}
				required={true}
			/>

			<Typography variant="p">
				{CHAMPIONSHIP_FORM.FIBALIVE_CHAMP_NAME_TITLE}
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
					label={`${CHAMPIONSHIP_FORM.FIBALIVE_CHAMP_NAME_LABEL} 1`}
					value={champData?.fibaliveChampName1}
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.FIBALIVE_NAME_INP_2}
					label={`${CHAMPIONSHIP_FORM.FIBALIVE_CHAMP_NAME_LABEL} 2`}
					value={champData?.fibaliveChampName2}
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.FIBALIVE_NAME_INP_3}
					label={`${CHAMPIONSHIP_FORM.FIBALIVE_CHAMP_NAME_LABEL} 3`}
					value={champData?.fibaliveChampName3}
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
					style={false}
				/>
			</Box>

			<Typography variant="p">
				{CHAMPIONSHIP_FORM.BETSAPI_CHAMP_NAME_TITLE}
			</Typography>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(150px, 210px)) ",
					gap: 2,
				}}
			>
				<NameTextField
					name={CONSTANTS.BETSAPI_NAME_INP_1}
					label={`${CHAMPIONSHIP_FORM.BETSAPI_CHAMP_NAME_LABEL} 1`}
					value={champData?.betsapiChampName1}
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.BETSAPI_NAME_INP_2}
					label={`${CHAMPIONSHIP_FORM.BETSAPI_CHAMP_NAME_LABEL} 2`}
					value={champData?.betsapiChampName2}
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.BETSAPI_NAME_INP_3}
					label={`${CHAMPIONSHIP_FORM.BETSAPI_CHAMP_NAME_LABEL} 3`}
					value={champData?.betsapiChampName3}
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
				/>
			</Box>

			<Typography variant="p">
				{CHAMPIONSHIP_FORM.OTHER_SITE_CHAMP_NAME_TITLE}
			</Typography>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(150px, 210px)) ",
					gap: 2,
				}}
			>
				<NameTextField
					name={CONSTANTS.OTHER_SITE_INP_1}
					label={`${CHAMPIONSHIP_FORM.OTHER_SITE_CHAMP_NAME_LABEL} 1`}
					value={champData?.otherSiteChampName1}
					variant="outlined"
					size="small"
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.OTHER_SITE_INP_2}
					label={`${CHAMPIONSHIP_FORM.OTHER_SITE_CHAMP_NAME_LABEL} 2`}
					value={champData?.otherSiteChampName2}
					variant="outlined"
					size="small"
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
				/>
				<NameTextField
					name={CONSTANTS.OTHER_SITE_INP_3}
					label={`${CHAMPIONSHIP_FORM.OTHER_SITE_CHAMP_NAME_LABEL} 3`}
					value={champData?.otherSiteChampName3}
					variant="outlined"
					size="small"
					onChange={handleChampNames}
					disabled={!isInputDisabled && !onEdit}
				/>
			</Box>

			<Typography variant="p">{CHAMPIONSHIP_FORM.NO_BETS_TITLE}</Typography>
			<Box>
				<FormControl>
					<FormControlLabel
						sx={{ mx: "auto" }}
						control={
							<Checkbox
								name={CONSTANTS.NO_BETS}
								onChange={handleChampNames}
								checked={champData?.noBetsList || false}
								disabled={!isInputDisabled && !onEdit}
							/>
						}
						labelPlacement="start"
						label={CHAMPIONSHIP_FORM.NO_BETS_CHECKBOX}
					/>
				</FormControl>
			</Box>
		</Box>
	);
};

ChampFormInputStack.propTypes = {
	handleChampNames: PropTypes.func.isRequired,
};

export default ChampFormInputStack;
