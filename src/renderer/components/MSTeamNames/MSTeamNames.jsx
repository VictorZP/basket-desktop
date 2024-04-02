import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	TablePagination,
	TableContainer,
	Paper,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { grey } from "@mui/material/colors";

import MSTeamNamesTable from "../MSTeamNamesTable";
import SearchInput from "../SearchInput";
import LoadingSpinner from "../LoadingSpinner";

import { setTeamExpanded } from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getTeamExpandedVal,
	getTeamLoadingStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

const MSTeamNames = ({ teamNamesList = [], handleDelete, handleEdit }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [filteredList, setFilteredList] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [visibleFilteredValues, setVisibleFilteredValues] = useState([]);
	const [searchTimeOut, setSearchTimeOut] = useState(null);

	const expanded = useSelector(getTeamExpandedVal);
	const isLoading = useSelector(getTeamLoadingStatus);

	const dispatch = useDispatch();
	const { TEAM_NAMES_TABLE, REGEX } = MATCHES_SETTINGS;

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
		const searchQuery = e.target.value
			.replaceAll(REGEX.ONE, "")
			.replaceAll(REGEX.TWO, "\\(")
			.replaceAll(REGEX.THREE, "\\)");

		const regex = new RegExp(searchQuery, "i");

		clearTimeout(searchTimeOut);

		setSearchTimeOut(
			setTimeout(() => {
				setSearchValue(searchQuery);

				const filterRes = teamNamesList.filter(
					(team) =>
						regex.test(team.teamChamp.championshipName) ||
						regex.test(team.teamCyber.cyberName) ||
						regex.test(team.teamName) ||
						regex.test(team.fibaliveTeamName1) ||
						regex.test(team.fibaliveTeamName2) ||
						regex.test(team.fibaliveTeamName3) ||
						regex.test(team.betsapiTeamName) ||
						regex.test(team.otherSiteTeamName)
				);
				setPage(0);
				setFilteredList(filterRes);
			}, 500)
		);
	};

	useEffect(() => {
		if (searchValue.length !== 0) {
			const list = filteredList.slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			);

			setVisibleFilteredValues(list);
		}
	}, [filteredList, searchValue, page, rowsPerPage]);

	const btnStackProps = {
		onEdit: handleEdit,
		onDelete: handleDelete,
		editBtnName: TEAM_NAMES_TABLE.EDIT_TEAM_NAME,
		delBtnName: TEAM_NAMES_TABLE.DEL_TEAM_NAME,
	};
	const tableHeadRowsName = [
		TEAM_NAMES_TABLE.CELL_CYBER,
		TEAM_NAMES_TABLE.CELL_CHAMP_NAME,
		TEAM_NAMES_TABLE.CELL_TEAM_NAME,
		TEAM_NAMES_TABLE.CELL_FIBALIVE_NAME,
		TEAM_NAMES_TABLE.CELL_BETSAPI_NAME,
		TEAM_NAMES_TABLE.CELL_OTHER_NAME,
		"",
	];

	const tableProps = {
		headerList: tableHeadRowsName,
		dataList: searchValue.length === 0 ? visibleRows : visibleFilteredValues,
		btnStackProps,
	};
	const searchInputProps = {
		idType: "team",
		handleSearchFilter,
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
						{isLoading ? (
							<LoadingSpinner height={"500px"} />
						) : (
							<>
								<SearchInput {...searchInputProps} />
								<MSTeamNamesTable {...tableProps} />
							</>
						)}
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
