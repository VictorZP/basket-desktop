import React, { useState, useEffect, useRef } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import ActiveGamesList from "../components/ActiveGamesList/ActiveGamesList.jsx";

import {
	handleConnectionBtn,
	makeMatchesFilteredList,
	handleGamesCheckFromResponse,
} from "../helpers/functions/activeGames";

import { CHANNELS } from "../../common/constants/channels.js";
import { ACTIVE_PAGE } from "../constants/activeGamesPage.js";

const ActiveGames = () => {
	const [matches, setMatches] = useState([]); // matches that have passed the check
	const [isConnected, setIsConnected] = useState(false); // for button styles
	const [connectionLoadingStatus, setConnectionLoadingStatus] = useState(false);
	const connectedStatus = useRef(false); // for connection handling

	//  -- Handling connection/disconnection to room by button --
	const handleStart = async () => {
		await handleConnectionBtn(
			isConnected,
			connectedStatus,
			setIsConnected,
			setConnectionLoadingStatus
		);
	};

	//  -- Handling unmounting --
	useEffect(() => {
		return () => {
			//  Leave the room when the component is unmounted
			if (connectedStatus.current) {
				ipcRenderer.invoke(CHANNELS.ANALYZE.CONNECT, connectedStatus.current);
			}
		};
	}, []);

	//  -- Handling disconnecting from analyze server  --
	useEffect(() => {
		const disconnectListener = () => {
			setIsConnected(false);
			connectedStatus.current = false;

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

	const filteredMatches = makeMatchesFilteredList(matches, false);
	const filteredMatchesManual = makeMatchesFilteredList(matches, true);

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
