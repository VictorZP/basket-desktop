import React from "react";
import PropTypes from "prop-types";

import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import TableBtnStack from "../TableBtnStack";
import {
	StyledTableCell,
	StyledTableRow,
} from "../../helpers/reusableComponents/tableComponents.js";

const MSChampionshipsTable = ({
	headerList = [],
	dataList = [],
	btnStackProps,
}) => {
	return (
		<Table aria-label="championship table">
			<TableHead>
				<TableRow>
					{headerList.map((name) => (
						<StyledTableCell key={name}>{name}</StyledTableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{dataList?.map((row) => (
					<StyledTableRow key={row?.championshipId}>
						<StyledTableCell>{row?.cyber?.name ?? ""}</StyledTableCell>
						<StyledTableCell>{row?.championshipName ?? ""}</StyledTableCell>
						<StyledTableCell>{row?.fibaliveName ?? ""}</StyledTableCell>
						<StyledTableCell>{row?.betsapiName ?? ""}</StyledTableCell>
						<StyledTableCell>{row?.otherSiteName ?? ""}</StyledTableCell>
						<StyledTableCell>
							<TableBtnStack {...btnStackProps} btnId={row?.championshipId} />
						</StyledTableCell>
					</StyledTableRow>
				))}
			</TableBody>
		</Table>
	);
};

MSChampionshipsTable.propTypes = {
	headerList: PropTypes.arrayOf(PropTypes.string).isRequired,
	dataList: PropTypes.arrayOf(PropTypes.object),
	btnStackProps: PropTypes.shape({
		onEdit: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,
		editBtnName: PropTypes.string.isRequired,
		delBtnName: PropTypes.string.isRequired,
	}),
};

export default MSChampionshipsTable;
