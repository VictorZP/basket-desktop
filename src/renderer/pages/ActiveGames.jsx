import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Button, Divider } from "@mui/material";

import ActiveGamesList from "../components/ActiveGamesList/ActiveGamesList.jsx";
import ActiveGamesListNoBets from "../components/ActiveGamesListNoBets/ActiveGamesListNoBets.jsx";

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
	// таймер
	const [timerId, setTimerId] = useState(0);

	const paramsObj = {
		day: dayjs().format("DD.MM.YY").split(".")[0],
		month: dayjs().format("DD.MM.YY").split(".")[1],
		year: dayjs().format("DD.MM.YY").split(".")[2],
	};

	const handleStart = async () => {
		if (!isOn) {
			ipcRenderer.send(CHANNELS.ANALYZE.ACTIVE, dataList);
		}
		setIsOn(!isOn);
		if (isOn) {
			clearInterval(timerId);
			setIsOn(!isOn);
			setOnCheck(false);
		}
	};

	useEffect(() => {
		if (onCheck && isOn) {
			const timer = setTimeout(() => {
				ipcRenderer.send(CHANNELS.ANALYZE.ACTIVE, dataList);
			}, 10000);
			setTimerId(timer);
		}
		setOnCheck(false);
	}, [matches]);

	ipcRenderer.once(CHANNELS.ANALYZE.ACTIVE, (event, arg) => {
		const matchesData = [...matches];

		arg.data?.forEach((item) => {
			const ndx = matchesData.findIndex(
				(match) => match?.eventId === item?.eventId
			);

			// Проверка на наличие матча в масиве, а также проверка статуса матча(отображать или нет)
			if (ndx < 0) {
				matchesData.push(item);
				return;
			}

			if (matches[ndx]?.statusFront === ACTIVE_PAGE.STATUS) {
				return;
			}

			if (matches[ndx]?.statusFront !== ACTIVE_PAGE.STATUS) {
				matchesData.splice(ndx, 1, item);

				return;
			}
		});

		setMatches(matchesData);
		setOnCheck(true);
	});

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
		});
	}, []);

	useEffect(() => {
		return () => {
			ipcRenderer.removeAllListeners();
			clearInterval(timerId);
		};
	}, []);

	const hideMatch = (id) => {
		const ndx = matches.findIndex((match) => match.eventId === id);
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
			(match?.noBets || match?.kickOFF === 0)
		);
	});

	return (
		<Box component="section">
			<Box
				px={3}
				mb={2}
				sx={{
					height: "40px",
				}}
			>
				<Button
					variant="contained"
					onClick={handleStart}
					color={`${isOn ? "error" : "success"}`}
				>
					{isOn ? ACTIVE_PAGE.BTN.END : ACTIVE_PAGE.BTN.START}
				</Button>
			</Box>
			<Divider />
			<ActiveGamesList matches={filteredMatches} hideMatch={hideMatch} />
			<Divider />
			<ActiveGamesListNoBets
				matches={filteredMatchesManual}
				hideMatch={hideMatch}
			/>
		</Box>
	);
};

export default ActiveGames;
