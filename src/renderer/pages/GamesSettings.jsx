import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Button, Divider, Slide } from "@mui/material";

import UrlForm from "../components/UrlForm";
import GamesStaticList from "../components/GamesStaticList";

import { handleOpenState } from "../redux/urlForm/urlFormSlice.js";
import { getIsUrlFormOpen } from "../redux/urlForm/urlFormSelector.js";

import { CONSTANTS } from "../constants/matchesPage.js";

const TEXT = {
	NEXT_BTN: "Отслеживание матчей",
	PATH: "active_games",
};

const GamesSettings = () => {
	const navigate = useNavigate();
	const containerRef = useRef(null);

	const isFormOpen = useSelector(getIsUrlFormOpen);
	const dispatch = useDispatch();

	const handleOpenUrlForm = () => {
		dispatch(handleOpenState(!isFormOpen));
	};

	const handleNavigate = () => {
		navigate(`/${TEXT.PATH}`);
	};

	return (
		<Box>
			<Box component="section" sx={{ px: 3, py: 1, overflow: "hidden" }}>
				<Typography variant="h5" sx={{ mb: 1 }}>
					{CONSTANTS.ADD_URL.TITLE}
				</Typography>
				<Button variant="outlined" size="small" onClick={handleOpenUrlForm}>
					{CONSTANTS.ADD_URL.BTN_OPEN}
				</Button>

				<Box ref={containerRef}>
					<Slide
						direction="right"
						in={isFormOpen}
						container={containerRef.current}
					>
						{<UrlForm />}
					</Slide>
				</Box>
			</Box>
			<Divider />
			<GamesStaticList />
			<Divider />
			<Box sx={{ px: 3, py: 1, overflow: "hidden" }}>
				<Button variant="outlined" size="small" onClick={handleNavigate}>
					{TEXT.NEXT_BTN}
				</Button>
			</Box>
		</Box>
	);
};

export default GamesSettings;
