import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { Box, Typography, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

const ipcRenderer = window.require("electron").ipcRenderer;

import { useGetAllCyber } from "../../hooks/msPage";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "../../helpers/reusableComponents/gamesStaticListAccordion.js";
import GamesStaticDetailsList from "../GamesStaticDetailsList";

import { handleUrlAdded } from "../../redux/urlForm/urlFormSlice.js";
import { getIsUrlAdded } from "../../redux/urlForm/urlFormSelector.js";

import { CHANNELS } from "../../../common/constants/channels.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { TEXT } from "./text.js";

const GamesStaticList = () => {
	const [cyberList, setCyberList] = useState([]);
	const [dataList, setDataList] = useState([]);
	const [games, setGames] = useState([]);
	const [tempUpdated, setTempUpdated] = useState(false);
	const [loadingTemp, setLoadingTemp] = useState(false);
	const isUrlAdded = useSelector(getIsUrlAdded);
	const dispatch = useDispatch();

	useGetAllCyber(setCyberList);

	useEffect(() => {
		ipcRenderer.send(CHANNELS.ANALYZE.GET_STATIC_LIST);
		ipcRenderer.on(CHANNELS.ANALYZE.GET_STATIC_LIST, (event, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				return;
			}
			setDataList(arg?.data);
			setGames(arg?.data?.games);
			dispatch(handleUrlAdded(false));
		});

		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, [isUrlAdded]);

	useEffect(() => {
		ipcRenderer.on(CHANNELS.ANALYZE.UPD_TEMP, (event, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				return;
			}
			setDataList(arg?.data);
			setTempUpdated(false);
			setLoadingTemp(false);
		});
		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, [tempUpdated]);

	useEffect(() => {
		setGames(dataList?.games);
	}, [dataList]);

	useEffect(() => {
		return () => {
			setCyberList([]);
			setDataList({});
			setGames([]);
		};
	}, []);

	const handleInput = (e) => {
		const elemID = e.target.id;
		const id = elemID?.split("_")[1];
		const name = elemID?.split("_")[0];

		const value = e?.target?.value;
		const index = games?.findIndex((game) => game?.eventId === id);
		const updatedDataList = games;
		if (name === "temp") {
			updatedDataList[index].temp = value;
		} else {
			updatedDataList[index].predict = value;
		}

		setGames([...updatedDataList]);
	};

	const handleSaveTemp = () => {
		const updatedGames = games?.map((game) => {
			game.temp = Number.parseFloat(game.temp);
			return game;
		});
		const data = { ...dataList, games: updatedGames };
		ipcRenderer.send(CHANNELS.ANALYZE.UPD_TEMP, { data });
		setTempUpdated(true);
		setLoadingTemp(true);
	};

	return (
		<Box component="section" sx={{ px: 3, py: 1 }}>
			<Box mb={1}>
				<Typography variant="h5">{TEXT.TITLE}</Typography>
				<Typography variant="body1" component="span">
					{`${TEXT.DATE} ${dataList?.date ?? ""}`}
				</Typography>
			</Box>
			<Box sx={{ py: 1 }}>
				{cyberList
					? cyberList.map((cyber) => {
							return (
								<Accordion key={cyber.id}>
									<AccordionSummary>
										<Typography variant="subtitle1">
											{cyber.cyberName}
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<GamesStaticDetailsList
											handleTemp={handleInput}
											games={games}
											cyber={cyber?.cyberName}
										/>
									</AccordionDetails>
								</Accordion>
							);
					  })
					: ""}
			</Box>
			<Box>
				<LoadingButton
					variant="outlined"
					size="small"
					loading={loadingTemp}
					onClick={handleSaveTemp}
					endIcon={<SendIcon />}
					loadingPosition="end"
				>
					{TEXT.TEMP_BTN}
				</LoadingButton>
			</Box>
		</Box>
	);
};

export default GamesStaticList;
