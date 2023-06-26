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

import MSChampionshipsTable from "../MSChampionshipsTable";
import LoadingSpinner from "../LoadingSpinner";

import { setExpanded } from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getExpandedVal,
	getChampionshipsLoadingStatus,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";

const MSChampionships = ({ champList = [], handleDelete, handleEdit }) => {
	const expanded = useSelector(getExpandedVal);
	const isLoading = useSelector(getChampionshipsLoadingStatus);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const dispatch = useDispatch();
	const { CHAMPIONSHIP_TABLE } = MATCHES_SETTINGS;

	const visibleRows = useMemo(
		() => champList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[expanded, champList, page, rowsPerPage]
	);

	const handleChange = (panel) => (event, isExpanded) => {
		dispatch(setExpanded(isExpanded ? panel : false));
	};
	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const btnStackProps = {
		onEdit: handleEdit,
		onDelete: handleDelete,
		editBtnName: CHAMPIONSHIP_TABLE.EDIT_BTN_NAME,
		delBtnName: CHAMPIONSHIP_TABLE.DEL_BTN_NAME,
	};

	const tableHeadRowsName = [
		CHAMPIONSHIP_TABLE.CELL_CYBER,
		CHAMPIONSHIP_TABLE.CELL_CHAMP_NAME,
		CHAMPIONSHIP_TABLE.CELL_FIBALIVE_NAME,
		CHAMPIONSHIP_TABLE.CELL_BETSAPI_NAME,
		CHAMPIONSHIP_TABLE.CELL_OTHER_NAME,
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
				expanded={expanded === CHAMPIONSHIP_TABLE.ACCORDION_NAME}
				onChange={handleChange(CHAMPIONSHIP_TABLE.ACCORDION_NAME)}
				sx={{ minWidth: 600, maxWidth: 1300, backgroundColor: grey[100] }}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="championship-table-content"
					id="championship-table-header"
				>
					<Typography>{CHAMPIONSHIP_TABLE.ACCORDION_TITLE}</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ p: 0 }}>
					<TableContainer component={Paper} sx={{ borderRadius: 0 }}>
						{isLoading ? (
							<LoadingSpinner height={"500px"} />
						) : (
							<MSChampionshipsTable {...tableProps} />
						)}
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 15, 25]}
						component="div"
						count={champList.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handlePageChange}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage={"Чемпионатов на странице"}
					/>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

MSChampionships.propTypes = {
	champList: PropTypes.arrayOf(
		PropTypes.shape({
			cyber: PropTypes.objectOf(PropTypes.string),
			cyberUuid: PropTypes.string,
			championshipId: PropTypes.string,
			championshipName: PropTypes.string,
			fibaliveName: PropTypes.string,
			betsapiName: PropTypes.string,
			otherSiteName: PropTypes.string,
			owner: PropTypes.string,
		})
	),
	handleDelete: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
};

export default MSChampionships;
