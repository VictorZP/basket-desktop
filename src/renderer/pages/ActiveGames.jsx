import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Button, Divider } from "@mui/material";

import ActiveGamesList from "../components/ActiveGamesList/ActiveGamesList.jsx";

import { CHANNELS } from "../../common/constants/channels.js";
import { ACTIVE_PAGE } from "../constants/activeGamesPage.js";

const ActiveGames = () => {
	const [matches, setMatches] = useState([]); // matches that have passed the check
	const [isConnected, setIsConnected] = useState(false);

	//  -- Handling connection/disconnection to room by button --
	const handleStart = async () => {
		await ipcRenderer.invoke(CHANNELS.ANALYZE.CONNECT, {
			isConnected,
		});

		ipcRenderer.removeAllListeners();

		setIsConnected((prevState) => !prevState);
	};

	//  -- Handling unmounting --
	useEffect(() => {
		return () => {
			//  Leave the room when the component is unmounted
			if (isConnected) {
				ipcRenderer.invoke(CHANNELS.ANALYZE.CONNECT, {
					isConnected,
				});

				setIsConnected(false);
			}

			ipcRenderer.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		const listener = (event, game) => {
			const matchesData = [...matches];

			let ndx = null;

			switch (true) {
				case !game?.eventId:
					ndx = matchesData.findIndex((match) => match?.url === game?.url);
					break;
				default:
					ndx = matchesData.findIndex(
						(match) => match?.eventId === game?.eventId
					);
					break;
			}

			// Checking for the presence of a match in the array, as well as checking the status of the match (whether to display it or not)
			if (ndx < 0) {
				matchesData.push(game);
				ipcRenderer.send(CHANNELS.ANALYZE.SHOW_NOTIFICATION, game); // Sends a notification when a bid first appears
			}

			if (matches[ndx]?.statusFront === ACTIVE_PAGE.STATUS) {
				return;
			}

			if (matches[ndx]?.statusFront !== ACTIVE_PAGE.STATUS) {
				matchesData.splice(ndx, 1, game);
			}

			setMatches(matchesData);
		};

		ipcRenderer.on(CHANNELS.ANALYZE.ACTIVE, listener);

		return () => {
			ipcRenderer.removeListener(CHANNELS.ANALYZE.ACTIVE, listener);
		};
	});

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

	//  -- List of matches where there is no KickOff or Bets ID --
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
					color={`${isConnected ? "error" : "success"}`}
				>
					{isConnected ? ACTIVE_PAGE.BTN.END : ACTIVE_PAGE.BTN.START}
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
