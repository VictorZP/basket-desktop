import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const { shell } = window.require("electron");

import {
	Typography,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	Paper,
	TableContainer,
	IconButton,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

import { StyledTableRow } from "../../../../helpers/reusableComponents/tableComponents.js";

const DataTable = ({ data = [], countNumber }) => {
	const handleBetStatus = (status) => {
		switch (status) {
			case "less":
				return "UNDER";
			case "more":
				return "OVER";
			case "not":
				return "NO BET";
			default:
				return "-";
		}
	};
	const openBrowser = (url) => {
		shell.openExternal(url);
	};

	const calculateFromFirmVal = (tim, hs, aw) => {
		if (tim === 0 || hs === 0 || aw === 0) return "-";
		const res = tim - hs - aw;
		return isNaN(res) ? 0 : res;
	};

	const roundToTenth = (value) => {
		const res = Math.round(value * 10) / 10;
		return isNaN(res) ? 0 : res;
	};

	const calculateSecondHalfReserve = (t2h, tim, hs, aw) => {
		if (t2h === 0 || tim === 0 || hs === 0 || aw === 0) return "-";

		const firmVal = calculateFromFirmVal(tim, hs, aw);
		const res = t2h //- firmVal;
		return isNaN(res) ? 0 : roundToTenth(res);
	};

	return (
		<Paper
			sx={{
				width: "100%",
				overflow: "hidden",
			}}
		>
			<TableContainer sx={{ maxHeight: 700 }}>
				<Table stickyHeader>
					<TableHead
						sx={{
							"& th": {
								backgroundColor: "#3f51b5 !important",
								color: "white",
								fontSize: 12,
							},
						}}
					>
						<TableRow>
							<TableCell sx={{ color: "white" }}></TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Начало перерыва
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Чемпионат
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Хозяева
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Гости
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Отклонения
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								KickOff
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Total In Moment
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Temp
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Calc Temp
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Контора
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Total Second Half
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Запас
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Счет хозяев
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Счет гостей
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Статус
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Без Бетс
							</TableCell>
							<TableCell sx={{ color: "white" }} align="center">
								Ссылка
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody
						sx={{
							borderLeft: "1px solid #e0e0e0",
							borderRight: "1px solid #e0e0e0",
						}}
					>
						{data?.map((match, index) => (
							<StyledTableRow key={match.matchId}>
								<TableCell>{index + countNumber}</TableCell>
								<TableCell align="center">
									{dayjs
										.unix(Number(match.breakStart))
										.format("DD.MM.YY HH:mm:ss") || 0}
								</TableCell>
								<TableCell align="center" sx={{ width: 150 }}>
									{match?.homeTeam?.teamChamp?.name ?? ""}
								</TableCell>
								<TableCell align="center" sx={{ width: 150 }}>
									{match?.homeTeam?.teamName ?? ""}
								</TableCell>
								<TableCell align="center" sx={{ width: 150 }}>
									{match?.awayTeam?.teamName ?? ""}
								</TableCell>
								<TableCell align="center">{match?.deviation || 0}</TableCell>
								<TableCell align="center">{match?.kickOff || 0}</TableCell>
								<TableCell align="center">
									{match?.totalInMoment || 0}
								</TableCell>
								<TableCell align="center">{match?.temp || 0}</TableCell>
								<TableCell align="center">{match?.calcTemp || 0}</TableCell>
								<TableCell align="center">
									{calculateFromFirmVal(
										match?.totalInMoment,
										match?.homeScore,
										match?.awayScore
									)}
								</TableCell>
								<TableCell align="center">
									{roundToTenth(match?.totalSecondHalf)}
								</TableCell>
								<TableCell align="center">
									{calculateSecondHalfReserve(
										match?.totalSecondHalf,
										match?.totalInMoment,
										match?.homeScore,
										match?.awayScore
									)}
								</TableCell>
								<TableCell align="center">{match?.homeScore || 0}</TableCell>
								<TableCell align="center">{match?.awayScore || 0}</TableCell>
								<TableCell align="center" sx={{ width: 100 }}>
									{handleBetStatus(match?.difRes)}
								</TableCell>
								<TableCell align="center">
									{match?.noBets ? "Да" : " Нет"}
								</TableCell>
								<TableCell align="center">
									<Typography variant="span" width={50}>
										<IconButton
											color="primary"
											onClick={() => openBrowser(match?.url)}
										>
											<LanguageIcon />
										</IconButton>
									</Typography>
								</TableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

DataTable.propTypes = {
	data: PropTypes.array.isRequired,
	countNumber: PropTypes.number.isRequired,
};

export default DataTable;
