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
import { handleFile } from "./functions.js";
import { CHANNELS } from "../../../common/constants/channels.js";

const UrlForm = forwardRef(({ dateObj }, ref) => {
	const [urlList, setUrlList] = useState([]);
	const [file, setFile] = useState(null);
	const [isAdd, setIsAdd] = useState(false);

	const isShown = useSelector(getIsUrlFormOpen);
	const dispatch = useDispatch();

	const onUrlAdd = (e) => {
		const value = e?.target?.value;
		setUrlList(value);
	};

	const onFileAdd = (newFile) => {
		setFile(newFile);
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
			const fileData = await handleFile(file);
			const urlArray = urlList
				.split("\n")
				?.filter((string) => string?.length > 0);
			const reqData = {
				urlArray,
				fileData,
				dateObj,
			};
			setIsAdd(true);
			ipcRenderer.send(CHANNELS.ANALYZE.ADD_URL, reqData);
		} catch (error) {
			enqueueSnackbar(error?.message ?? TEXT.ERROR.ON_SUBMIT_DATA, {
				variant: "error",
			});
		}
	};

	useEffect(() => {
		if (isAdd) {
			ipcRenderer.once(CHANNELS.ANALYZE.ADD_URL, (event, arg) => {
				if (arg?.statusText !== "OK") {
					enqueueSnackbar(arg?.message ?? TEXT.ERROR.ON_URL_ADD, {
						variant: "error",
					});
					dispatch(handleFileModalOpen(false));
					return;
				}
				enqueueSnackbar(arg?.message ?? TEXT.SUCCESS, {
					variant: "success",
				});
				dispatch(handleFileModalOpen(false));
				dispatch(handleUrlAdded(true));
				setIsAdd(false);
			});
		}
	}, [isAdd]);

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
							id="excelLoadFile"
							placeholder={TEXT.PLACEHOLDER_FILE}
							value={file}
							onChange={onFileAdd}
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
