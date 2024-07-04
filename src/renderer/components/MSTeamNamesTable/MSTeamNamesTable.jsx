import React from "react";
import PropTypes from "prop-types";

import {
	List,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
} from "@mui/material";

import TableBtnStack from "../TableBtnStack";
import LoadingSpinner from "../LoadingSpinner";
import TeamNameListItem from "../../ui/teamNames/TeamNameListItem.jsx";
import {
	StyledTableCell,
	StyledTableRow,
} from "../../helpers/reusableComponents/tableComponents";

import { MATCHES_SETTINGS } from "../../../common/constants";

const MSTeamNamesTable = ({ dataList = [], btnStackProps, isLoading }) => {
	const { TEAM_NAMES_TABLE } = MATCHES_SETTINGS;

	const tableHeadRowsName = [
		TEAM_NAMES_TABLE.CELL_CYBER,
		TEAM_NAMES_TABLE.CELL_CHAMP_NAME,
		TEAM_NAMES_TABLE.CELL_TEAM_NAME,
		TEAM_NAMES_TABLE.CELL_FIBALIVE_NAME,
		TEAM_NAMES_TABLE.CELL_BETSAPI_NAME,
		TEAM_NAMES_TABLE.CELL_OTHER_NAME,
		"",
	];

	return (
		<Table aria-label="teams name table">
			<TableHead>
				<TableRow>
					{tableHeadRowsName.map((name) => (
						<StyledTableCell key={name}>{name}</StyledTableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{isLoading ? (
					<TableRow>
						<TableCell padding="none" colSpan={7}>
							<LoadingSpinner height={"50px"} size={20} />
						</TableCell>
					</TableRow>
				) : (
					dataList?.map((row) => (
						<StyledTableRow key={row?.teamId}>
							<StyledTableCell>
								{row?.teamCyber?.cyberName ?? ""}
							</StyledTableCell>
							<StyledTableCell>
								{row?.teamChamp?.championshipName ?? ""}
							</StyledTableCell>
							<StyledTableCell>{row?.teamName ?? ""}</StyledTableCell>
							<StyledTableCell>
								<List disablePadding>
									{row?.fibaliveTeamName1 && (
										<TeamNameListItem teamName={row?.fibaliveTeamName1} />
									)}
									{row?.fibaliveTeamName2 && (
										<TeamNameListItem teamName={row?.fibaliveTeamName2} />
									)}
									{row?.fibaliveTeamName3 && (
										<TeamNameListItem teamName={row?.fibaliveTeamName3} />
									)}
								</List>
							</StyledTableCell>
							<StyledTableCell>
								<List disablePadding>
									{row?.betsapiTeamName1 && (
										<TeamNameListItem teamName={row?.betsapiTeamName1} />
									)}
									{row?.betsapiTeamName2 && (
										<TeamNameListItem teamName={row?.betsapiTeamName2} />
									)}
									{row?.betsapiTeamName3 && (
										<TeamNameListItem teamName={row?.betsapiTeamName3} />
									)}
								</List>
							</StyledTableCell>
							<StyledTableCell>{row?.otherSiteTeamName ?? ""}</StyledTableCell>
							<StyledTableCell>
								<TableBtnStack {...btnStackProps} btnId={row?.teamId} />
							</StyledTableCell>
						</StyledTableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};

MSTeamNamesTable.propTypes = {
	dataList: PropTypes.arrayOf(PropTypes.object),
	btnStackProps: PropTypes.shape({
		onEdit: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,
		editBtnName: PropTypes.string.isRequired,
		delBtnName: PropTypes.string.isRequired,
	}),
	isLoading: PropTypes.bool.isRequired,
};

export default MSTeamNamesTable;
