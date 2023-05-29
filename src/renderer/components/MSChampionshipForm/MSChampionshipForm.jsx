import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";
import {
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {
	StyledChampSettingsBox,
	StyledChampSettingsMenuItem,
} from "../../helpers/reusableComponents/addChampionships.js";

const ipcRenderer = window.require("electron").ipcRenderer;

import { getToken } from "../../redux/auth/authSelector.js";

import {
	handleAddChamp,
	handleEditChamp,
	refreshChampData,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getChampEditStatus,
	getChampData,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

const initialData = {
	championshipName: "",
	fibaliveName: "",
	betsapiName: "",
	otherSiteName: "",
	cyberName: "",
};

const MSChampionshipForm = ({ cyberList }) => {
	const token = useSelector(getToken);
	const onEdit = useSelector(getChampEditStatus);
	const champData = useSelector(getChampData);
	const dispatch = useDispatch();

	const [champ, setChamp] = useState(
		onEdit
			? {
					championshipName: champData?.championshipName ?? "",
					fibaliveName: champData?.fibaliveName ?? "",
					betsapiName: champData?.betsapiName ?? "",
					otherSiteName: champData?.otherSiteName ?? "",
					cyberName: champData?.cyberName ?? "",
			  }
			: initialData
	);
	const [isLoading, setIsLoading] = useState(false);
	const { CHAMPIONSHIP_FORM } = MATCHES_SETTINGS;

	const options = cyberList?.map((el) => {
		return {
			value: el?.cyberName,
			label: el?.cyberName,
			id: el?.id,
		};
	});

	useEffect(() => {
		ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, (event, arg) => {
			if (
				arg === MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_NAME ||
				arg === MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_FIB_NAME ||
				arg === MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_BETS_NAME ||
				arg === MATCHES_SETTINGS.ERR_MESSAGES.EXIST_CHAMP_OTHER_NAME
			) {
				enqueueSnackbar(arg, {
					variant: "warning",
				}),
					setIsLoading(false);
				return;
			} else if (
				arg?.message === MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR ||
				arg?.error === "referenceError"
			) {
				enqueueSnackbar(arg?.message, {
					variant: "error",
				});
				setIsLoading(false);
				return;
			} else if (arg?.error) {
				enqueueSnackbar(arg?.message, {
					variant: "error",
				});
				setIsLoading(false);
				return;
			}

			dispatch(handleAddChamp(true));
			enqueueSnackbar(CHAMPIONSHIP_FORM.CHAMP_ADDED, {
				variant: "success",
			});
			setChamp(initialData);
			setIsLoading(false);
		});
	}, []);

	const handleChange = (e) => {
		const id = e?.target?.id;
		const name = e?.target?.name;
		const inputValue = e?.target?.value;

		switch (name) {
			case "cyberSelect":
				setChamp((prevState) => ({ ...prevState, cyberName: inputValue }));
				break;
			case "championshipNameInput":
				setChamp((prevState) => ({
					...prevState,
					championshipName: inputValue,
				}));
				break;
			case "fibaliveNameInput":
				setChamp((prevState) => ({
					...prevState,
					fibaliveName: inputValue,
				}));
				break;
			case "betsapiNameInput":
				setChamp((prevState) => ({
					...prevState,
					betsapiName: inputValue,
				}));
				break;
			case "otherSiteNameInput":
				setChamp((prevState) => ({
					...prevState,
					otherSiteName: inputValue,
				}));
				break;
			default:
				break;
		}
	};

	const handleFormSubmit = async (e) => {
		e?.preventDefault();
		setIsLoading(true);

		const reqData = {
			champ,
			token,
		};

		const updateData = {
			id: champData?.id,
			champ,
			token,
		};

		if (onEdit) {
			ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT, updateData);
		} else {
			ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, reqData);
		}
	};

	return (
		<Box sx={{ paddingX: 3, paddingY: 1 }}>
			<Typography variant="h5">{CHAMPIONSHIP_FORM.TITLE}</Typography>
			<StyledChampSettingsBox component={"form"} onSubmit={handleFormSubmit}>
				<FormControl required size="small" sx={{}}>
					<InputLabel id="cyber-select-label">
						{CHAMPIONSHIP_FORM.SELECT_LABEL}
					</InputLabel>
					<Select
						labelId="cyber-select-label"
						id="cyber-select"
						label={CHAMPIONSHIP_FORM.SELECT_LABEL}
						value={champ?.cyberName}
						onChange={handleChange}
						name={"cyberSelect"}
					>
						{options?.map((opt) => {
							return (
								<MenuItem key={opt?.id} value={opt?.value} sx={{}}>
									{opt?.label}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<FormControl>
					<TextField
						required
						name="championshipNameInput"
						label={CHAMPIONSHIP_FORM.CHAMP_NAME_INPUT}
						value={champ?.championshipName}
						variant="outlined"
						size="small"
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl>
					<TextField
						name="fibaliveNameInput"
						label={CHAMPIONSHIP_FORM.FIBALIVE_NAME_INPUT}
						value={champ?.fibaliveName}
						variant="outlined"
						size="small"
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl>
					<TextField
						name="betsapiNameInput"
						label={CHAMPIONSHIP_FORM.BETSAPI_NAME_INPUT}
						value={champ?.betsapiName}
						variant="outlined"
						size="small"
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl>
					<TextField
						name="otherSiteNameInput"
						label={CHAMPIONSHIP_FORM.OTHER_SITE_NAME_INPUT}
						value={champ?.otherSiteName}
						variant="outlined"
						size="small"
						onChange={handleChange}
					/>
				</FormControl>
				<LoadingButton
					type="submit"
					loading={isLoading}
					variant="outlined"
					disabled={!champ?.cyberName || !champ?.championshipName}
					sx={{ width: 110 }}
				>
					{!onEdit ? CHAMPIONSHIP_FORM.BTN_ADD : CHAMPIONSHIP_FORM.BTN_UPD}
				</LoadingButton>
			</StyledChampSettingsBox>
		</Box>
	);
};

MSChampionshipForm.propTypes = {
	cyberList: PropTypes.array,
};

export default MSChampionshipForm;
