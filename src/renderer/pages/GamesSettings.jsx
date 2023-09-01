import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { Box, Typography, Button, Divider, Slide } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import UrlForm from "../components/UrlForm";
import GamesStaticList from "../components/GamesStaticList";

import { handleOpenState } from "../redux/urlForm/urlFormSlice.js";
import { getIsUrlFormOpen } from "../redux/urlForm/urlFormSelector.js";

import { CONSTANTS } from "../constants/matchesPage.js";

const TEXT = {
	NEXT_BTN: "Отслеживание матчей",
	ACTIVE_BTN_ID: "active games",
	PATH: "active_games",
	MANUAL_BTN: "Ручное добавление",
	MANUAL_BTN_ID: "manual handler",
	MANUAL_PATH: "manual_results",
};

const GamesSettings = () => {
	const [dateValue, setDateValue] = useState(dayjs());
	const navigate = useNavigate();
	const containerRef = useRef(null);

	const isFormOpen = useSelector(getIsUrlFormOpen);
	const dispatch = useDispatch();

	const handleDateChange = async (e) => {
		setDateValue(e);
	};

	const handleOpenUrlForm = () => {
		dispatch(handleOpenState(!isFormOpen));
	};

	const handleNavigate = (e) => {
		const id = e.target.id;
		if (id === TEXT.ACTIVE_BTN_ID) {
			navigate(`/${TEXT.PATH}`);
		} else {
			navigate(`/${TEXT.MANUAL_PATH}`);
		}
	};
	const paramsObj = {
		day: dayjs(dateValue).format("DD.MM.YY").split(".")[0],
		month: dayjs(dateValue).format("DD.MM.YY").split(".")[1],
		year: dayjs(dateValue).format("DD.MM.YY").split(".")[2],
	};

	return (
		<Box>
			<Box component="section" sx={{ px: 3, pt: 1, pb: 2, overflow: "hidden" }}>
				<Typography variant="h5" sx={{ mb: 1 }}>
					{CONSTANTS.ADD_URL.TITLE}
				</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
					}}
				>
					<DatePicker
						label="Дата матчей"
						value={dateValue}
						onChange={handleDateChange}
						sx={{
							alignItems: "flex-start",
							m: 0,
						}}
						slotProps={{
							actionBar: {
								actions: ["clear", "today"],
							},
						}}
					/>
					<Button variant="outlined" onClick={handleOpenUrlForm}>
						{CONSTANTS.ADD_URL.BTN_OPEN}
					</Button>
				</Box>

				<Box ref={containerRef}>
					<Slide
						direction="right"
						in={isFormOpen}
						container={containerRef.current}
					>
						{<UrlForm paramsObj={paramsObj} />}
					</Slide>
				</Box>
			</Box>
			<Divider />
			<GamesStaticList paramsObj={paramsObj} />
			<Divider />
			<Box sx={{ px: 3, py: 3, overflow: "hidden" }}>
				<Button
					variant="outlined"
					size="small"
					id={TEXT.ACTIVE_BTN_ID}
					onClick={handleNavigate}
				>
					{TEXT.NEXT_BTN}
				</Button>
			</Box>
			<Divider />
			<Box sx={{ px: 3, py: 3, overflow: "hidden" }}>
				<Typography variant="h5" sx={{ mb: 1 }}>
					{CONSTANTS.MANUAL_ADD.TITLE}
				</Typography>
				<Button
					variant="outlined"
					size="small"
					id={TEXT.MANUAL_BTN_ID}
					onClick={handleNavigate}
				>
					{TEXT.MANUAL_BTN}
				</Button>
			</Box>
		</Box>
	);
};

export default GamesSettings;
