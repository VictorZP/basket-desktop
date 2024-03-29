import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { Box, Typography, TextField } from "@mui/material";

import SaveBtn from "../../ui/SaveBtn.jsx";
import IconBtn from "../../ui/iconBtn.jsx";

const ipcRenderer = window.require("electron").ipcRenderer;

import {
	handleAddCyber,
	handleEditCyber,
	refreshCyberData,
} from "../../redux/matchSettings/matchSettingsSlice.js";
import {
	getCyberEditStatus,
	getCyberData,
} from "../../redux/matchSettings/matchSettingSelector.js";

import { MATCHES_SETTINGS } from "../../../common/constants/index.js";
import { CHANNELS } from "../../../common/constants/channels.js";

const MSCyberForm = () => {
	const onEdit = useSelector(getCyberEditStatus);
	const cyberData = useSelector(getCyberData);

	const [cyberName, setCyberName] = useState(onEdit ? cyberData.cyberName : "");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
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
		};
		const updateData = {
			id: cyberData?.cyberId ?? "",
			newName: cyberName,
		};

		if (onEdit) {
			ipcRenderer.send(CHANNELS.CYBER.EDIT_CYBER, updateData);
		} else {
			ipcRenderer.send(CHANNELS.CYBER.ADD_CYBER, reqData);
		}
	};

	useEffect(() => {
		ipcRenderer.on(CHANNELS.CYBER.ADD_CYBER, (event, arg) => {
			if (arg?.statusCode === 409) {
				enqueueSnackbar(arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.EXIST, {
					variant: "warning",
				});
				setLoading(false);
				return;
			} else if (arg?.statusCode !== 201 && arg?.statusText !== "Created") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				setLoading(false);
				return;
			}

			dispatch(handleAddCyber(true));

			enqueueSnackbar(CYBER_FORM.MS_ADD, { variant: "success" });
			setCyberName("");
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		ipcRenderer.on(CHANNELS.CYBER.EDIT_CYBER, (event, arg) => {
			if (arg?.statusCode === 409) {
				enqueueSnackbar(arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.EXIST, {
					variant: "warning",
				});
				setLoading(false);
				return;
			} else if (arg?.statusCode !== 201 && arg?.statusText !== "Created") {
				enqueueSnackbar(
					arg?.message ?? MATCHES_SETTINGS.ERR_MESSAGES.ON_ERROR,
					{
						variant: "error",
					}
				);
				setLoading(false);
				return;
			}

			dispatch(handleAddCyber(true));
			dispatch(handleEditCyber(false));
			dispatch(refreshCyberData());

			enqueueSnackbar(arg?.message ?? CYBER_FORM.MS_UPD, {
				variant: "success",
			});
			setCyberName("");
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (onEdit) {
			setCyberName(cyberData.cyberName);
		}
	}, [onEdit, cyberData.cyberName]);

	const onClearBtn = () => {
		setCyberName("");
		if (onEdit) {
			dispatch(handleEditCyber(false));
			dispatch(refreshCyberData());
		}
	};

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
				<SaveBtn isDisabled={!cyberName} isLoading={loading} onEdit={onEdit} />
				<IconBtn onClearBtn={onClearBtn} isDisabled={!cyberName} />
			</Box>
		</Box>
	);
};

export default MSCyberForm;
