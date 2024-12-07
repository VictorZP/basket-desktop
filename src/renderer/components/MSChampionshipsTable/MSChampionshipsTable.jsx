import React from "react";
import PropTypes from "prop-types";

import {
	Box,
	List,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import TableBtnStack from "../TableBtnStack";
import ChampionshipNameListItem from "../../ui/championshipNames/ChampionshipNameListItem.jsx";
import {
	StyledTableCell,
	StyledTableRow,
} from "../../helpers/reusableComponents/tableComponents.js";

import LoadingSpinner from "../LoadingSpinner";

import { MATCHES_SETTINGS } from "../../../common/constants";

const MSChampionshipsTable = ({ dataList = [], btnStackProps, isLoading }) => {
	const { CHAMPIONSHIP_TABLE } = MATCHES_SETTINGS;

	const tableHeadRowsName = [
		CHAMPIONSHIP_TABLE.CELL_CYBER,
		CHAMPIONSHIP_TABLE.CELL_CHAMP_NAME,
		CHAMPIONSHIP_TABLE.CELL_FIBALIVE_NAME,
		CHAMPIONSHIP_TABLE.CELL_BETSAPI_NAME,
		CHAMPIONSHIP_TABLE.CELL_OTHER_NAME,
		CHAMPIONSHIP_TABLE.CELL_NO_BETS_LIST,
		"",
	];

	return (
		<Table aria-label="championship table">
			<TableHead>
				<TableRow>
					{tableHeadRowsName.map((name, index) => {
						if (index === 0) {
							return (
								<StyledTableCell key={index} sx={{ width: 100 }}>
									{name}
								</StyledTableCell>
							);
						} else {
							return <StyledTableCell key={index}>{name}</StyledTableCell>;
						}
					})}
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
						<StyledTableRow key={row?.championshipId}>
							<StyledTableCell>{row?.cyber?.name ?? ""}</StyledTableCell>
							<StyledTableCell>{row?.championshipName ?? ""}</StyledTableCell>
							<StyledTableCell>
								<List disablePadding>
									{row?.fibaliveChampName1 && (
										<ChampionshipNameListItem
											champName={row?.fibaliveChampName1}
										/>
									)}
									{row?.fibaliveChampName2 && (
										<ChampionshipNameListItem
											champName={row?.fibaliveChampName2}
										/>
									)}
									{row?.fibaliveChampName3 && (
										<ChampionshipNameListItem
											champName={row?.fibaliveChampName3}
										/>
									)}
								</List>
							</StyledTableCell>
							<StyledTableCell>
								<List disablePadding>
									{row?.betsapiChampName1 && (
										<ChampionshipNameListItem
											champName={row?.betsapiChampName1}
										/>
									)}
									{row?.betsapiChampName2 && (
										<ChampionshipNameListItem
											champName={row?.betsapiChampName2}
										/>
									)}
									{row?.betsapiChampName3 && (
										<ChampionshipNameListItem
											champName={row?.betsapiChampName3}
										/>
									)}
								</List>
							</StyledTableCell>
							<StyledTableCell>
								<List disablePadding>
									{row?.otherSiteChampName1 && (
										<ChampionshipNameListItem
											champName={row?.otherSiteChampName1}
										/>
									)}
									{row?.otherSiteChampName2 && (
										<ChampionshipNameListItem
											champName={row?.otherSiteChampName2}
										/>
									)}
									{row?.otherSiteChampName3 && (
										<ChampionshipNameListItem
											champName={row?.otherSiteChampName3}
										/>
									)}
								</List>
							</StyledTableCell>
							<StyledTableCell>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									{row?.noBetsList ? <CheckIcon color="success" /> : ""}
								</Box>
							</StyledTableCell>
							<StyledTableCell>
								<TableBtnStack {...btnStackProps} btnId={row?.championshipId} />
							</StyledTableCell>
						</StyledTableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};

MSChampionshipsTable.propTypes = {
	dataList: PropTypes.arrayOf(PropTypes.object),
	btnStackProps: PropTypes.shape({
		onEdit: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,
		editBtnName: PropTypes.string.isRequired,
		delBtnName: PropTypes.string.isRequired,
	}),
	isLoading: PropTypes.bool.isRequired,
};

export default MSChampionshipsTable;
