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
	setTeamData,
	refreshTeamData,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getChampAddStatus,
	getTeamEditStatus,
	getTeamData,
} from "../../redux/matchSettings/matchSettingSelector.js";

import {
	useEditTeam,
	useHandleTeamAdd,
	useGetShortChampList,
	useHandleAfterTeamEdit,
} from "../../hooks/teamNamesForm/index.js";

import {
	CONSTANTS,
	INITIAL_TEAM_DATA,
	INITIAL_CHAMP_DATA,
} from "./constants.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

const MSTeamNameForm = ({ cyberList }) => {
	const [cyberId, setCyberId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [champOptions, setChampOptions] = useState([]);
	const [champShortList, setChampShortList] = useState([]);
	const [teamNames, setTeamNames] = useState(INITIAL_TEAM_DATA);
	const [selectedChamp, setSelectedChamp] = useState(INITIAL_CHAMP_DATA);

	const champAddStatus = useSelector(getChampAddStatus);
	const teamData = useSelector(getTeamData);
	const onEdit = useSelector(getTeamEditStatus);
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
	useGetShortChampList(setChampShortList, champAddStatus);

	// Edit team data
	useEditTeam(
		setCyberId,
		setSelectedChamp,
		INITIAL_CHAMP_DATA,
		champShortList,
		generateChampOptions,
		setTeamNames,
		cyberId
	);

	//  Handle add team response
	useHandleTeamAdd(setIsLoading, setTeamNames, INITIAL_TEAM_DATA);

	// Forming options for championship select
	useEffect(() => {
		if (cyberId) {
			generateChampOptions();
		}
	}, [cyberId]);

	// After edit team handler
	useHandleAfterTeamEdit(
		INITIAL_TEAM_DATA,
		INITIAL_CHAMP_DATA,
		setTeamNames,
		setSelectedChamp,
		setIsLoading,
		setCyberId
	);

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
				setCyberId(inputValue);

				if (selectedChamp?.value) {
					setSelectedChamp(INITIAL_CHAMP_DATA);
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
				setSelectedChamp({
					id: champ?.id,
					value: inputValue,
					label: inputValue,
				});
				break;
			case CONSTANTS.TEAM_NAME_INP:
			case CONSTANTS.FIBALIVE_NAME_INP:
			case CONSTANTS.BETSAPI_NAME_INP:
			case CONSTANTS.OTHER_SITE_INP:
				setTeamNames((state) => ({ ...state, [name]: inputValue }));
				break;
			default:
				break;
		}
	};

	const onClearBtn = () => {
		setCyberId("");
		setSelectedChamp(INITIAL_CHAMP_DATA);
		setTeamNames(INITIAL_TEAM_DATA);
		if (onEdit) {
			dispatch(handleEditTeam(false));
			dispatch(refreshTeamData());
		}
		setIsLoading(false);
	};

	const handleSubmit = async (e) => {
		e?.preventDefault();
		try {
			setIsLoading(true);
			const reqData = {
				cyberId,
				championshipId: selectedChamp?.id,
				teamName: teamNames?.teamName,
				fibaliveTeamName: teamNames?.fibaliveTeamName,
				betsapiTeamName: teamNames?.betsapiTeamName,
				otherSiteTeamName: teamNames?.otherSiteTeamName,
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

	const formSelectStackProps = {
		cyberId,
		champId: selectedChamp?.value,
		pageType: CONSTANTS.PAGE_TYPE.MS,
		cyberOptions: options,
		champOptions,
		handleChange,
	};

	const formInputStackProps = {
		teamNames,
		cyberId,
		selectedId: selectedChamp.id,
		isLoading,
		handleTeamNames: handleChange,
		onClearBtn,
	};

	return (
		<Box sx={{ paddingX: 3, paddingY: 1 }}>
			<Typography variant="h5">{TEAM_NAMES_FORM.TITLE}</Typography>
			<Box
				component={"form"}
				onSubmit={handleSubmit}
				sx={{ maxWidth: "1300px" }}
			>
				<TeamFormSelectStack {...formSelectStackProps} />
				<TeamFormInputStack {...formInputStackProps} />
			</Box>
		</Box>
	);
};

MSTeamNameForm.propTypes = {
	cyberList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default MSTeamNameForm;
