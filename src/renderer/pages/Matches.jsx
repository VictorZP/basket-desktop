import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Typography, Button, Divider, Slide } from "@mui/material";

import LoadingSpinner from "../components/LoadingSpinner";
import UrlForm from "../components/UrlForm";

import { handleOpenState } from "../redux/urlForm/urlFormSlice.js";
import { getIsUrlFormOpen } from "../redux/urlForm/urlFormSelector.js";

import { CONSTANTS } from "../constants/matchesPage.js";

const Matches = () => {
	const containerRef = useRef(null);

	const isFormOpen = useSelector(getIsUrlFormOpen);
	const dispatch = useDispatch();

	const handleOpenUrlForm = () => {
		dispatch(handleOpenState(!isFormOpen));
	};

	const urlFormProps = {
		handleOpenUrlForm,
	};

	return (
		<Box sx={{ outLine: "1px solid red" }}>
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
		</Box>
	);
};

export default Matches;
