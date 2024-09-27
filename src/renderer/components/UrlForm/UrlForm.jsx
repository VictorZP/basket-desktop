import React, { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, TextField, Button } from "@mui/material";

import FileModal from "../FileModal";
import { AddFileForm } from "../../ui/addGamesPage";

import { handleFileModalOpen } from "../../redux/modal/modalSlice.js";
import { handleUrlAdded } from "../../redux/urlForm/urlFormSlice.js";
import { getIsUrlFormOpen } from "../../redux/urlForm/urlFormSelector.js";

import { styles } from "./styles.js";
import { TEXT } from "./text.js";
import {
	handleHalvesFile,
	handleManualHalvesFile,
	handleManualTempFile,
	createWarnDetailsFile,
} from "../../helpers/functions/addMatches";

import { CHANNELS } from "../../../common/constants/channels.js";
import { CONSTANTS } from "../../constants/matchesPage.js";
import { STATUS } from "../../constants";

const UrlForm = forwardRef(({ dateObj }, ref) => {
	const [urlList, setUrlList] = useState([]);
	const [fileCommon, setFileCommon] = useState(null);
	const [fileUsa, setFileUsa] = useState(null);
	const [tempFile, setTempFile] = useState(null);

	const isShown = useSelector(getIsUrlFormOpen);
	const dispatch = useDispatch();

	const onUrlAdd = (e) => {
		const value = e?.target?.value;
		setUrlList(value);
	};

	const clearUrlList = () => {
		setUrlList([]);
	};

	const onFileAdd = (file, id) => {
		switch (id) {
			case TEXT.ID.FILE_COMMON:
				setFileCommon(file);
				break;
			case TEXT.ID.FILE_USA:
				setFileUsa(file);
				break;
			case TEXT.ID.TEMP:
				setTempFile(file);
				break;
			default:
				break;
		}
	};

	const submitData = async () => {
		try {
			dispatch(handleFileModalOpen(true));
			const fileData = await handleHalvesFile();

			if (fileData?.status === STATUS.ERROR) {
				enqueueSnackbar(fileData?.message, {
					variant: "error",
				});
				dispatch(handleFileModalOpen(false));
				return;
			}

			let requestFileData;
			let tempFileData;
			//  If there are no files, then we need to handle them manually
			//  This could be the case when the microsoft graph api is not available or the files are not found
			if (Object.keys(fileData?.data)?.length === 0) {
				console.log("here in the if statement");
				const commonFileData = await handleManualHalvesFile(fileCommon);
				const usaFileData = await handleManualHalvesFile(fileUsa);

				tempFileData = await handleManualTempFile(tempFile);

				if (
					fileData?.status === STATUS.ERROR ||
					usaFileData?.status === STATUS.ERROR
				) {
					enqueueSnackbar(fileData?.message, {
						variant: "error",
					});
					dispatch(handleFileModalOpen(false));
					return;
				}

				if (tempFileData?.status === STATUS.ERROR) {
					enqueueSnackbar(tempFileData?.message, {
						variant: "error",
					});
					dispatch(handleFileModalOpen(false));
					return;
				}

				requestFileData = {
					...commonFileData?.data,
					...usaFileData?.data,
				};
			} else {
				requestFileData = {
					...fileData?.data,
				};
			}

			const urlArray = urlList
				.split("\n")
				?.filter((string) => string?.length > 0);
			const reqData = {
				urlArray,
				fileData: requestFileData,
				tempFileData,
				dateObj,
			};

			//  Add matches and get response about the results of adding
			const addUrlResponse = await ipcRenderer.invoke(
				CHANNELS.ANALYZE.ADD_URL,
				reqData
			);

			dispatch(handleFileModalOpen(false));

			if (addUrlResponse?.statusText !== "OK") {
				enqueueSnackbar(addUrlResponse?.message ?? TEXT.ERROR.ON_URL_ADD, {
					variant: "error",
				});
				return;
			}

			const { status, unsuccessfulData } = addUrlResponse;

			if (status !== "ok") {
				enqueueSnackbar(
					status === "warning" ? TEXT.WARNING.WARN : TEXT.WARNING.ERR,
					{
						variant: status === "warning" ? "warning" : "error",
					}
				);
				if (status === "warning") dispatch(handleUrlAdded(true));

				await createWarnDetailsFile(unsuccessfulData);
				return;
			}

			enqueueSnackbar(CONSTANTS.SUCCESS_MSG.MATCHES, {
				variant: "success",
			});

			dispatch(handleUrlAdded(true));
		} catch (err) {
			dispatch(handleFileModalOpen(false));

			enqueueSnackbar(err?.message ?? TEXT.ERROR.ON_SUBMIT_DATA, {
				variant: "error",
			});
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
					<Box display="flex" flexDirection="column" alignItems="center">
						<AddFileForm
							text={TEXT}
							fileCommon={fileCommon}
							fileUsa={fileUsa}
							tempFile={tempFile}
							onFileAdd={onFileAdd}
						/>
						<Button disabled={urlList?.length === 0} onClick={submitData}>
							{TEXT.BTN_SET_MATCHES}
						</Button>
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
			<FileModal />
		</Box>
	);
});

export default UrlForm;
