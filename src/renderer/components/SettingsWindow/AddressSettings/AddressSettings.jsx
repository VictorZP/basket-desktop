import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Box, Typography } from "@mui/material";

const ipcRenderer = window.require("electron").ipcRenderer;

import { InputComponent } from "../../../ui/settingsPage";

import { CHANNELS } from "../../../../common/constants/channels.js";
import { SETTINGS_TEXT } from "../../../constants";

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
			<InputComponent
				label={SETTINGS_TEXT.VPS_ADDRESS}
				inputValue={address}
				id={"someId"}
				handleInputValueChange={handleChange}
				handleBtnClick={handleSubmit}
			/>
			<Typography component="span" fontSize={14}>
				{SETTINGS_TEXT.WARNING}
			</Typography>
		</Box>
	);
};

export default AddressSettings;
