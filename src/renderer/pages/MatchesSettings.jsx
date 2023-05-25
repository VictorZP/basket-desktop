import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ipcRenderer = window.require("electron").ipcRenderer;

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import MSCyberForm from "../components/MSCyberForm/MSCyberForm.jsx";
import MSCyberTable from "../components/MSCyberTable/MSCyberTable.jsx";

import { getToken } from "../redux/auth/authSelector.js";
import { MATCHES_SETTINGS } from "../../common/constants/index.js";
import { CHANNELS } from "../../common/constants/channels.js";

const MatchesSettings = () => {
	const [cyberList, setCyberList] = useState([]);

	const token = useSelector(getToken);

	useEffect(() => {
		ipcRenderer.send(CHANNELS.CYBER.GET_ALL_CYBER, { token });
		ipcRenderer.on(CHANNELS.CYBER.GET_ALL_CYBER, (event, arg) => {
			if (arg.error) {
				enqueueSnackbar(arg?.message, {
					variant: "warning",
				});
				return;
			}

			setCyberList(arg.list);
		});
		console.log("first");

		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	const cyberTableProps = {
		cyberList,
	};

	return (
		<Box component="section">
			<MSCyberForm />
			<MSCyberTable {...cyberTableProps} />
			<Divider sx={{ width: "100w" }} />
		</Box>
	);
};

export default MatchesSettings;
