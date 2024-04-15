import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box, Typography, TextField, Button, FormControl } from "@mui/material";

import { CHANNELS } from "../../../../common/constants/channels.js";
import { SETTINGS_TEXT } from "../../../constants/settingsWindow.js";

const AddressSettings = () => {
	const [address, setAddress] = useState("");

	useEffect(() => {
		ipcRenderer.invoke(CHANNELS.SETTINGS.GET_ADDRESS).then((res) => {
			if (res?.status === "error") {
				enqueueSnackbar(res.message, { variant: "error" });
			}
			setAddress(res?.address);
		});
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setAddress(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await ipcRenderer.invoke(CHANNELS.SETTINGS.SET_ADDRESS, address);
	};

	return (
		<Box px={2}>
			<Typography variant="h6" mb={1}>
				{SETTINGS_TEXT.VPS_TITLE}
			</Typography>
			<Box
				component={"form"}
				display="flex"
				alignItems="center"
				gap={2}
				onSubmit={handleSubmit}
			>
				<Typography component="span">{SETTINGS_TEXT.VPS_ADDRESS}</Typography>
				<FormControl>
					<TextField
						variant="outlined"
						size="small"
						value={address}
						onChange={handleChange}
					/>
				</FormControl>

				<Button variant="contained" color="primary" size="small" type="submit">
					{SETTINGS_TEXT.SET_BTN}
				</Button>
			</Box>
			<Typography component="span" fontSize={14}>
				{SETTINGS_TEXT.WARNING}
			</Typography>
		</Box>
	);
};

export default AddressSettings;
