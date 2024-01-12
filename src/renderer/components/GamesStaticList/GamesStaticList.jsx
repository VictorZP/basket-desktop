import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "../../helpers/reusableComponents/gamesStaticListAccordion.js";
import GamesStaticDetailsList from "../GamesStaticDetailsList";

import { handleUrlAdded } from "../../redux/urlForm/urlFormSlice.js";
import { getIsUrlAdded } from "../../redux/urlForm/urlFormSelector.js";

import { createLinesXlsxFileNoBets } from "../../helpers/functions/lines/createLinesXlsxFileNoBets.js";

import { CHANNELS } from "../../../common/constants/channels.js";
import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { TEXT } from "./text.js";
import { CYBER_LIST } from "../../constants/cyberList.js";

const GamesStaticList = ({ paramsObj }) => {
	const [dataList, setDataList] = useState([]);
	const [games, setGames] = useState([]);
	const [tempUpdated, setTempUpdated] = useState(false);
	const [loadingTemp, setLoadingTemp] = useState(false);
	const [loadingLines, setLoadingLines] = useState(false);
	const isUrlAdded = useSelector(getIsUrlAdded);
	const dispatch = useDispatch();

	useEffect(() => {
		ipcRenderer.send(CHANNELS.ANALYZE.GET_STATIC_LIST, paramsObj);
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
	}, [isUrlAdded, paramsObj]);

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
			setDataList({});
			setGames([]);
		};
	}, []);

	const handleInput = (e) => {
		const elemID = e.target.id;
		const id = elemID?.split("_")?.slice(1)?.join("_");
		const name = elemID?.split("_")?.at(0);

		const value = e?.target?.value;
		let index = null;

		switch (true) {
			case id.includes("http"):
				index = games?.findIndex((game) => game?.url === id);
				break;
			default:
				index = games?.findIndex((game) => game?.eventId === id);
				break;
		}

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
			if (!game) return;

			game.temp = Number.parseFloat(game?.temp);
			game.predict = Number.parseFloat(game?.predict);
			return game;
		});

		const data = { ...dataList, games: updatedGames };
		ipcRenderer.send(CHANNELS.ANALYZE.UPD_TEMP, { data });

		setTempUpdated(true);
		setLoadingTemp(true);
	};

	//	Download matches without betsApi data (backgroundColor: orange,yellow)
	const downloadOrangeMatches = async () => {
		setLoadingLines(true);
		const dateString = `${paramsObj.day}.${paramsObj.month}.${paramsObj.year}`;
		const writeResult = await createLinesXlsxFileNoBets(games, dateString);

		if (writeResult?.status === "empty") {
			enqueueSnackbar(TEXT.LINES_WARNING, {
				variant: "warning",
			});
		} else if (writeResult?.status === "error") {
			enqueueSnackbar(err?.message ?? TEXT.LINES_ERROR, {
				variant: "error",
			});
		}

		setLoadingLines(false);
	};

	return (
		<Box component="section" sx={{ px: 3, py: 1 }}>
			<Box mb={1}>
				<Typography variant="h5">{TEXT.TITLE}</Typography>
			</Box>
			<Box sx={{ py: 1 }}>
				{CYBER_LIST
					? CYBER_LIST.map((cyber) => {
							return (
								<Accordion key={cyber}>
									<AccordionSummary>
										<Typography variant="subtitle1">{cyber}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<GamesStaticDetailsList
											handleTemp={handleInput}
											games={games}
											cyber={cyber}
										/>
									</AccordionDetails>
								</Accordion>
							);
					  })
					: ""}
			</Box>
			<Box sx={{ display: "flex", gap: 5, my: 2 }}>
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
				<Box>
					<LoadingButton
						variant="outlined"
						size="small"
						loading={loadingLines}
						onClick={downloadOrangeMatches}
						endIcon={<DownloadIcon />}
						loadingPosition="end"
					>
						{TEXT.LINES_BTN}
					</LoadingButton>
				</Box>
			</Box>
		</Box>
	);
};

GamesStaticList.propTypes = {
	paramsObj: PropTypes.shape({
		day: PropTypes.string.isRequired,
		month: PropTypes.string.isRequired,
		year: PropTypes.string.isRequired,
	}),
};

export default GamesStaticList;
