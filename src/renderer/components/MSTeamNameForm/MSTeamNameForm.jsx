import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import TeamFormSelectStack from "../TeamFormSelectStack";
import TeamFormInputStack from "../TeamFormInputStack";

import {} from "../../redux/matchSettings/matchSettingsSlice.js";
import { getChampAddStatus } from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";
import { CONSTANTS } from "./constants.js";

const initialData = {
	customName: "",
	fibaliveTeamName: "",
	betsapiTeamName: "",
	otherSiteName: "",
};

const MSTeamNameForm = ({ cyberList }) => {
	const [cyberName, setCyberName] = useState("");
	const [selectedChamp, setSelectedChamp] = useState({
		id: "",
		value: "",
		label: "",
	});
	const [champShortList, setChampShortList] = useState([]);
	const [champOptions, setChampOptions] = useState([]);
	const [teamNames, setTeamNames] = useState(initialData);
	const champAddStatus = useSelector(getChampAddStatus);
	const { TEAM_NAMES_FORM } = MATCHES_SETTINGS;

	useEffect(() => {
		//загрузка списка
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
	}, [
		// Обновление запроса при открытии страницы и добаление нового чемпионата
		champAddStatus,
	]);

	useEffect(() => {
		if (cyberName) {
			const list = [...champShortList]?.filter((el) => {
				return el?.cyberName === cyberName;
			});

			const filteredOptions = list?.map((champ) => {
				return {
					value: champ?.championshipName,
					label: champ?.championshipName,
					id: champ?.id,
				};
			});
			setChampOptions(filteredOptions);
		}
	}, [cyberName]);

	const options = cyberList?.map((el) => {
		return {
			value: el?.cyberName,
			label: el?.cyberName,
			id: el?.id,
		};
	});

	const handleChange = (e) => {
		const name = e?.target?.name;
		const inputValue = e?.target?.value;

		switch (name) {
			case CONSTANTS.CYBER_SELECT_NAME:
				setCyberName(inputValue);
				break;
			case CONSTANTS.CHAMP_SELECT_NAME:
				const selectedChamp = champOptions?.find(({ label }) => {
					console.log(label);
					return label === inputValue;
				});
				setSelectedChamp({
					id: selectedChamp?.id,
					value: inputValue,
					label: inputValue,
				});
				break;
			case CONSTANTS.CUSTOM_NAME_INP:
			case CONSTANTS.FIBALIVE_NAME_INP:
			case CONSTANTS.BETSAPI_NAME_INP:
			case CONSTANTS.OTHER_SITE_INP:
				setTeamNames((state) => ({ ...state, [name]: inputValue }));
				break;
			default:
				break;
		}
	};

	const formSelectStackProps = {
		cyberName,
		champValue: selectedChamp?.value,
		cyberOptions: options,
		champOptions,
		handleChange,
	};

	const formInputStackProps = {
		teamNames,
		selectedId: selectedChamp.id,
		handleTeamNames: handleChange,
	};

	return (
		<Box sx={{ paddingX: 3, paddingY: 1 }}>
			<Typography variant="h5">{TEAM_NAMES_FORM.TITLE}</Typography>
			<Box component={"form"}>
				<TeamFormSelectStack {...formSelectStackProps} />
				<TeamFormInputStack {...formInputStackProps} />
			</Box>
		</Box>
	);
};

export default MSTeamNameForm;
