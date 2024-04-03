import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const ipcRenderer = window.require("electron").ipcRenderer;

import MSCyberForm from "../components/MSCyberForm/MSCyberForm.jsx";
import MSCyberTable from "../components/MSCyberTable/MSCyberTable.jsx";
import MSChampionshipForm from "../components/MSChampionshipForm/MSChampionshipForm.jsx";
import MSChampionships from "../components/MSChampionships/index.js";
import MSTeamNameForm from "../components/MSTeamNameForm/MSTeamNameForm.jsx";
import MSTeamNames from "../components/MSTeamNames/MSTeamNames.jsx";
import DelModal from "../components/DelModal/DelModal.jsx";

import {
	handleEditCyber,
	handleEditChamp,
	handleEditTeam,
	setCyberData,
	setChampData,
	setTeamData,
	refreshMS,
	handleEditModalLoadingStatus,
} from "../redux/matchSettings/matchSettingsSlice.js";
import { getCyberList } from "../redux/matchSettings/matchSettingSelector.js";
import {
	handleModalDelOpen,
	handleModalDelClose,
	setLoading,
	setModalDelData,
	refreshModalDel,
} from "../redux/modalDelete/modalDelSlice.js";
import {
	getMDPageType,
	isMDOpen,
	getMDElemId,
} from "../redux/modalDelete/modalDelSelector.js";

import {
	useGetAllCyber,
	useDeleteCyber,
	useGetChampionships,
	useDeleteChampionship,
	useGetAllTeamNames,
	useDeleteTeamName,
} from "../hooks/msPage";
import ModalHandler from "../helpers/classes/modal.js";

import { MATCHES_SETTINGS } from "../../common/constants/index.js";
import { MODAL_DEL } from "../constants/modaldel.js";
import { CHANNELS } from "../../common/constants/channels.js";
import { MODAL_TYPES } from "../constants/modalTypes.js";

const MatchesSettings = () => {
	const [champList, setChampList] = useState([]);
	const [teamNamesList, setTeamNamesList] = useState([]);

	const cyberList = useSelector(getCyberList);
	const isOpen = useSelector(isMDOpen);
	const id = useSelector(getMDElemId);
	const pageType = useSelector(getMDPageType);
	const dispatch = useDispatch();

	useGetAllCyber();
	useGetChampionships(setChampList);
	useGetAllTeamNames(setTeamNamesList);

	useDeleteCyber();
	useDeleteChampionship();
	useDeleteTeamName();

	useEffect(() => {
		return () => {
			ipcRenderer.removeAllListeners();
			dispatch(refreshMS());
			dispatch(handleEditCyber(false));
		};
	}, []);

	const openModalDel = (e) => {
		const id = e?.currentTarget?.id?.split("_")[1] ?? "";
		const btnName = e?.currentTarget?.name ?? "";
		const payload = {
			pageType: "",
			descriptionExtend: "",
			elemId: "",
		};

		switch (btnName) {
			case MATCHES_SETTINGS.CYBER_TABLE.DEL_BTN_N:
				const cyberName = cyberList.find((el) => {
					return el?.id === id;
				})?.cyberName;

				payload.pageType = MODAL_DEL.PAGE_TYPE_C;
				payload.descriptionExtend = cyberName;
				payload.elemId = id;
				break;
			case MATCHES_SETTINGS.CHAMPIONSHIP_TABLE.DEL_BTN_NAME:
				const selectedChampionship = champList.find((champ) => {
					return champ?.championshipId === id;
				});
				payload.pageType = MODAL_DEL.PAGE_TYPE_CHAMP;
				payload.descriptionExtend = {
					championshipName: selectedChampionship?.championshipName,
					fibaliveName: selectedChampionship?.fibaliveName,
					betsapiName: selectedChampionship?.betsapiName,
					otherSiteName: selectedChampionship?.otherSiteName,
					cyberName: selectedChampionship?.cyber.name,
				};
				payload.elemId = id;
				break;
			case MATCHES_SETTINGS.TEAM_NAMES_TABLE.DEL_TEAM_NAME:
				const selectedTeam = teamNamesList.find((team) => {
					return team?.teamId === id;
				});
				payload.pageType = MODAL_DEL.PAGE_TYPE_TEAM_NAME;
				payload.descriptionExtend = selectedTeam?.teamName;
				payload.elemId = id;
				break;
			default:
				break;
		}

		if (payload?.elemId) {
			dispatch(setModalDelData(payload));
			dispatch(handleModalDelOpen());
		}
	};

	const handleDelete = async (e) => {
		dispatch(setLoading());

		if (pageType === MODAL_DEL.PAGE_TYPE_C) {
			ipcRenderer.send(CHANNELS.CYBER.DEL_CYBER, { id });
		} else if (pageType === MODAL_DEL.PAGE_TYPE_CHAMP) {
			ipcRenderer.send(CHANNELS.APP_CHAMP.APP_CHAMP_DEL, { id });
		} else if (pageType === MODAL_DEL.PAGE_TYPE_TEAM_NAME) {
			ipcRenderer.send(CHANNELS.TEAM_NAME.DEL_NAME, { id });
		}
	};

	const handleEdit = (e) => {
		const id = e?.currentTarget?.id?.split("_")[1];
		const btnName = e?.currentTarget?.name;

		switch (btnName) {
			case MATCHES_SETTINGS.CYBER_TABLE.EDIT_BTN_N:
				const cyberName = cyberList.find((el) => {
					return el?.id === id;
				})?.cyberName;

				const cyberPayload = {
					id,
					name: cyberName,
				};

				dispatch(setCyberData(cyberPayload));
				dispatch(handleEditCyber(true));
				break;

			case MATCHES_SETTINGS.CHAMPIONSHIP_TABLE.EDIT_BTN_NAME:
				const championship = champList?.find((champ) => {
					return champ?.championshipId === id;
				});
				const champPayload = {
					champId: id,
					championshipName: championship?.championshipName ?? "",
					fibaliveName: championship?.fibaliveName ?? "",
					betsapiName: championship?.betsapiName ?? "",
					otherSiteName: championship?.otherSiteName ?? "",
					cyberName: championship?.cyber?.name ?? "",
					cyberId: championship?.cyberId ?? "",
					noBetsList: championship?.noBetsList ?? false,
				};
				dispatch(setChampData(champPayload));
				dispatch(handleEditChamp(true));
				break;

			case MATCHES_SETTINGS.TEAM_NAMES_TABLE.EDIT_TEAM_NAME:
				const team = teamNamesList?.find((team) => {
					return team.teamId === id;
				});

				const payload = {
					teamId: id,
					cyberId: team?.teamCyber?.cyberId ?? "",
					championshipId: team?.teamChamp?.championshipId ?? "",
					teamName: team?.teamName ?? "",
					fibaliveTeamName1: team?.fibaliveTeamName1 ?? "",
					fibaliveTeamName2: team?.fibaliveTeamName2 ?? "",
					fibaliveTeamName3: team?.fibaliveTeamName3 ?? "",
					betsapiTeamName: team?.betsapiTeamName ?? "",
					otherSiteTeamName: team?.otherSiteTeamName ?? "",
				};

				dispatch(setTeamData(payload));
				dispatch(handleEditTeam(true));

				dispatch(handleEditModalLoadingStatus(true));

				ModalHandler.openModal(dispatch, MODAL_TYPES.TEAM_ADD);
				break;

			default:
				break;
		}
	};

	const handleClose = () => {
		dispatch(handleModalDelClose());
		!isOpen && dispatch(refreshModalDel());
	};

	const cyberTableProps = {
		cyberList,
		handleDelete: openModalDel,
		handleEdit,
	};
	const delModalProps = {
		handleClose,
		handleDelete,
	};
	const championshipsProps = {
		champList,
		handleDelete: openModalDel,
		handleEdit,
	};

	const teamNamesProps = {
		teamNamesList,
		setTeamNamesList,
		handleDelete: openModalDel,
		handleEdit,
	};

	return (
		<Box component="section">
			<Box>
				<MSCyberForm />
				<MSCyberTable {...cyberTableProps} />
			</Box>
			<Divider />
			<Box>
				<MSChampionshipForm />
				<MSChampionships {...championshipsProps} />
			</Box>
			<Divider />
			<Box sx={{ pb: 3 }}>
				<MSTeamNameForm />
				<MSTeamNames {...teamNamesProps} />
			</Box>
			<DelModal {...delModalProps} />
		</Box>
	);
};

export default MatchesSettings;
