import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Button, Divider } from "@mui/material";

import ActiveGamesList from "../components/ActiveGamesList/ActiveGamesList.jsx";

import { CHANNELS } from "../../common/constants/channels.js";
import { ACTIVE_PAGE } from "../constants/activeGamesPage.js";

const ActiveGames = () => {
	const [dataList, setDataList] = useState({});

	// const [isOn, setIsOn] = useState(false);
	// const [isConnected, setIsConnected] = useState(false);

	// статус отслеживания
	const [onCheck, setOnCheck] = useState(false);
	// матчи, которые прошли проверку
	const [matches, setMatches] = useState([]);
	// таймер
	const [timerId, setTimerId] = useState(0);

	//  -- Ref for connection/disconnection to room --
	const isConnected = useRef(false);

	const paramsObj = {
		day: dayjs().format("DD.MM.YY").split(".")[0],
		month: dayjs().format("DD.MM.YY").split(".")[1],
		year: dayjs().format("DD.MM.YY").split(".")[2],
	};

	//  -- Handling connection/disconnection to room by button --
	const handleStart = async () => {
		await ipcRenderer.invoke(CHANNELS.ANALYZE.ACTIVE, {
			isConnected: isConnected.current,
		});

		isConnected.current = !isConnected.current;
		setOnCheck(!onCheck);
	};

	//  -- Handling unmounting --
	useEffect(() => {
		return () => {
			//  Leave the room when the component is unmounted
			if (isConnected.current) {
				ipcRenderer.invoke(CHANNELS.ANALYZE.ACTIVE, {
					isConnected: isConnected.current,
				});
				isConnected.current = false;
			}

			ipcRenderer.removeAllListeners();
		};
	}, []);

	// const handleStart = async () => {
	// 	if (!isOn) {
	// 		ipcRenderer.send(CHANNELS.ANALYZE.ACTIVE, dataList);
	// 	}
	// 	setIsOn(!isOn);

	// 	if (isOn) {
	// 		clearInterval(timerId);
	// 		setIsOn(!isOn);
	// 		setOnCheck(false);
	// 	}
	// };

	// useEffect(() => {
	// 	if (onCheck && isOn) {
	// 		const timer = setTimeout(() => {
	// 			ipcRenderer.send(CHANNELS.ANALYZE.ACTIVE, dataList);
	// 		}, 10000);
	// 		setTimerId(timer);
	// 	}
	// 	setOnCheck(false);
	// }, [matches]);

	// useEffect(() => {
	// 	const listener = (event, arg) => {
	// 		const matchesData = [...matches];

	// 		arg.data?.forEach((item) => {
	// 			let ndx = null;

	// 			switch (true) {
	// 				case !item?.eventId:
	// 					ndx = matchesData.findIndex((match) => match?.url === item?.url);
	// 					break;
	// 				default:
	// 					ndx = matchesData.findIndex(
	// 						(match) => match?.eventId === item?.eventId
	// 					);
	// 					break;
	// 			}

	// 			// Checking for the presence of a match in the array, as well as checking the status of the match (whether to display it or not)
	// 			if (ndx < 0) {
	// 				matchesData.push(item);
	// 				// Sends a notification when a bid first appears
	// 				ipcRenderer.send(CHANNELS.ANALYZE.SHOW_NOTIFICATION, item);
	// 				return;
	// 			}

	// 			if (matches[ndx]?.statusFront === ACTIVE_PAGE.STATUS) {
	// 				return;
	// 			}

	// 			if (matches[ndx]?.statusFront !== ACTIVE_PAGE.STATUS) {
	// 				matchesData.splice(ndx, 1, item);
	// 				return;
	// 			}
	// 		});

	// 		setMatches(matchesData);
	// 		setOnCheck(true);
	// 	};

	// 	ipcRenderer.on(CHANNELS.ANALYZE.ACTIVE, listener);

	// 	return () => {
	// 		ipcRenderer.removeListener(CHANNELS.ANALYZE.ACTIVE, listener);
	// 	};
	// }, [onCheck]);

	// useEffect(() => {
	// 	ipcRenderer.send(CHANNELS.ANALYZE.GET_STATIC_LIST, paramsObj);
	// 	ipcRenderer.on(CHANNELS.ANALYZE.GET_STATIC_LIST, (event, arg) => {
	// 		if (arg?.statusText !== "OK") {
	// 			enqueueSnackbar(
	// 				arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
	// 				{
	// 					variant: "error",
	// 				}
	// 			);
	// 			return;
	// 		}
	// 		setDataList(arg?.data);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	return () => {
	// 		ipcRenderer.removeAllListeners();
	// 		clearInterval(timerId);
	// 	};
	// }, []);

	const hideMatch = (id) => {
		let ndx = null;

		switch (true) {
			case id.includes("http"):
				ndx = matches.findIndex((match) => match?.url === id);
				break;
			default:
				ndx = matches.findIndex((match) => match?.eventId === id);
				break;
		}

		const matchesArr = [...matches];
		matchesArr[ndx].statusFront = ACTIVE_PAGE.STATUS;

		setMatches(matchesArr);
	};

	const filteredMatches = matches.filter((match) => {
		return (
			match?.statusFront !== ACTIVE_PAGE.STATUS &&
			!match?.noBets &&
			match?.total !== 0 &&
			match?.kickOFF !== 0
		);
	});

	//	-- Список матчей где нет KickOff или Bets ID --
	const filteredMatchesManual = matches.filter((match) => {
		return (
			match?.statusFront !== ACTIVE_PAGE.STATUS &&
			(match?.noBets ||
				match?.kickOFF === 0 ||
				(!match?.noBets && match?.total === 0))
		);
	});

	return (
		<Box component="section">
			<Box px={3} mb={2} height={40}>
				<Button
					variant="contained"
					onClick={handleStart}
					color={`${onCheck ? "error" : "success"}`}
				>
					{onCheck ? ACTIVE_PAGE.BTN.END : ACTIVE_PAGE.BTN.START}
				</Button>
			</Box>
			<Divider />
			<ActiveGamesList
				matches={filteredMatches}
				hideMatch={hideMatch}
				isBets={true}
			/>
			<Divider />
			<ActiveGamesList
				matches={filteredMatchesManual}
				hideMatch={hideMatch}
				isBets={false}
			/>
		</Box>
	);
};

export default ActiveGames;
