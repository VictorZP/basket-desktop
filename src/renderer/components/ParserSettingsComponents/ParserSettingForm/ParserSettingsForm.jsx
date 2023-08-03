import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TextField, Button } from "@mui/material";

import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

const ParserSettingForm = () => {
	const [urlList, setUrlList] = useState("");

	const handleInput = (e) => {
		setUrlList(e?.target?.value);
	};

	const clearUrlList = () => {
		setUrlList("");
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const urlArr = urlList.split("\n")?.filter((str) => str?.length > 0);
		const finalArr = [];

		urlArr?.forEach((el) => {
			let check = el?.replaceAll(",", " ")?.trim()?.split(" ");
			if (check.length > 1) {
				const afterCheck = check.filter((item) => {
					return item.length > 0;
				});
				check = afterCheck;
			}
			finalArr.push(...check);
		});

		if (finalArr?.length === 0) {
			enqueueSnackbar(TEXT.NOT_EMPTY, {
				variant: "warning",
				autoHideDuration: 3000,
			});
			return;
		}

		console.log(finalArr);
		ipcRenderer.send(CHANNELS.PARSER.ADD_URL, finalArr);
	};

	useEffect(() => {
		ipcRenderer.on(CHANNELS.PARSER.ADD_URL, (event, arg) => {
			if (arg?.statusText !== "Created") {
				enqueueSnackbar(arg?.message ?? TEXT.ERROR_URL_ADD, {
					variant: "error",
				});
				return;
			}
			enqueueSnackbar(arg?.message ?? TEXT.SUCCESS_ADD, {
				variant: "success",
			});
			clearUrlList();
		});
	}, []);

	useEffect(() => {
		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	return (
		<Box sx={{ px: 3, py: 1 }}>
			<Typography variant="h5">{TEXT.TITLE}</Typography>
			<Box
				sx={{ width: "968px", mt: 2, display: "flex" }}
				component="form"
				onSubmit={handleFormSubmit}
			>
				<TextField
					id="linksTextField"
					fullWidth
					multiline
					size="small"
					rows={10}
					value={urlList}
					onChange={handleInput}
				/>
				<Box sx={{ ml: 3, display: "flex", flexDirection: "column" }}>
					<Button type="submit" variant="outlined" sx={{ mb: 3 }}>
						{TEXT.BTN_ADD}
					</Button>
					<Button
						size="small"
						color="error"
						disabled={urlList?.length === 0}
						onClick={clearUrlList}
					>
						{TEXT.BTN_CLEAR}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
export default ParserSettingForm;
