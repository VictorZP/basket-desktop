import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import TeamFormSelectStack from "../TeamFormSelectStack";
import TeamFormInputStack from "../TeamFormInputStack";

import {
	handleAddTeam,
	handleEditTeam,
	refreshTeamData,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getChampAddStatus,
	getTeamEditStatus,
	getTeamData,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";
import { CONSTANTS } from "./constants.js";

const initialData = {
	teamName: "",
	fibaliveTeamName: "",
	betsapiTeamName: "",
	otherSiteTeamName: "",
};
const initialChamp = {
	id: "",
	value: "",
	label: "",
};

const MSTeamNameForm = ({ cyberList }) => {
	const [cyberId, setCyberId] = useState("");
	const [selectedChamp, setSelectedChamp] = useState(initialChamp);
	const [champShortList, setChampShortList] = useState([]);
	const [champOptions, setChampOptions] = useState([]);
	const [teamNames, setTeamNames] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);

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
				value: champ?.championshipName,
				label: champ?.championshipName,
				id: champ?.championshipId,
			};
		});

		setChampOptions(filteredOptions);
	};

	//загрузка списка
	useEffect(() => {
		ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT);

		ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT, (e, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				return;
			}
			setChampShortList(arg?.list);
		});
		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT);
		};
	}, [champAddStatus]);

	// формирование опций для выбора чампионата
	useEffect(() => {
		if (cyberId) {
			generateChampOptions();
		}
	}, [cyberId]);

	// получение ответа при добавление команды
	useEffect(() => {
		ipcRenderer.on(CHANNELS.TEAM_NAME.ADD_NAME, (e, arg) => {
			if (arg?.statusText !== "Created") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				setIsLoading(false);
				return;
			}
			dispatch(handleAddTeam(true));
			enqueueSnackbar(arg?.message ?? TEAM_NAMES_FORM.ADDED, {
				variant: "success",
			});
			setCyberId("");
			setSelectedChamp(initialChamp);
			setTeamNames(initialData);
			setIsLoading(false);
		});
	}, []);

	//редактирование команды
	useEffect(() => {
		if (teamData?.teamId) {
			setCyberId(teamData?.cyberId);
		}
	}, [onEdit, teamData]);
	useEffect(() => {
		if (teamData?.teamId && cyberId) {
			const champ = champShortList?.find(({ championshipName }) => {
				return championshipName === teamData?.championshipName;
			});

			const champData = {
				id: champ?.id,
				value: teamData?.championshipName,
				label: teamData?.championshipName,
			};

			const teamEditData = {
				teamName: teamData?.teamName,
				fibaliveTeamName: teamData?.fibaliveTeamName,
				betsapiTeamName: teamData?.betsapiTeamName,
				otherSiteTeamName: teamData?.otherSiteTeamName,
			};

			generateChampOptions();
			setSelectedChamp(champData);
			setTeamNames(teamEditData);
		}
	}, [cyberId]);
	useEffect(() => {
		ipcRenderer.on(CHANNELS.TEAM_NAME.EDIT_NAME, (event, arg) => {
			if (arg?.statusCode === 409) {
				enqueueSnackbar(arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.EXIST, {
					variant: "warning",
				});
				setIsLoading(false);
				return;
			}
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				setIsLoading(false);
				return;
			}
			dispatch(handleAddTeam(true));
			dispatch(handleEditTeam(false));
			dispatch(refreshTeamData());

			enqueueSnackbar(TEAM_NAMES_FORM.UPDATED, { variant: "success" });
			setTeamNames(initialData);
			setSelectedChamp(initialChamp);
			setCyberId("");
			setIsLoading(false);
		});
	}, []);

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
					setSelectedChamp(initialChamp);
				}
				break;
			case CONSTANTS.CHAMP_SELECT_NAME:
				const champ = champOptions?.find(({ label }) => {
					return label === inputValue;
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
		setSelectedChamp(initialChamp);
		setTeamNames(initialData);
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
					...reqData,
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
		champValue: selectedChamp?.value,
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
			<Box component={"form"} onSubmit={handleSubmit}>
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
