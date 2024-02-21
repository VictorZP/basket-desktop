import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import TeamFormSelectStack from "../TeamFormSelectStack";
import TeamFormInputStack from "../TeamFormInputStack";

import {
	handleEditTeam,
	setTeamName,
	setTeamData,
	setTeamCyberId,
	refreshTeamData,
	setSelectedChamp,
	setTeamLoadingStatus,
	refreshSelectedChamp,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getTeamEditStatus,
	getTeamData,
	getTeamCyberId,
	getSelectedChamp,
} from "../../redux/matchSettings/matchSettingSelector.js";

import {
	useEditTeam,
	useHandleTeamAdd,
	useGetShortChampList,
	useHandleAfterTeamEdit,
} from "../../hooks/teamNamesForm/index.js";

import { CHANNELS } from "../../../common/constants/channels.js";
import { CONSTANTS } from "../../constants/teamNameFormConstants.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

const MSTeamNameForm = ({ cyberList }) => {
	const [champOptions, setChampOptions] = useState([]);
	const [champShortList, setChampShortList] = useState([]);

	const teamData = useSelector(getTeamData);
	const cyberId = useSelector(getTeamCyberId);
	const onEdit = useSelector(getTeamEditStatus);
	const selectedChamp = useSelector(getSelectedChamp);

	const dispatch = useDispatch();

	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	const generateChampOptions = () => {
		const list = [...champShortList]?.filter((el) => {
			return el?.cyber?.cyberId === cyberId;
		});

		const filteredOptions = list?.map((champ) => {
			return {
				value: champ?.championshipId,
				label: champ?.championshipName,
				id: champ?.championshipId,
			};
		});

		setChampOptions(filteredOptions);
	};

	// Get short list of championships
	useGetShortChampList(setChampShortList);

	// Edit team data
	useEditTeam(champShortList, generateChampOptions);

	//  Handle add team response
	useHandleTeamAdd();

	// Forming options for championship select
	useEffect(() => {
		if (cyberId) {
			generateChampOptions();
		}
	}, [cyberId]);

	// After edit team handler
	useHandleAfterTeamEdit();

	const options = cyberList?.map((el) => {
		return {
			value: el?.id,
			label: el?.cyberName,
			id: el?.id,
		};
	});

	const handleChange = (e) => {
		const name = e?.target?.name;
		const inputValue = e?.target?.value;

		switch (name) {
			case CONSTANTS.CYBER_SELECT_NAME:
				dispatch(setTeamCyberId(inputValue));

				if (selectedChamp?.value) {
					dispatch(refreshSelectedChamp());
					dispatch(
						setTeamData({
							...teamData,
							cyberId: inputValue,
							championshipId: "",
						})
					);
				}
				break;
			case CONSTANTS.CHAMP_SELECT_NAME:
				const champ = champOptions?.find(({ value }) => {
					return value === inputValue;
				});
				dispatch(
					setSelectedChamp({
						id: champ?.id,
						value: inputValue,
						label: inputValue,
					})
				);
				break;
			case CONSTANTS.TEAM_NAME_INP:
			case CONSTANTS.FIBALIVE_NAME_INP:
			case CONSTANTS.BETSAPI_NAME_INP:
			case CONSTANTS.OTHER_SITE_INP:
				dispatch(setTeamName({ name, value: inputValue }));
				break;
			default:
				break;
		}
	};

	const onClearBtn = () => {
		dispatch(refreshTeamData());
		dispatch(refreshSelectedChamp());
		if (onEdit) {
			dispatch(handleEditTeam(false));
		}
		dispatch(setTeamLoadingStatus(false));
	};

	const handleSubmit = async (e) => {
		e?.preventDefault();
		try {
			dispatch(setTeamLoadingStatus(true));
			const reqData = {
				cyberId,
				championshipId: selectedChamp?.id,
				teamName: teamData?.teamName,
				fibaliveTeamName: teamData?.fibaliveTeamName,
				betsapiTeamName: teamData?.betsapiTeamName,
				otherSiteTeamName: teamData?.otherSiteTeamName,
			};

			if (onEdit) {
				const updateData = {
					data: { ...reqData },
					teamId: teamData?.teamId,
				};
				ipcRenderer.send(CHANNELS.TEAM_NAME.EDIT_NAME, updateData);
			} else {
				ipcRenderer.send(CHANNELS.TEAM_NAME.ADD_NAME, reqData);
			}
		} catch (err) {
			enqueueSnackbar(err?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR, {
				variant: "error",
			});
		}
	};

	return (
		<Box sx={{ paddingX: 3, paddingY: 1 }}>
			<Typography variant="h5">{TEAM_NAMES_FORM.TITLE}</Typography>
			<Box
				component={"form"}
				onSubmit={handleSubmit}
				sx={{ maxWidth: "1300px" }}
			>
				<TeamFormSelectStack
					pageType={CONSTANTS.PAGE_TYPE.MS}
					cyberOptions={options}
					champOptions={champOptions}
					handleChange={handleChange}
				/>
				<TeamFormInputStack
					handleTeamNames={handleChange}
					onClearBtn={onClearBtn}
				/>
			</Box>
		</Box>
	);
};

MSTeamNameForm.propTypes = {
	cyberList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default MSTeamNameForm;
