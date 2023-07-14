import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, Button, Divider, Slide } from "@mui/material";

import { CHANNELS } from "../../common/constants/channels.js";

const ActiveGames = () => {
	const [dataList, setDataList] = useState({});
	const [isOn, setIsOn] = useState(false);
	const [onCheck, setOnCheck] = useState(false);

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
			console.log("in response analyze");
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
		<Box>
			<Button variant="outlined" onClick={handleStart}>
				{isOn ? "STOP" : "ON"}
			</Button>
		</Box>
	);
};

export default ActiveGames;
