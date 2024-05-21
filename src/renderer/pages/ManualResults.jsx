import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Button, Divider, Slide } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import ManualPageUrlForm from "../components/ManualPageComponents/ManualPageUrlForm";
import ManualGamesList from "../components/ManualPageComponents/ManualGamesList";

import { handleOpenState } from "../redux/urlForm/urlFormSlice.js";
import { getIsUrlFormOpen } from "../redux/urlForm/urlFormSelector.js";

import { handleDataChange } from "../helpers/functions/addManualMatches";

import { CHANNELS } from "../../common/constants/channels.js";
import { MANUAL_PAGE } from "../constants/manualResultsPage.js";

const ManualResults = () => {
	const [dateValue, setDateValue] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingSave, setLoadingSave] = useState(false);
	const [games, setGames] = useState([]);
	const [updatedMatches, setUpdatedMatches] = useState([]);
	const containerRef = useRef(null);

	const isFormOpen = useSelector(getIsUrlFormOpen);
	const dispatch = useDispatch();

	const handleDateChange = async (e) => {
		setDateValue(e);
		const date = dayjs(e).format("DD.MM.YY").split(".");

		const paramsObj = {
			day: date[0],
			month: date[1],
			year: date[2],
		};

		setIsLoading(true);

		try {
			const resData = await ipcRenderer.invoke(
				CHANNELS.MANUAL_ADDING.GET_MANUAL_LIST,
				paramsObj
			);

			if (resData.statusText !== "OK" && resData.statusText !== "No Content") {
				enqueueSnackbar(resData?.message ?? MANUAL_PAGE.ERROR.ON_GET_LIST, {
					variant: "error",
				});
				setIsLoading(false);
				return;
			}
			setGames(resData.data);
		} catch (err) {
			enqueueSnackbar(err?.message ?? err, {
				variant: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleOpenUrlForm = () => {
		dispatch(handleOpenState(!isFormOpen));
	};

	const handleInput = (e) => {
		const results = handleDataChange(e, games, updatedMatches);

		setGames([...results.updatedDataList]);
		setUpdatedMatches([...results.updatedMatches]);
	};

	const handleSave = async () => {
		setLoadingSave(true);

		try {
			const updateRes = await ipcRenderer.invoke(
				CHANNELS.MANUAL_ADDING.SAVE_MANUAL_LIST,
				{ games: updatedMatches }
			);
			if (updateRes.statusText !== "OK") {
				enqueueSnackbar(
					updateRes?.message ?? MANUAL_PAGE.WARNING.ON_SAVE_LIST,
					{
						variant: "warning",
					}
				);
				setLoadingSave(false);
				return;
			}
			enqueueSnackbar(updateRes?.message ?? MANUAL_PAGE.SUCCESS.SAVE, {
				variant: "success",
			});
		} catch (err) {
			enqueueSnackbar(err?.message ?? err, {
				variant: "error",
			});
		} finally {
			setLoadingSave(false);
		}
	};

	return (
		<Box component="section">
			<Box sx={{ px: 3, py: 1, display: "flex", alignItems: "center", gap: 2 }}>
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
					disabled={isLoading}
				/>
				<Button variant="outlined" onClick={handleOpenUrlForm}>
					{MANUAL_PAGE.FORM_BTN}
				</Button>
			</Box>
			<Box ref={containerRef} sx={{ px: 3, py: 1, overflow: "hidden" }}>
				<Slide
					direction="right"
					in={isFormOpen}
					container={containerRef.current}
				>
					{<ManualPageUrlForm dateValue={dateValue} setGames={setGames} />}
				</Slide>
			</Box>
			<Divider />
			<ManualGamesList
				games={games}
				setGames={setGames}
				handleInput={handleInput}
			/>
			<Box sx={{ px: 3, py: 1 }}>
				<LoadingButton
					variant="outlined"
					size="small"
					loading={loadingSave}
					onClick={handleSave}
					endIcon={<SendIcon />}
					loadingPosition="end"
				>
					{MANUAL_PAGE.VALUES_BTN}
				</LoadingButton>
			</Box>
		</Box>
	);
};

export default ManualResults;
