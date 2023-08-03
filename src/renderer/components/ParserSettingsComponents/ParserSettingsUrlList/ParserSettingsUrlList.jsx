import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

import { Box, Typography, TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const ipcRenderer = window.require("electron").ipcRenderer;

import { TEXT } from "./text.js";
import { CHANNELS } from "../../../../common/constants/channels.js";

const ParserSettingsUrlList = ({
	isOnUpd,
	isOnDelete,
	setIsOnUpd,
	openModalDel,
}) => {
	const [urlList, setUrlList] = useState("");
	const [loadingSave, setLoadingSave] = useState(false);

	const handleInput = (e) => {
		setUrlList(e?.target?.value);
	};

	const handleUpdBtn = () => {
		if (isOnUpd) ipcRenderer.send(CHANNELS.PARSER.GET_URL);
		setIsOnUpd(!isOnUpd);
	};

	const handleSave = () => {
		const urlArr = urlList.split("\n")?.filter((str) => str?.length > 0);
		const finalArr = [];

		urlArr?.forEach((el) => {
			let check = el
				?.replaceAll(",", " ")
				?.replaceAll(";", "")
				?.trim()
				?.split(" ");
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

		ipcRenderer.send(CHANNELS.PARSER.UPD_URL, finalArr);
		setLoadingSave(!loadingSave);
	};

	useEffect(() => {
		ipcRenderer.on(CHANNELS.PARSER.UPD_URL, (event, arg) => {
			if (arg?.statusText !== "Created") {
				enqueueSnackbar(arg?.message ?? TEXT.ERROR_URL_ADD, {
					variant: "error",
				});
				setLoadingSave(false);
				return;
			}
			ipcRenderer.send(CHANNELS.PARSER.GET_URL);

			enqueueSnackbar(arg?.message ?? TEXT.SUCCESS, {
				variant: "success",
			});

			setLoadingSave(false);
			setIsOnUpd(false);
		});
	}, []);

	useEffect(() => {
		ipcRenderer.send(CHANNELS.PARSER.GET_URL);
	}, []);

	useEffect(() => {
		ipcRenderer.on(CHANNELS.PARSER.GET_URL, (event, arg) => {
			if (arg?.statusText !== "OK") {
				enqueueSnackbar(arg?.message ?? TEXT.ERROR_URL_ADD, {
					variant: "error",
				});
				return;
			}
			setUrlList("");
			arg?.data?.list?.forEach((url) => {
				setUrlList((prevState) => prevState.concat(url, "\n"));
			});
		});
	}, []);

	useEffect(() => {
		return () => {
			ipcRenderer.removeAllListeners();
		};
	}, []);

	return (
		<Box sx={{ px: 3, py: 1, my: 2 }}>
			<Typography variant="h5">{TEXT.TITLE}</Typography>
			<Box sx={{ mt: 2, display: "flex" }}>
				<TextField
					id="linksViewField"
					sx={{ width: "768px" }}
					multiline
					size="small"
					rows={10}
					value={urlList}
					onChange={handleInput}
					InputProps={{
						readOnly: !isOnUpd,
					}}
				/>
				<Box sx={{ ml: 3, display: "flex", flexDirection: "column" }}>
					<Button
						type="button"
						variant="outlined"
						onClick={handleUpdBtn}
						disabled={urlList?.length === 0 && !isOnUpd}
						sx={{ mb: 3, width: "160px" }}
					>
						{isOnUpd ? TEXT.BTN_VIEW : TEXT.BTN_UPD}
					</Button>

					{isOnUpd ? (
						<>
							<LoadingButton
								type="button"
								variant="outlined"
								onClick={handleSave}
								disabled={isOnDelete}
								loading={loadingSave}
								startIcon={<SaveIcon />}
								sx={{ mb: 3, width: "160px" }}
							>
								{TEXT.BTN_SAVE}
							</LoadingButton>
							<LoadingButton
								size="small"
								color="error"
								onClick={openModalDel}
								disabled={loadingSave}
								loading={isOnDelete}
								startIcon={<DeleteIcon />}
							>
								{TEXT.BTN_CLEAR}
							</LoadingButton>
						</>
					) : (
						""
					)}
				</Box>
			</Box>
		</Box>
	);
};

ParserSettingsUrlList.propTypes = {
	isOnUpd: PropTypes.bool.isRequired,
	isOnDelete: PropTypes.bool.isRequired,
	setIsOnUpd: PropTypes.func.isRequired,
	openModalDel: PropTypes.func.isRequired,
};

export default ParserSettingsUrlList;
