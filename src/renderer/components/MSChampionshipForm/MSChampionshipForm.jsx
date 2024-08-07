import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import {
	Box,
	Select,
	Checkbox,
	MenuItem,
	TextField,
	InputLabel,
	Typography,
	FormControl,
	FormControlLabel,
} from "@mui/material";

import SaveBtn from "../../ui/SaveBtn.jsx";
import IconBtn from "../../ui/iconBtn.jsx";
import { StyledChampSettingsBox } from "../../helpers/reusableComponents/addChampionships.js";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleAddChamp,
	handleEditChamp,
	refreshChampData,
	setTeamLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getChampEditStatus,
	getChampData,
	getCyberList,
} from "../../redux/matchSettings/matchSettingSelector.js";
import CommonHandler from "../../helpers/classes/CommonHandler.js";

import { MATCHES_SETTINGS, CHANNELS } from "../../../common/constants";

const initialData = {
	championshipName: "",
	fibaliveName: "",
	betsapiName: "",
	otherSiteName: "",
	cyberId: "",
	noBetsList: false,
};

const MSChampionshipForm = () => {
	const onEdit = useSelector(getChampEditStatus);
	const champData = useSelector(getChampData);
	const cyberList = useSelector(getCyberList);

	const [champ, setChamp] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const { CHAMPIONSHIP_FORM } = MATCHES_SETTINGS;

	const options = CommonHandler.getCyberSelectOptions(cyberList);

	useEffect(() => {
		if (champData?.champId) {
			setChamp({
				championshipName: champData?.championshipName,
				fibaliveName: champData?.fibaliveName,
				betsapiName: champData?.betsapiName,
				otherSiteName: champData?.otherSiteName,
				cyberId: champData?.cyberId,
				noBetsList: champData?.noBetsList,
			});
		}
	}, [onEdit, champData]);

	useEffect(() => {
		ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, (event, arg) => {
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

			dispatch(handleAddChamp(true));
			enqueueSnackbar(CHAMPIONSHIP_FORM.CHAMP_ADDED, {
				variant: "success",
			});
			setChamp(initialData);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT, (event, arg) => {
			if (arg?.statusCode === 409) {
				enqueueSnackbar(arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.EXIST, {
					variant: "warning",
				});
				setIsLoading(false);
				return;
			} else if (arg?.statusCode !== 201 && arg?.statusText !== "Created") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				setIsLoading(false);
				return;
			}
			dispatch(handleAddChamp(true));
			dispatch(handleEditChamp(false));
			dispatch(setTeamLoadingStatus(true));
			dispatch(refreshChampData());

			enqueueSnackbar(CHAMPIONSHIP_FORM.CHAMP_UPDATED, { variant: "success" });
			setChamp(initialData);
			setIsLoading(false);
		});
	}, []);

	const handleChange = (e) => {
		const name = e?.target?.name;
		const inputValue = e?.target?.value;

		switch (name) {
			case "cyberSelect":
				setChamp((prevState) => ({ ...prevState, cyberId: inputValue }));
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
			case "noBetsCheckbox": {
				const isChecked = e?.target?.checked;

				setChamp((prevState) => ({
					...prevState,
					noBetsList: isChecked,
				}));
				break;
			}
			default:
				break;
		}
	};

	const handleFormSubmit = async (e) => {
		e?.preventDefault();
		setIsLoading(true);

		const reqData = {
			champ,
		};

		const updateData = {
			id: champData?.champId,
			champ,
		};

		if (onEdit) {
			ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_EDIT, updateData);
		} else {
			ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_ADD, reqData);
		}
	};

	const onClearBtn = () => {
		setChamp(initialData);
		if (onEdit) {
			dispatch(handleEditChamp(false));
			dispatch(refreshChampData());
		}
	};

	const isDisabled = !champ?.cyberId || !champ?.championshipName;

	return (
		<Box sx={{ paddingX: 3, paddingY: 1 }}>
			<Typography variant="h5">{CHAMPIONSHIP_FORM.TITLE}</Typography>
			<StyledChampSettingsBox component={"form"} onSubmit={handleFormSubmit}>
				<FormControl required size="small" sx={{ gridColumn: "1" }}>
					<InputLabel id="cyber-select-label">
						{CHAMPIONSHIP_FORM.SELECT_LABEL}
					</InputLabel>
					<Select
						labelId="cyber-select-label"
						id="cyber-select"
						label={CHAMPIONSHIP_FORM.SELECT_LABEL}
						value={champ?.cyberId}
						onChange={handleChange}
						name={"cyberSelect"}
					>
						{options?.map((opt) => {
							return (
								<MenuItem key={opt?.id} value={opt?.value}>
									{opt?.label}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<Box sx={{ gridColumn: "span 6" }} />
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
				<FormControl sx={{ justifyContent: "center" }}>
					<FormControlLabel
						sx={{ mx: "auto" }}
						control={
							<Checkbox
								name="noBetsCheckbox"
								onChange={handleChange}
								checked={champ.noBetsList}
							/>
						}
						labelPlacement="start"
						label={CHAMPIONSHIP_FORM.NO_BETS_CHECKBOX}
					/>
				</FormControl>
				<SaveBtn
					isLoading={isLoading}
					onEdit={onEdit}
					isDisabled={!champ?.cyberId || !champ?.championshipName}
				/>
				<IconBtn onClearBtn={onClearBtn} isDisabled={isDisabled} />
			</StyledChampSettingsBox>
		</Box>
	);
};

export default MSChampionshipForm;
