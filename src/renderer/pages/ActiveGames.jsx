import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import ActiveGamesList from "../components/ActiveGamesList/ActiveGamesList.jsx";

import {
	handleConnectionBtn,
	handleGamesCheckFromResponse,
} from "../helpers/functions/activeGames";

import { CHANNELS } from "../../common/constants/channels.js";
import { ACTIVE_PAGE } from "../constants/activeGamesPage.js";

const ActiveGames = () => {
	const [matches, setMatches] = useState([]); // matches that have passed the check
	const [isConnected, setIsConnected] = useState(false);
	const [connectionLoadingStatus, setConnectionLoadingStatus] = useState(false);

	//  -- Handling connection/disconnection to room by button --
	const handleStart = async () => {
		await handleConnectionBtn(
			isConnected,
			setIsConnected,
			setConnectionLoadingStatus
		);
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

	//  -- Handling disconnecting from analyze server  --
	useEffect(() => {
		const disconnectListener = (event, data) => {
			setIsConnected(false);

			enqueueSnackbar(ACTIVE_PAGE.MESSAGES.DISCONNECTED, {
				variant: "warning",
			});
		};

		ipcRenderer.on(CHANNELS.ANALYZE.DISCONNECT, disconnectListener);

		return () => {
			ipcRenderer.removeListener(
				CHANNELS.ANALYZE.DISCONNECT,
				disconnectListener
			);
		};
	});

	// -- Handling the appearance of a new match in the list --
	useEffect(() => {
		const listener = (event, game) => {
			handleGamesCheckFromResponse(matches, game, setMatches);
		};

		ipcRenderer.on(CHANNELS.ANALYZE.ACTIVE, listener);

		return () => {
			ipcRenderer.removeListener(CHANNELS.ANALYZE.ACTIVE, listener);
		};
	});

	const hideMatch = (id) => {
		let ndx = matches.findIndex((match) => match?.matchId === id);

		const matchesArr = [...matches];
		matchesArr[ndx].statusFront = ACTIVE_PAGE.STATUS;
		setMatches(matchesArr);

		ipcRenderer.send(CHANNELS.ANALYZE.MATCH_CHECK, id);
	};

	const filteredMatches = matches.filter((match) => {
		return (
			match?.statusFront !== ACTIVE_PAGE.STATUS &&
			!match?.noBets &&
			match?.total !== 0 &&
			match?.kickOff !== 0
		);
	});

	//  -- List of matches where there is no KickOff or Bets ID --
	const filteredMatchesManual = matches.filter((match) => {
		return (
			match?.statusFront !== ACTIVE_PAGE.STATUS &&
			(match?.noBets ||
				match?.kickOff === 0 ||
				(!match?.noBets && match?.total === 0))
		);
	});

	return (
		<Box component="section">
			<Box px={3} mb={2} height={40}>
				<LoadingButton
					variant="contained"
					onClick={handleStart}
					color={`${isConnected ? "error" : "success"}`}
					loading={connectionLoadingStatus}
				>
					{isConnected ? ACTIVE_PAGE.BTN.END : ACTIVE_PAGE.BTN.START}
				</LoadingButton>
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
