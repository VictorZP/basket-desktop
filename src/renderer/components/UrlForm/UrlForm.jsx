import React, { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, TextField, Button } from "@mui/material";
import { MuiFileInput } from "mui-file-input";

import FileModal from "../FileModal";

import { handleFileModalOpen } from "../../redux/modal/modalSlice.js";
import { handleUrlAdded } from "../../redux/urlForm/urlFormSlice.js";
import { getIsUrlFormOpen } from "../../redux/urlForm/urlFormSelector.js";

import { styles } from "./styles.js";
import { TEXT } from "./text.js";
import {
	handleHalvesFile,
	handleTempFile,
} from "../../helpers/functions/addMatches";
import { createWarnDetailsFile } from "../../helpers/functions/addMatches/createWarnDetailsFile.js";

import { CHANNELS } from "../../../common/constants/channels.js";
import { CONSTANTS } from "../../constants/matchesPage.js";
import { STATUS } from "../../constants";

const UrlForm = forwardRef(({ dateObj }, ref) => {
	const [urlList, setUrlList] = useState([]);
	const [file, setFile] = useState(null);
	const [tempFile, setTempFile] = useState(null);

	const isShown = useSelector(getIsUrlFormOpen);
	const dispatch = useDispatch();

	const onUrlAdd = (e) => {
		const value = e?.target?.value;
		setUrlList(value);
	};

	const onFileAdd = (file, id) => {
		switch (id) {
			case TEXT.ID.FILE:
				setFile(file);
				break;
			case TEXT.ID.TEMP:
				setTempFile(file);
				break;
			default:
				break;
		}
	};

	const isBtnDisabled = () => {
		if (
			(urlList?.length === 0 && !file?.name) ||
			(urlList?.length !== 0 && !file?.name) ||
			(urlList?.length === 0 && file?.name)
		) {
			return true;
		}
	};

	const clearUrlList = () => {
		setUrlList([]);
	};

	const submitData = async () => {
		try {
			dispatch(handleFileModalOpen(true));
			//  Files handlers
			const fileData = await handleHalvesFile(file);
			const tempFileData = await handleTempFile(tempFile);

			if (fileData?.status === STATUS.ERROR) {
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

			const urlArray = urlList
				.split("\n")
				?.filter((string) => string?.length > 0);
			const reqData = {
				urlArray,
				fileData: fileData?.data,
				tempFileData: tempFileData?.data,
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
					<Box>
						<MuiFileInput
							id={TEXT.ID.FILE}
							placeholder={TEXT.PLACEHOLDER_FILE}
							value={file}
							onChange={(file) => onFileAdd(file, TEXT.ID.FILE)}
							size="small"
							sx={styles.fileInput}
						/>
						<MuiFileInput
							id={TEXT.ID.TEMP}
							placeholder={TEXT.TEMP_FILE_PLACEHOLDER}
							value={tempFile}
							onChange={(file) => onFileAdd(file, TEXT.ID.TEMP)}
							size="small"
							sx={styles.fileInput}
						/>

						<Button
							disabled={isBtnDisabled(urlList, file)}
							onClick={submitData}
						>
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
