import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, Button, Divider, Slide } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import UrlForm from "../components/UrlForm";
import GamesStaticList from "../components/GamesStaticList";

import { handleOpenState } from "../redux/urlForm/urlFormSlice.js";
import { getIsUrlFormOpen } from "../redux/urlForm/urlFormSelector.js";

import { CONSTANTS } from "../constants/matchesPage.js";
const { CHANNELS } = require("../../common/constants/channels.js");

const TEXT = {
	NEXT_BTN: "Отслеживание матчей",
	ACTIVE_BTN_ID: "active games",
	PATH: "active_games",
	MATCH_INFO: {
		TITLE: "Статистика игр",
		ID: "geams_stats",
	},
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

	const handleNavigate = async (e) => {
		const id = e.target.id;

		switch (id) {
			case TEXT.ACTIVE_BTN_ID:
				navigate(`/${TEXT.PATH}`);
				break;

			case TEXT.MANUAL_BTN_ID:
				navigate(`/${TEXT.MANUAL_PATH}`);
				break;

			case TEXT.MATCH_INFO.ID: {
				const res = await ipcRenderer.invoke(
					CHANNELS.MATCHES_STATS.OPEN_STATS_WINDOW
				);
				if (res?.status === 500) {
					enqueueSnackbar(res?.message, {
						variant: "error",
					});
				}
				break;
			}

			default:
				break;
		}
	};
	const dateObj = {
		selectedDate: dayjs(dateValue).format("DD.MM.YY"),
		prevDate: dayjs(dateValue).subtract(1, "day").format("DD.MM.YY"),
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
						{<UrlForm dateObj={dateObj} />}
					</Slide>
				</Box>
			</Box>
			<Divider />
			<GamesStaticList paramsObj={paramsObj} />
			<Divider />
			<Box sx={{ px: 3, py: 3, overflow: "hidden", display: "flex", gap: 5 }}>
				<Button
					variant="outlined"
					size="small"
					id={TEXT.ACTIVE_BTN_ID}
					onClick={handleNavigate}
				>
					{TEXT.NEXT_BTN}
				</Button>
				<Button
					variant="outlined"
					size="small"
					id={TEXT.MATCH_INFO.ID}
					onClick={handleNavigate}
				>
					{TEXT.MATCH_INFO.TITLE}
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
