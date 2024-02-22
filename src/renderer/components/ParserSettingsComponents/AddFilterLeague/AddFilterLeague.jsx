import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import { TeamFormSelectStack } from "../../../ui/teamSettings/index.js";

import { useGetAllCyber } from "../../../hooks/msPage";
import CommonHandler from "../../../helpers/classes/CommonHandler.js";

import { CHANNELS } from "../../../../common/constants/channels.js";
import { CONSTANTS } from "../../../constants/teamNameFormConstants.js";
import { TEXT, INITIAL_CHAMP } from "./text.js";

const AddFilterLeague = ({
	selectedChamp,
	isLoading,
	isUpdated,
	setSelectedChamp,
	handleSubmit,
}) => {
	const [cyberList, setCyberList] = useState([]);
	const [cyberId, setCyberId] = useState("");
	const [champShortList, setChampShortList] = useState([]);
	const [champOptions, setChampOptions] = useState([]);

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

	useGetAllCyber(setCyberList);

	//загрузка списка
	useEffect(() => {
		ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT);

		ipcRenderer.on(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT, (e, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(arg?.message, {
					variant: "error",
				});
				return;
			}
			setChampShortList(arg?.list);
		});
		return () => {
			ipcRenderer.removeAllListeners(CHANNELS.APP_CHAMP.APP_CHAMP_GET_SHORT);
		};
	}, []);

	// формирование опций для выбора чампионата
	useEffect(() => {
		if (cyberId) {
			generateChampOptions();
		}
	}, [cyberId]);

	// Очистка после добавления чемпионата
	useEffect(() => {
		setCyberId("");
	}, [isUpdated]);

	const options = CommonHandler.getCyberSelectOptions(cyberList);

	const handleChange = (e) => {
		const name = e?.target?.name;
		const inputValue = e?.target?.value;

		switch (name) {
			case CONSTANTS.CYBER_SELECT_NAME:
				setCyberId(inputValue);

				if (selectedChamp?.value) {
					setSelectedChamp(INITIAL_CHAMP);
				}
				break;
			case CONSTANTS.CHAMP_SELECT_NAME:
				const champ = champOptions?.find(({ value }) => {
					return value === inputValue;
				});
				setSelectedChamp({
					id: champ?.id,
					value: inputValue,
					label: champ.label,
				});
				break;
			default:
				break;
		}
	};

	const formSelectStackProps = {
		cyberId,
		champId: selectedChamp?.value,
		pageType: CONSTANTS.PAGE_TYPE.FP,
		cyberOptions: options,
		champOptions,
		handleChange,
	};

	return (
		<Box sx={{ width: "300px", textAlign: "center", marginLeft: 3 }}>
			<Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
				{TEXT.TITLE}
			</Typography>
			<Box
				component="form"
				onSubmit={(e) => handleSubmit(e)}
				sx={{
					display: "grid",
					gap: 3,
					placeItems: "center",
				}}
			>
				<TeamFormSelectStack {...formSelectStackProps} />
				<LoadingButton
					type="submit"
					variant="outlined"
					disabled={!selectedChamp.value}
					loading={isLoading}
					startIcon={<SaveIcon />}
					sx={{ width: "160px" }}
				>
					{TEXT.BTN_ADD}
				</LoadingButton>
			</Box>
		</Box>
	);
};

AddFilterLeague.propTypes = {
	selectedChamp: PropTypes.objectOf(PropTypes.string),
	isLoading: PropTypes.bool,
	isUpdated: PropTypes.bool,
	setSelectedChamp: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default AddFilterLeague;
