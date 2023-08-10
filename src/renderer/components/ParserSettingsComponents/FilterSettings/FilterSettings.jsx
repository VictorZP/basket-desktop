import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TextField, Button } from "@mui/material";

import FilterLeagueComponent from "../FilterLeagueComponent";
import FilterLeagueList from "../FilterLeagueList";
import AddFilterLeague from "../AddFilterLeague";

import { TEXT, INITIAL_CHAMP } from "./text.js";
import { FILTER_LIST } from "../filterList.js";
import { listStyle } from "./style.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

const FilterSettings = () => {
	const [selectedBaseIndex, setSelectedBaseIndex] = useState(null);
	const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
	const [selectedChamp, setSelectedChamp] = useState(INITIAL_CHAMP);
	const [isLoading, setIsLoading] = useState(false);
	const [filterChampId, setFilterChampId] = useState("");
	const [isUpdated, setIsUpdated] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setSelectedGroupIndex(null);
	}, [selectedBaseIndex]);

	const handleListItemClick = (index, type) => {
		if (type === "base") setSelectedBaseIndex(index);
		if (type === "group") setSelectedGroupIndex(index);
	};

	const handleClickOpen = (e) => {
		setFilterChampId(e?.currentTarget?.id);
		setOpen(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading((prev) => !prev);

		const data = {
			base: FILTER_LIST.base[selectedBaseIndex - 1],
			group: FILTER_LIST.group[selectedGroupIndex - 1],
			champName: selectedChamp.label,
		};
		const res = await ipcRenderer.invoke(
			CHANNELS.PARSER.FILTER_ADD_CHAMP,
			data
		);

		if (res.status !== 201) {
			enqueueSnackbar(res?.message, {
				variant: "error",
				autoHideDuration: 3000,
			});
			return;
		}

		enqueueSnackbar(res?.message, {
			variant: "success",
			autoHideDuration: 3000,
		});

		setIsUpdated((prev) => !prev);
		setSelectedChamp(INITIAL_CHAMP);
		setIsLoading((prev) => !prev);
	};

	const addFilterProps = {
		selectedChamp,
		isLoading,
		isUpdated,
		setSelectedChamp,
		handleSubmit,
	};

	return (
		<Box sx={{ px: 3, pb: 3, pt: 1, my: 2 }}>
			<Typography variant="h5">{TEXT.TITLE}</Typography>
			<Box sx={{ display: "flex", mt: 2, width: "1100px" }}>
				<FilterLeagueComponent
					listStyle={listStyle}
					selectedIndex={selectedBaseIndex}
					handleListItemClick={handleListItemClick}
					type={"base"}
				/>
				{selectedBaseIndex ? (
					<FilterLeagueComponent
						listStyle={listStyle}
						selectedIndex={selectedGroupIndex}
						handleListItemClick={handleListItemClick}
						type={"group"}
					/>
				) : null}
				{selectedBaseIndex && selectedGroupIndex ? (
					<>
						<FilterLeagueList
							// filterChampList={filterChampList}
							handleClickOpen={handleClickOpen}
							listStyle={listStyle}
						/>
						<AddFilterLeague
							{...addFilterProps}
							// groupId={filterChampList?._id}
							// isUpdated={isUpdated}
							// setIsUpdated={setIsUpdated}
						/>
					</>
				) : null}
			</Box>
		</Box>
	);
};

export default FilterSettings;
