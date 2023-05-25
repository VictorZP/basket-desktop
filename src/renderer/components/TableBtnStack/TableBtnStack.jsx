import React from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

import { TOOLTIPS } from "../../../common/constants/index.js";

const TableBtnStack = ({
	editBtnName,
	delBtnName,
	onEdit,
	onDelete,
	btnId,
}) => {
	return (
		<Stack
			direction="row"
			spacing={2}
			justifyContent="center"
			alignItems="center"
		>
			<Tooltip title={TOOLTIPS.T_BTN_STACK_EDIT} placement="left">
				<IconButton
					size="small"
					onClick={onEdit}
					color="warning"
					name={editBtnName}
					id={`edit_${btnId}`}
				>
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title={TOOLTIPS.T_BTN_STACK_DEL} placement="right">
				<IconButton
					size="small"
					onClick={onDelete}
					color="error"
					name={delBtnName}
					id={`del_${btnId}`}
				>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

TableBtnStack.propTypes = {
	editBtnName: PropTypes.string.isRequired,
	delBtnName: PropTypes.string.isRequired,
	btnId: PropTypes.string.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default TableBtnStack;
