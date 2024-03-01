import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Grid, Button } from "@mui/material";

import TeamList from "./TeamsList.jsx";

import {
	getOutChampId,
	getSearchQuery,
} from "../../redux/teamTransfer/teamTransferSelector.js";

import {
	useSetTeamsIds,
	useGetTeamsShortData,
} from "../../hooks/teamsTransfer";

import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";

const TransferList = ({
	isNotInList,
	handleIntersection,
	handleInputSearch,
}) => {
	const [checked, setChecked] = useState([]);
	const [leftList, setLeftList] = useState([]);
	const [rightList, setRightList] = useState([]);
	const [disabledIds, setDisabledIds] = useState([]);

	const [visibleList, setVisibleList] = useState([]);
	const [searchTimeOut, setSearchTimeOut] = useState(null);

	const searchValue = useSelector(getSearchQuery);
	const outChampId = useSelector(getOutChampId);

	// Get short teams data
	useGetTeamsShortData(
		setLeftList,
		setRightList,
		setDisabledIds,
		setVisibleList
	);

	// Set teams ids for transfer
	useSetTeamsIds(rightList, disabledIds);

	const leftListChecked = handleIntersection(checked, leftList);
	const rightListChecked = handleIntersection(checked, rightList);

	const handleToggle = (value, isDisabled) => () => {
		if (isDisabled) return;

		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleCheckedRight = () => {
		setRightList(rightList.concat(leftListChecked));
		setLeftList(isNotInList(leftList, leftListChecked));
		setChecked(isNotInList(checked, leftListChecked));
		setVisibleList(isNotInList(visibleList, leftListChecked));
	};

	const handleCheckedLeft = () => {
		setLeftList(leftList.concat(rightListChecked));
		setRightList(isNotInList(rightList, rightListChecked));
		setChecked(isNotInList(checked, rightListChecked));
		// Settings visible names in the left list
		const regex = new RegExp(`^${searchValue}`, "i");
		const filterRes = leftList
			.concat(rightListChecked)
			.filter((team) => regex.test(team.teamName));
		setVisibleList(filterRes);
	};

	// Handler for teams name search input
	const handleSearch = (e) => {
		handleInputSearch(
			e,
			leftList,
			searchTimeOut,
			setSearchTimeOut,
			setVisibleList
		);
	};

	return (
		<Grid
			container
			spacing={2}
			justifyContent="start"
			alignItems="center"
			p={3}
			pt={1}
		>
			<Grid item>
				{TeamList(
					searchValue?.length === 0 ? leftList : visibleList,
					checked,
					TRANSFER_TYPE.OUT,
					disabledIds,
					handleToggle,
					handleSearch,
					outChampId
				)}
			</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedRight}
						disabled={leftListChecked.length === 0}
					>
						&gt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedLeft}
						disabled={rightListChecked.length === 0}
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>
				{TeamList(
					rightList,
					checked,
					TRANSFER_TYPE.TARGET,
					disabledIds,
					handleToggle
				)}
			</Grid>
		</Grid>
	);
};

TransferList.propTypes = {
	isNotInList: PropTypes.func.isRequired,
	handleIntersection: PropTypes.func.isRequired,
	handleInputSearch: PropTypes.func.isRequired,
};

export default TransferList;
