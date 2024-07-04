import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { Box, Button, Typography } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import { TeamFormSelectStack } from "../../ui/teamSettings/index.js";
import TeamFormInputStack from "../TeamFormInputStack";
import TeamNamesModalBtn from "../TeamNamesModalBtn";
import LoadingSpinner from "../LoadingSpinner";

import {
	setTeamName,
	setTeamData,
	setTeamCyberId,
	refreshTeamData,
	setSelectedChamp,
	setTeamLoadingStatus,
	refreshSelectedChamp,
	handleEditModalLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getCyberList,
	getTeamEditStatus,
	getTeamData,
	getTeamCyberId,
	getSelectedChamp,
	getEditModalLoadingStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";

import {
	useEditTeam,
	useHandleTeamAdd,
	useGetShortChampList,
	useHandleAfterTeamEdit,
} from "../../hooks/teamNamesForm/index.js";

import {
	TeamModalContainer,
	TeamModalInnerBox,
} from "../../helpers/reusableComponents/teamNameModal.js";
import CommonHandler from "../../helpers/classes/CommonHandler.js";

import { CHANNELS } from "../../../common/constants/channels.js";
import { CONSTANTS, TEXT } from "../../constants/teamNameFormConstants.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

const TeamModal = () => {
	const [champOptions, setChampOptions] = useState([]);
	const [champShortList, setChampShortList] = useState([]);

	const teamData = useSelector(getTeamData);
	const cyberId = useSelector(getTeamCyberId);
	const cyberList = useSelector(getCyberList);
	const onEdit = useSelector(getTeamEditStatus);
	const selectedChamp = useSelector(getSelectedChamp);
	const isEditLoading = useSelector(getEditModalLoadingStatus);

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

	const options = CommonHandler.getCyberSelectOptions(cyberList);

	//  Handle loading status when editing team
	//  Waiting while cyber options and championships options are set
	useEffect(() => {
		if (options?.length > 0 && onEdit && champOptions?.length > 0) {
			dispatch(handleEditModalLoadingStatus(false));
		}
	}, [options]);

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
			case CONSTANTS.FIBALIVE_NAME_INP_1:
			case CONSTANTS.FIBALIVE_NAME_INP_2:
			case CONSTANTS.FIBALIVE_NAME_INP_3:
			case CONSTANTS.BETSAPI_NAME_INP_1:
			case CONSTANTS.BETSAPI_NAME_INP_2:
			case CONSTANTS.BETSAPI_NAME_INP_3:
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
				fibaliveTeamName1: teamData?.fibaliveTeamName1,
				fibaliveTeamName2: teamData?.fibaliveTeamName2,
				fibaliveTeamName3: teamData?.fibaliveTeamName3,
				betsapiTeamName1: teamData?.betsapiTeamName1,
				betsapiTeamName2: teamData?.betsapiTeamName2,
				betsapiTeamName3: teamData?.betsapiTeamName3,
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

	const isClearBtnDisabled =
		teamData.cyberId?.length > 0 ||
		selectedChamp?.id?.length > 0 ||
		teamData.customName?.length > 0 ||
		teamData.fibaliveTeamName1?.length > 0 ||
		teamData.fibaliveTeamName2?.length > 0 ||
		teamData.fibaliveTeamName3?.length > 0 ||
		teamData.betsapiTeamName1?.length > 0 ||
		teamData.betsapiTeamName2?.length > 0 ||
		teamData.betsapiTeamName3?.length > 0 ||
		teamData.otherSiteTeamName?.length > 0;

	return (
		<TeamModalContainer>
			<TeamModalInnerBox>
				<Typography variant="h5" mb={2}>
					{onEdit
						? TEAM_NAMES_FORM.EDIT_TEAM_TITLE
						: TEAM_NAMES_FORM.ADD_TEAM_TITLE}
				</Typography>
				{isEditLoading && onEdit ? (
					<LoadingSpinner height={"562px"} />
				) : (
					<Box component={"form"} onSubmit={handleSubmit}>
						<Box mb={3}>
							<TeamFormSelectStack
								cyberId={cyberId}
								selectedChamp={selectedChamp.id}
								pageType={CONSTANTS.PAGE_TYPE.MS}
								cyberOptions={options}
								champOptions={champOptions}
								handleChange={handleChange}
							/>
							<TeamFormInputStack handleTeamNames={handleChange} />
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
						<TeamNamesModalBtn />
					</Box>
				)}
			</TeamModalInnerBox>
		</TeamModalContainer>
	);
};

export default TeamModal;
