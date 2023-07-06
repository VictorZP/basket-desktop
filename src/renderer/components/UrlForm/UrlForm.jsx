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

import { TEXT } from "./text.js";
import { handleFile } from "./functions.js";
import { CHANNELS } from "../../../common/constants/channels.js";

const UrlForm = forwardRef((props, ref) => {
	const [urlList, setUrlList] = useState([]);
	const [file, setFile] = useState(null);

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
			};
			ipcRenderer.send(CHANNELS.ANALYZE.ADD_URL, reqData);
			dispatch(handleFileModalOpen(false));
		} catch (error) {
			enqueueSnackbar(error?.message ?? TEXT.ERROR.ON_SUBMIT_DATA, {
				variant: "error",
			});
		}
	};

	useEffect(() => {
		ipcRenderer.on(CHANNELS.ANALYZE.ADD_URL, (event, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(arg?.message ?? TEXT.ERROR.ON_URL_ADD, {
					variant: "error",
				});
				return;
			}
			enqueueSnackbar(arg?.message ?? TEXT.SUCCESS, {
				variant: "success",
			});
			dispatch(handleUrlAdded(true));
		});

		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	return (
		<Box sx={{ mt: 2, display: !isShown ? "none" : "inline-block" }} ref={ref}>
			<Box sx={{ display: "flex", width: "968px" }}>
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
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						ml: 2,
					}}
				>
					<Box>
						<MuiFileInput
							id="excelLoadFile"
							placeholder={TEXT.PLACEHOLDER_FILE}
							value={file}
							onChange={onFileAdd}
							size="small"
							sx={{ mb: 1, width: "280px" }}
						/>
						<Button
							disabled={isBtnDisabled(urlList, file)}
							onClick={submitData}
						>
							{TEXT.BTN_SET_MATCHES}
						</Button>
					</Box>
					<Button
						sx={{ alignSelf: "start" }}
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
