import React, { useState, useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { getIsUrlFormOpen } from "../../../redux/urlForm/urlFormSelector.js";

import { createWarnDetailsFile } from "../../../helpers/functions/addMatches/createWarnDetailsFile.js";

import { styles } from "./styles.js";
import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";
import { MANUAL_PAGE } from "../../../constants/manualResultsPage.js";

const ManualPageUrlForm = forwardRef(({ dateValue, setGames }, ref) => {
	const [urlList, setUrlList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const isShown = useSelector(getIsUrlFormOpen);

	const onUrlAdd = (e) => {
		const value = e?.target?.value;
		setUrlList(value);
	};

	const clearUrlList = () => {
		setUrlList([]);
	};

	const submitData = async () => {
		try {
			setIsLoading(true);
			const urlArray = urlList
				.split("\n")
				?.filter((string) => string?.length > 0);
			const reqData = {
				date: dateValue.format("DD.MM.YY"),
				urlArray,
			};

			//	Добавление матчей и получение ответа о результатах добавления
			const submitRes = await ipcRenderer.invoke(
				CHANNELS.MANUAL_ADDING.ADD_MANUAL_URL,
				reqData
			);

			if (submitRes?.resStatusText !== "OK") {
				enqueueSnackbar(submitRes?.resMessage ?? TEXT.ERROR.ON_URL_ADD, {
					variant: "error",
				});
				return;
			}

			const { status, unsuccessfulData } = submitRes;

			if (status !== "ok") {
				enqueueSnackbar(
					status === "warning" ? TEXT.WARNING.WARN : TEXT.WARNING.ERR,
					{
						variant: status === "warning" ? "warning" : "error",
					}
				);
				await createWarnDetailsFile(unsuccessfulData);
			}

			if (status === "error") return;

			if (status === "ok") {
				enqueueSnackbar(submitRes?.message ?? MANUAL_PAGE.SUCCESS.SAVE, {
					variant: "success",
				});
			}

			const date = dateValue.format("DD.MM.YY").split(".");
			const paramsObj = {
				day: date[0],
				month: date[1],
				year: date[2],
			};

			const resData = await ipcRenderer.invoke(
				CHANNELS.MANUAL_ADDING.GET_MANUAL_LIST,
				paramsObj
			);

			if (resData.statusText !== "OK" && resData.statusText !== "No Content") {
				enqueueSnackbar(resData?.message ?? MANUAL_PAGE.ERROR.ON_GET_LIST, {
					variant: "error",
				});
				return;
			}
			setGames(resData.data);
			if (status === "ok") setUrlList([]);
		} catch (err) {
			enqueueSnackbar(err?.message ?? err, {
				variant: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	return (
		<Box sx={styles.mainBox(isShown)} ref={ref}>
			<Box sx={styles.formBox}>
				<TextField
					id="urlTextField"
					placeholder={TEXT.PLACEHOLDER_URL}
					fullWidth
					multiline
					size="small"
					rows={10}
					onChange={onUrlAdd}
					value={urlList}
				/>
				<Box sx={styles.formInnerBox}>
					<Box>
						<LoadingButton
							variant="outlined"
							size="small"
							loading={isLoading}
							onClick={submitData}
							disabled={urlList?.length === 0 || !dateValue}
						>
							{TEXT.BTN_SET_MATCHES}
						</LoadingButton>
					</Box>
					<Button
						sx={styles.button}
						size="small"
						color="error"
						disabled={urlList?.length === 0}
						onClick={clearUrlList}
					>
						{TEXT.CLEAR_LIST}
					</Button>
				</Box>
			</Box>
		</Box>
	);
});

export default ManualPageUrlForm;
