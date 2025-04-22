import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";

import GamesStaticData from "../GamesStaticData";

const ipcRenderer = window.require("electron").ipcRenderer;

import { handleUrlAdded } from "../../redux/urlForm/urlFormSlice";
import { getIsUrlAdded } from "../../redux/urlForm/urlFormSelector";

import { createLinesXlsxFileNoBets } from "../../helpers/functions/lines/createLinesXlsxFileNoBets";

import { TEXT } from "./text";
import { CHANNELS, MATCHES_SETTINGS } from "../../../common/constants";
import { CONSTANTS } from "../../constants/matchesPage";

const GamesStaticList = ({ paramsObj }) => {
	const [games, setGames] = useState([]);
	const [loadingTemp, setLoadingTemp] = useState(false);
	const [loadingLines, setLoadingLines] = useState(false);
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

	return (
		<Box component="section" sx={{ px: 3, py: 1 }}>
			<Box mb={1}>
				<Typography variant="h5">{TEXT.TITLE}</Typography>
			</Box>
			<GamesStaticData
				games={games}
				setGames={setGames}
				setUpdatedMatches={setUpdatedMatches}
				setLoadingTemp={setLoadingTemp}
			/>
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
