import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, Button, Divider, Slide } from "@mui/material";

import ActiveGamesList from "../components/ActiveGamesList/ActiveGamesList.jsx";

import { CHANNELS } from "../../common/constants/channels.js";
import { ACTIVE_PAGE } from "../constants/activeGamesPage.js";

const ActiveGames = () => {
	const [dataList, setDataList] = useState({});
	// статус отслеживания
	const [isOn, setIsOn] = useState(false);
	// для таймера
	const [onCheck, setOnCheck] = useState(false);
	// матчи, которые прошли проверку
	const [matches, setMatches] = useState([]);

	const handleStart = async () => {
		if (!isOn) {
			ipcRenderer.send(CHANNELS.ANALYZE.ACTIVE, dataList);
		}
		setIsOn(!isOn);
		if (isOn) {
			setIsOn(!isOn);
			setOnCheck(false);
		}
	};

	useEffect(() => {
		let timerId;

		if (onCheck && isOn) {
			timerId = setTimeout(() => {
				ipcRenderer.send(CHANNELS.ANALYZE.ACTIVE, dataList);
			}, 10000);
		} else if (!onCheck && isOn) {
			clearInterval(timerId);
		}
		setOnCheck(false);
	});

	useEffect(() => {
		ipcRenderer.on(CHANNELS.ANALYZE.ACTIVE, (event, arg) => {
			setMatches(arg.data);
			setOnCheck(true);
		});
	}, []);

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
		});
	}, []);

	useEffect(() => {
		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	return (
		<Box component="section">
			<Box px={3} mb={2} sx={{ height: "40px" }}>
				<Button
					sx={{ position: "absolute", top: "90px" }}
					variant="contained"
					onClick={handleStart}
					color={`${isOn ? "error" : "success"}`}
				>
					{isOn ? ACTIVE_PAGE.BTN.END : ACTIVE_PAGE.BTN.START}
				</Button>
			</Box>
			<Divider />
			<ActiveGamesList matches={matches} />
		</Box>
	);
};

export default ActiveGames;
