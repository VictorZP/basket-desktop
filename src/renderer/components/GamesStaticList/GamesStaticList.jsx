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
	AccordionDetails,
} from "../../helpers/reusableComponents/gamesStaticListAccordion";
import GamesStaticDetailsList from "../GamesStaticDetailsList";
import { AccordionSummaryComponent } from "../../ui/addGamesPage";

import { handleUrlAdded } from "../../redux/urlForm/urlFormSlice";
import { getIsUrlAdded } from "../../redux/urlForm/urlFormSelector";

import {
	generateStateObject,
	getCyberIDForAccordion,
	handleSetTempAndPredictFromFile,
} from "../../helpers/functions/addMatches";
import { createLinesXlsxFileNoBets } from "../../helpers/functions/lines/createLinesXlsxFileNoBets";

import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";
import { TEXT } from "./text";
import { CYBER_LIST, STATUS } from "../../constants";
import { CONSTANTS } from "../../constants/matchesPage";

const GamesStaticList = ({ paramsObj }) => {
	const [games, setGames] = useState([]);
	const [loadingTemp, setLoadingTemp] = useState(false);
	const [loadingTempFromFileBtnId, setLoadingTempFromFileBtnId] = useState("");
	const [loadingLines, setLoadingLines] = useState(false);
	const [expanded, setExpanded] = useState(generateStateObject(CYBER_LIST));
	const [updatedMatches, setUpdatedMatches] = useState([]);
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

			setGames(arg?.data);
			dispatch(handleUrlAdded(false));
		});

		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, [isUrlAdded, paramsObj]);

	useEffect(() => {
		return () => {
			setGames([]);
			setUpdatedMatches([]);
		};
	}, []);

	const handleInput = (e) => {
		const elemID = e.target.id;
		const id = elemID?.split("_")?.slice(1)?.join("_");
		const name = elemID?.split("_")?.at(0);

		const value = e?.target?.value;
		let index = games?.findIndex((game) => game?.matchId === id);

		const updatedDataList = games;
		if (name === "temp") {
			updatedDataList[index].temp = value;
		} else {
			updatedDataList[index].predict = value;
		}

		setGames([...updatedDataList]);

		const matchesToSave = updatedDataList?.map((game) => {
			if (!game) return;

			const dataForSave = {
				matchId: game?.matchId,
				temp: Number.parseFloat(game?.temp),
				predict: Number.parseFloat(game?.predict),
			};
			return dataForSave;
		});

		setUpdatedMatches([...matchesToSave]);
	};

	const setTempAndPredictFromFile = async (e) => {
		try {
			const btnId = e.currentTarget.id;
			setLoadingTempFromFileBtnId(btnId);

			const handlerResult = await handleSetTempAndPredictFromFile(btnId, games);
			if (
				handlerResult.status === STATUS.ERROR ||
				handlerResult.status === STATUS.WARNING
			) {
				enqueueSnackbar(handlerResult?.message, {
					variant: handlerResult.status || STATUS.ERROR,
				});
				return;
			} else {
				enqueueSnackbar(handlerResult?.message, {
					variant: "success",
				});
			}
		} catch (err) {
			enqueueSnackbar(err?.message, {
				variant: STATUS.ERROR,
			});
		} finally {
			dispatch(handleUrlAdded(true));
			setLoadingTempFromFileBtnId("");
		}
	};

	const handleSaveTemp = async () => {
		const data = { games: updatedMatches };

		setLoadingTemp(true);

		const saveResult = await ipcRenderer.invoke(
			CHANNELS.ANALYZE.UPD_TEMP,
			data
		);

		setLoadingTemp(false);

		if (saveResult?.statusText !== "OK") {
			enqueueSnackbar(
				saveResult?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
				{
					variant: "error",
				}
			);
			return;
		}

		enqueueSnackbar(CONSTANTS.SUCCESS_MSG.TEMP_PREDICT, {
			variant: "success",
		});
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

	const handleAccordionExpandedStatus = (panel) => (e, isExpanded) => {
		if (e.target.nodeName !== "BUTTON") {
			setExpanded((prev) => ({
				...prev,
				[getCyberIDForAccordion(panel)]: isExpanded,
			}));
		}
	};

	return (
		<Box component="section" sx={{ px: 3, py: 1 }}>
			<Box mb={1}>
				<Typography variant="h5">{TEXT.TITLE}</Typography>
			</Box>
			<Box sx={{ py: 1 }} maxWidth={1300}>
				{CYBER_LIST
					? CYBER_LIST.map((cyber) => {
							return (
								<Accordion
									key={cyber}
									expanded={expanded[getCyberIDForAccordion(cyber)]}
									id={getCyberIDForAccordion(cyber)}
									onChange={handleAccordionExpandedStatus(cyber)}
								>
									<AccordionSummaryComponent
										cyber={cyber}
										games={games}
										expanded={expanded}
										setTempAndPredictFromFile={setTempAndPredictFromFile}
										loadingTempFromFileBtnId={loadingTempFromFileBtnId}
									/>
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
