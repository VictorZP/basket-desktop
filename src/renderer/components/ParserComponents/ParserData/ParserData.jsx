import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import "./styles.css";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TablePagination } from "@mui/material";

import ParserDataTable from "../ParserDataTable";

import { useGetParcerData } from "../../../hooks/parcerData";
import {} from "../../../redux/parcerData/parcerDataSlice.js";
import {} from "../../../redux/parcerData/parcerDataSelector.js";

import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

const ParserData = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [dataList, setDataList] = useState([]);

	useGetParcerData(setDataList);

	const visibleRows = useMemo(
		() => dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[dataList, page, rowsPerPage]
	);

	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const tableProps = {
		page,
		rowsPerPage,
		dataList: visibleRows,
	};

	return (
		<Box sx={{ px: 3, py: 1, mb: 2 }}>
			<Typography variant="h5" sx={{ mb: 2 }}>
				{TEXT.TITLE}
			</Typography>
			<div className="pdt-container pdt-container__radius">
				<div className="pdt-container__inner ">
					<ParserDataTable {...tableProps} />
					<TablePagination
						sx={{ border: "1px solid #e0e0e0" }}
						rowsPerPageOptions={[10, 15, 20]}
						component="div"
						count={dataList?.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handlePageChange}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage={"Результатов на странице"}
					/>
				</div>
			</div>
		</Box>
	);
};

export default ParserData;
