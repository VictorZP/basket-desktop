import React, { useState, useMemo } from "react";
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
import LoadingSpinner from "../LoadingSpinner";

import { setTeamExpanded } from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getTeamExpandedVal,
	getTeamLoadingStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

const MSTeamNames = ({ teamNamesList = [], handleDelete, handleEdit }) => {
	const expanded = useSelector(getTeamExpandedVal);
	const isLoading = useSelector(getTeamLoadingStatus);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

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
		dataList: visibleRows,
		btnStackProps,
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
							<MSTeamNamesTable {...tableProps} />
						)}
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 15, 25]}
						component="div"
						count={teamNamesList.length}
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
	teamNamesList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
	handleDelete: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
};

export default MSTeamNames;
