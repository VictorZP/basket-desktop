import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
	Box,
	Paper,
	Accordion,
	Typography,
	TableContainer,
	TablePagination,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { grey } from "@mui/material/colors";

import SearchInput from "../SearchInput";
import MSTeamNamesTable from "../MSTeamNamesTable";

import {
	setTeamExpanded,
	setTeamLoadingStatus,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getTeamExpandedVal,
	getTeamLoadingStatus,
	getTeamEditStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";

import {
	formSearchQuery,
	handleTeamNamesFilter,
	handleVisibleFilteredList,
} from "../../helpers/functions/matchesSettings";

import { MATCHES_SETTINGS } from "../../../common/constants";

const MSTeamNames = ({ teamNamesList = [], handleDelete, handleEdit }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [filteredList, setFilteredList] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [visibleFilteredValues, setVisibleFilteredValues] = useState([]);

	const expanded = useSelector(getTeamExpandedVal);
	const isLoading = useSelector(getTeamLoadingStatus);
	const onTeamNameEditStatus = useSelector(getTeamEditStatus);

	const dispatch = useDispatch();
	const { TEAM_NAMES_TABLE } = MATCHES_SETTINGS;

	const visibleRows = useMemo(
		() =>
			teamNamesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[expanded, teamNamesList, page, rowsPerPage]
	);

	const handleChange = (panel) => (event, isExpanded) => {
		dispatch(setTeamExpanded(isExpanded ? panel : false));
	};
	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (e) => {
		const value = e?.target?.value;
		setRowsPerPage(parseInt(value, 10));
		setPage(0);
	};

	const handleSearchFilter = (e) => {
		const searchValue = e.target.value;
		setSearchValue(searchValue);

		const searchQuery = formSearchQuery(searchValue);
		const filterRes = handleTeamNamesFilter(teamNamesList, searchQuery);

		setPage(0);
		setFilteredList(filterRes);
	};

	useEffect(() => {
		if (searchValue.length !== 0) {
			const list = handleVisibleFilteredList(filteredList, page, rowsPerPage);
			setVisibleFilteredValues(list);
		}
	}, [filteredList, searchValue, page, rowsPerPage]);

	useEffect(() => {
		if (searchValue.length !== 0 && !onTeamNameEditStatus) {
			const filterRes = handleTeamNamesFilter(teamNamesList, searchValue);
			const list = handleVisibleFilteredList(filterRes, page, rowsPerPage);

			setVisibleFilteredValues(list);
			isLoading && dispatch(setTeamLoadingStatus(false));
		}
	}, [onTeamNameEditStatus, teamNamesList]);

	useEffect(() => {
		return () => {
			setSearchValue("");
			setVisibleFilteredValues([]);
		};
	}, [expanded]);

	const btnStackProps = {
		onEdit: handleEdit,
		onDelete: handleDelete,
		editBtnName: TEAM_NAMES_TABLE.EDIT_TEAM_NAME,
		delBtnName: TEAM_NAMES_TABLE.DEL_TEAM_NAME,
	};

	const tableProps = {
		dataList: searchValue.length === 0 ? visibleRows : visibleFilteredValues,
		btnStackProps,
		isLoading,
	};
	const searchInputProps = {
		idType: "team",
		handleSearchFilter,
		value: searchValue,
	};

	return (
		<Box sx={{ px: 3, mb: 2 }}>
			<Accordion
				expanded={expanded === TEAM_NAMES_TABLE.ACCORDION_NAME}
				onChange={handleChange(TEAM_NAMES_TABLE.ACCORDION_NAME)}
				sx={{ minWidth: 700, maxWidth: 1300, backgroundColor: grey[100] }}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="teams-name-table-content"
					id="teams-name-table-header"
				>
					<Typography>{TEAM_NAMES_TABLE.ACCORDION_TITLE}</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ p: 0 }}>
					<TableContainer component={Paper} sx={{ borderRadius: 0 }}>
						<SearchInput {...searchInputProps} />
						<MSTeamNamesTable {...tableProps} />
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 15, 25]}
						component="div"
						count={
							searchValue.length === 0
								? teamNamesList.length
								: filteredList.length
						}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handlePageChange}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage={"Команд на странице"}
					/>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

MSTeamNames.propTypes = {
	teamNamesList: PropTypes.arrayOf(
		PropTypes.shape({
			teamId: PropTypes.string.isRequired,
			teamName: PropTypes.string.isRequired,
			fibaliveTeamName1: PropTypes.string,
			fibaliveTeamName2: PropTypes.string,
			fibaliveTeamName3: PropTypes.string,
			betsapiTeamName: PropTypes.string,
			otherSiteTeamName: PropTypes.string,
			teamCyber: PropTypes.objectOf(PropTypes.string),
			teamChamp: PropTypes.objectOf(PropTypes.string),
		})
	),
	handleDelete: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
};

export default MSTeamNames;
