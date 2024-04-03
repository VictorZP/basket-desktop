import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography } from "@mui/material";

import FilterLeagueComponent from "../FilterLeagueComponent";
import FilterLeagueList from "../FilterLeagueList";
import AddFilterLeague from "../AddFilterLeague";

import { TEXT, INITIAL_CHAMP } from "./text.js";
import { FILTER_LIST } from "../filterList.js";
import { listStyle } from "./style.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

const FilterSettings = ({ isFilterDel, openModalDel }) => {
	const [selectedBaseIndex, setSelectedBaseIndex] = useState(null);
	const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
	const [selectedChamp, setSelectedChamp] = useState(INITIAL_CHAMP);
	const [filterList, setFilterList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);

	useEffect(() => {
		setSelectedGroupIndex(null);
	}, [selectedBaseIndex]);

	useEffect(() => {
		const getList = async () => {
			try {
				const res = await ipcRenderer.invoke(CHANNELS.PARSER.FILTER_LIST);
				setFilterList(res.list);
			} catch (err) {
				enqueueSnackbar(err?.message, {
					variant: "error",
					autoHideDuration: 3000,
				});
			}
		};
		getList();
	}, [isFilterDel]);

	const handleListItemClick = (index, type) => {
		if (type === "base") {
			setSelectedBaseIndex(index);
			// clear selected champ when changing base group
			setSelectedChamp(INITIAL_CHAMP);
		}
		if (type === "group") setSelectedGroupIndex(index);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading((prev) => !prev);

		const data = {
			base: FILTER_LIST.base[selectedBaseIndex - 1],
			group: FILTER_LIST.group[selectedGroupIndex - 1],
			champName: selectedChamp.label,
		};

		try {
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

			const addRes = await ipcRenderer.invoke(CHANNELS.PARSER.FILTER_LIST);
			if (addRes.statusText !== "OK") {
				enqueueSnackbar(addRes?.message, {
					variant: "error",
					autoHideDuration: 3000,
				});
				return;
			}

			setFilterList(addRes.list);

			enqueueSnackbar(res?.message, {
				variant: "success",
				autoHideDuration: 3000,
			});

			setIsUpdated((prev) => !prev);
			setSelectedChamp(INITIAL_CHAMP);
		} catch (err) {
			enqueueSnackbar(err?.message, {
				variant: "error",
				autoHideDuration: 3000,
			});
		} finally {
			setIsLoading((prev) => !prev);
		}
	};

	const filterChampList = filterList?.filter(
		(item) =>
			item?.baseName === FILTER_LIST.base[selectedBaseIndex - 1] &&
			item?.group === FILTER_LIST.group[selectedGroupIndex - 1]
	);

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
							filterChampList={filterChampList}
							openModalDel={openModalDel}
							listStyle={listStyle}
						/>
						<AddFilterLeague {...addFilterProps} />
					</>
				) : null}
			</Box>
		</Box>
	);
};

FilterSettings.propTypes = {
	isFilterDel: PropTypes.bool,
	openModalDel: PropTypes.func.isRequired,
};

export default FilterSettings;
