import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTransferType } from "../../redux/teamTransfer/teamTransferSlice.js";
import {
	getTransferType,
	getLeftChampId,
	getRightChampId,
} from "../../redux/teamTransfer/teamTransferSelector.js";

import {
	Box,
	Typography,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
} from "@mui/material";

import { TRANSFER_TYPE, TEXT } from "../../constants/teamsTransferConstants.js";

const TransferTypeSelect = () => {
	const transferType = useSelector(getTransferType);
	const leftChampId = useSelector(getLeftChampId);
	const rightChampId = useSelector(getRightChampId);

	const dispatch = useDispatch();

	const handleChange = (event) => {
		dispatch(setTransferType(event.target.value));
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>
				{TEXT.TRANSFER_TYPE_TITLE}
			</Typography>
			<FormControl>
				<RadioGroup row value={transferType} onChange={handleChange}>
					<FormControlLabel
						value={TRANSFER_TYPE.VALUE_FULL}
						control={<Radio />}
						label={TEXT.TRANSFER_TYPE_FULL}
						disabled={!leftChampId || !rightChampId}
					/>
					<FormControlLabel
						value={TRANSFER_TYPE.VALUE_CUSTOM}
						control={<Radio />}
						label={TEXT.TRANSFER_TYPE_CUSTOM}
						disabled={!leftChampId || !rightChampId}
					/>
				</RadioGroup>
			</FormControl>
		</Box>
	);
};

export default TransferTypeSelect;
