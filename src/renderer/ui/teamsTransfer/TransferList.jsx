import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Grid, Button } from "@mui/material";

import TeamList from "./TeamsList.jsx";

import {
	getLeftChampId,
	getRightChampId,
	getLeftSearchQuery,
	getRightSearchQuery,
} from "../../redux/teamTransfer/teamTransferSelector.js";

import { setTeamsIdList } from "../../redux/teamTransfer/teamTransferSlice.js";

import { useGetTeamsShortData } from "../../hooks/teamsTransfer";

import { TRANSFER_TYPE } from "../../constants/teamsTransferConstants.js";

const TransferList = ({
	isNotInList,
	handleIntersection,
	handleInputSearch,
}) => {
	const [checked, setChecked] = useState([]);
	const [leftList, setLeftList] = useState([]);
	const [rightList, setRightList] = useState([]);
	const [leftVisibleList, setLeftVisibleList] = useState([]);
	const [rightVisibleList, setRightVisibleList] = useState([]);
	const [searchTimeOut, setSearchTimeOut] = useState(null);

	const leftSearchValue = useSelector(getLeftSearchQuery);
	const rightSearchValue = useSelector(getRightSearchQuery);
	const leftChampId = useSelector(getLeftChampId);
	const rightChampId = useSelector(getRightChampId);
	const dispatch = useDispatch();

	// Get short teams data
	useGetTeamsShortData(
		setLeftList,
		setRightList,
		setLeftVisibleList,
		setRightVisibleList
	);

	// Set teams ids for transfer
	useEffect(() => {
		const leftIdsList = leftList.map((team) => team.teamId);
		const rightIdsList = rightList.map((team) => team.teamId);

		dispatch(
			setTeamsIdList({
				key: TRANSFER_TYPE.LEFT_LIST_IDS,
				idsArray: leftIdsList,
			})
		);
		dispatch(
			setTeamsIdList({
				key: TRANSFER_TYPE.RIGHT_LIST_IDS,
				idsArray: rightIdsList,
			})
		);
	}, [leftList, rightList]);

	const leftListChecked = handleIntersection(checked, leftList);
	const rightListChecked = handleIntersection(checked, rightList);

	const handleToggle = (value) => () => {
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
		const mergedList = rightList.concat(leftListChecked);
		setRightList(mergedList);
		setLeftList(isNotInList(leftList, leftListChecked));
		setChecked(isNotInList(checked, leftListChecked));
		setLeftVisibleList(isNotInList(leftVisibleList, leftListChecked));

		// Settings visible names in the left list
		const regex = new RegExp(`^${rightSearchValue}`, "i");
		const filterRes = mergedList.filter((team) => regex.test(team.teamName));

		setRightVisibleList(filterRes);
	};

	const handleCheckedLeft = () => {
		const mergedList = leftList.concat(rightListChecked);
		setLeftList(mergedList);
		setRightList(isNotInList(rightList, rightListChecked));
		setChecked(isNotInList(checked, rightListChecked));
		setRightVisibleList(isNotInList(rightVisibleList, rightListChecked));

		// Settings visible names in the left list
		const regex = new RegExp(`^${leftSearchValue}`, "i");
		const filterRes = mergedList.filter((team) => regex.test(team.teamName));

		setLeftVisibleList(filterRes);
	};

	// Handler for teams name search input
	const handleSearch = (e, searchSide) => {
		handleInputSearch(
			e,
			searchSide,
			leftList,
			rightList,
			searchTimeOut,
			setSearchTimeOut,
			setLeftVisibleList,
			setRightVisibleList
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
					leftSearchValue?.length === 0 ? leftList : leftVisibleList,
					checked,
					TRANSFER_TYPE.LEFT,
					handleToggle,
					handleSearch,
					leftChampId
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
					rightSearchValue?.length === 0 ? rightList : rightVisibleList,
					checked,
					TRANSFER_TYPE.RIGHT,
					handleToggle,
					handleSearch,
					rightChampId
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
