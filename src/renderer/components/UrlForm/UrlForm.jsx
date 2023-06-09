import React, { useState, forwardRef } from "react";
import { useSelector } from "react-redux";

import { Box, TextField, Button } from "@mui/material";
import { MuiFileInput } from "mui-file-input";

import { getIsUrlFormOpen } from "../../redux/urlForm/urlFormSelector.js";

import { TEXT } from "./text.js";
import { handleFile } from "./functions.js";

const UrlForm = forwardRef((props, ref) => {
	const [urlList, setUrlList] = useState([]);
	const [file, setFile] = useState(null);

	const isShown = useSelector(getIsUrlFormOpen);

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
			const fileData = await handleFile(file);
			console.log("🚀 ~ fileData:", fileData);
		} catch (error) {
			console.log("🚀 ~ error:", error);
		}
	};

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
							id="exelLoadFile"
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
		</Box>
	);
});

export default UrlForm;
