import React from "react";
import PropTypes from "prop-types";

import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import TableBtnStack from "../TableBtnStack";
import {
	StyledTableCell,
	StyledTableRow,
} from "../../helpers/reusableComponents/tableComponents.js";

const MSTeamNamesTable = ({
	headerList = [],
	dataList = [],
	btnStackProps,
}) => {
	return (
		<Table aria-label="teams name table">
			<TableHead>
				<TableRow>
					{headerList.map((name) => (
						<StyledTableCell key={name}>{name}</StyledTableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{dataList?.map((row) => (
					<StyledTableRow key={row?.teamId}>
						<StyledTableCell>{row?.teamCyber?.cyberName ?? ""}</StyledTableCell>
						<StyledTableCell>
							{row?.teamChamp?.championshipName ?? ""}
						</StyledTableCell>
						<StyledTableCell>{row?.teamName ?? ""}</StyledTableCell>
						<StyledTableCell>{row?.fibaliveTeamName ?? ""}</StyledTableCell>
						<StyledTableCell>{row?.betsapiTeamName ?? ""}</StyledTableCell>
						<StyledTableCell>{row?.otherSiteTeamName ?? ""}</StyledTableCell>
						<StyledTableCell>
							<TableBtnStack {...btnStackProps} btnId={row?.teamId} />
						</StyledTableCell>
					</StyledTableRow>
				))}
			</TableBody>
		</Table>
	);
};

MSTeamNamesTable.propTypes = {
	headerList: PropTypes.arrayOf(PropTypes.string).isRequired,
	dataList: PropTypes.arrayOf(PropTypes.object),
	btnStackProps: PropTypes.shape({
		onEdit: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,
		editBtnName: PropTypes.string.isRequired,
		delBtnName: PropTypes.string.isRequired,
	}),
};

export default MSTeamNamesTable;
