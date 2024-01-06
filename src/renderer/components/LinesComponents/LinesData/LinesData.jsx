import React, { useState, useMemo } from "react";

import { Box, Typography, TablePagination, IconButton } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

import LinesDataTable from "../LinesDataTable";

import "./styles.css";
import { TEXT } from "./text.js";

const LinesData = () => {
	return (
		<>
			<Box sx={{ px: 3, py: 1, mb: 2 }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						mb: 2,
						gap: 2,
					}}
				>
					<Typography variant="h5">{TEXT.TITLE}</Typography>
					<IconButton
						size="small"
						color="primary"
						// onClick={() => {
						// 	dispatch(handleClickRequest(true));
						// }}
					>
						<SyncIcon />
					</IconButton>
				</Box>
				<div className="ldt-container ldt-container__radius">
					<div className="pdt-container__inner">
						<LinesDataTable />
					</div>
				</div>
			</Box>
		</>
	);
};

export default LinesData;
