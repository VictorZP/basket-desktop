import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import { getToken } from "../../redux/auth/authSelector.js";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

const MSCyberForm = () => {
	const [cyberName, setCyberName] = useState("");
	const [loading, setLoading] = useState(false);
	const token = useSelector(getToken);
	const { CYBER_FORM } = MATCHES_SETTINGS;

	const handleNameChange = (e) => {
		const value = e?.target?.value ?? "";
		setCyberName(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		const reqData = {
			cyberName,
			token,
		};
		ipcRenderer.send(CHANNELS.CYBER.ADD_CYBER, reqData);
	};

	useEffect(() => {
		ipcRenderer.on(CHANNELS.CYBER.ADD_CYBER, (event, arg) => {
			if (arg === MATCHES_SETTINGS.ERR_MESSAGES.EXIST) {
				enqueueSnackbar(MATCHES_SETTINGS.ERR_MESSAGES.EXIST, {
					variant: "warning",
				});
				setLoading(false);
				return;
			} else if (
				arg?.message === MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR ||
				arg?.error === "ReferenceError"
			) {
				enqueueSnackbar(arg?.message, {
					variant: "error",
				});
				setLoading(false);
				return;
			} else if (arg.error) {
				enqueueSnackbar(arg?.message, {
					variant: "error",
				});
				setLoading(false);
				return;
			}

			enqueueSnackbar(CYBER_FORM.MS_ADD, { variant: "success" });
			setCyberName("");
			setLoading(false);
		});

		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	return (
		<Box sx={{ width: "full", paddingX: 3 }}>
			<Typography variant="h5" sx={{ marginBottom: 1 }}>
				{CYBER_FORM.TITLE}
			</Typography>
			<Box
				component="form"
				sx={{
					paddingY: 1,
					display: "flex",
					alignItems: "center",
				}}
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<TextField
					required
					id="cyberName"
					label={CYBER_FORM.NAME_LABEL}
					value={cyberName}
					variant="outlined"
					size="small"
					onChange={handleNameChange}
					sx={{ mr: 2 }}
				/>
				<LoadingButton
					type="submit"
					loading={loading}
					variant="outlined"
					disabled={!cyberName}
				>
					{CYBER_FORM.BTN_ADD}
				</LoadingButton>
			</Box>
		</Box>
	);
};

export default MSCyberForm;
