import React, { useState, useEffect, useMemo } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Button, Typography, TablePagination } from "@mui/material";

import StatsDataTable from "../../components/MatchesStatsWindow/StatsDataTable/DataTable";
import LoadingSpinner from "../../components/LoadingSpinner";

import { CHANNELS } from "../../../common/constants";
import { MATCHES_STATS_TEXT } from "../../constants";

const MainPage = () => {
	const [dateValue, setDateValue] = useState(dayjs());
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [dataList, setDataList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [needToUpdate, setNeedToUpdate] = useState(false);

	useEffect(() => {
		const getMatchesStats = async () => {
			setIsLoading(true);
			try {
				const paramsObj = {
					day: dayjs(dateValue).format("DD"),
					month: dayjs(dateValue).format("MM"),
					year: dayjs(dateValue).format("YY"),
				};
				const response = await ipcRenderer.invoke(
					CHANNELS.MATCHES_STATS.GET_MATCHES_DATA,
					paramsObj
				);

				if (response?.status !== 200) {
					enqueueSnackbar(MATCHES_STATS_TEXT.ERROR, {
						variant: "error",
					});
					return;
				}

				setDataList(response?.data ?? []);
			} catch (err) {
				enqueueSnackbar(err?.message ?? MATCHES_STATS_TEXT.ERROR, {
					variant: "error",
				});
			} finally {
				setIsLoading(false);
			}
		};

		getMatchesStats();
	}, [dateValue, needToUpdate]);

	const visibleRows = useMemo(
		() => dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[dataList, page, rowsPerPage]
	);
	const countNumber = 1 + page * rowsPerPage;

	const handlePageChange = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleDateChange = async (e) => {
		setDateValue(e);
	};

	return (
		<Box
			component="section"
			display="flex"
			flexDirection="column"
			sx={{ px: 3, py: 1, gap: 2 }}
		>
			<Typography variant="h5" px={2}>
				{MATCHES_STATS_TEXT.TITLE}
			</Typography>

			<Box display="flex" gap={4}>
				<DatePicker
					label="Дата матчей"
					slotProps={{
						actionBar: {
							actions: ["today"],
						},
					}}
					value={dateValue}
					onChange={handleDateChange}
				/>
				<Button onClick={() => setNeedToUpdate((state) => !state)}>
					Обновить
				</Button>
			</Box>

			{isLoading && <LoadingSpinner height={"calc(100vh - 200px)"} />}

			{visibleRows.length > 0 && !isLoading && (
				<>
					<StatsDataTable data={visibleRows} countNumber={countNumber} />
					<TablePagination
						rowsPerPageOptions={[25, 50, 100]}
						component="div"
						count={dataList?.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handlePageChange}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage="Строк"
					/>
				</>
			)}
		</Box>
	);
};

export default MainPage;
