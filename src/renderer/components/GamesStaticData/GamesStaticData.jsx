import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";

const ipcRenderer = window.require("electron").ipcRenderer;

import { Box } from "@mui/material";

import {
	Accordion,
	AccordionDetails,
} from "../../helpers/reusableComponents/gamesStaticListAccordion";
import GamesStaticDetailsList from "../GamesStaticDetailsList";
import { AccordionSummaryComponent } from "../../ui/addGamesPage";
import DelModal from "../DelModal/DelModal.jsx";

import {
	handleModalDelOpen,
	handleModalDelClose,
	setLoading,
	setModalDelData,
	refreshModalDel,
} from "../../redux/modalDelete/modalDelSlice.js";
import {
	isMDOpen,
	getMDElemId,
} from "../../redux/modalDelete/modalDelSelector.js";
import { handleUrlAdded } from "../../redux/urlForm/urlFormSlice";

import {
	generateStateObject,
	getCyberIDForAccordion,
	handleSetTempAndPredictFromFile,
} from "../../helpers/functions/addMatches";

import { CHANNELS } from "../../../common/constants";
import { MODAL_DEL } from "../../constants/modaldel.js";
import { CYBER_LIST, STATUS } from "../../constants";

const TEXT = {
	DESC_EXTENDED: "выбранного матча",
};

const GamesStaticData = ({ games, setGames, setUpdatedMatches }) => {
	const [loadingTempFromFileBtnId, setLoadingTempFromFileBtnId] = useState("");
	const [expanded, setExpanded] = useState(generateStateObject(CYBER_LIST));
	const isOpen = useSelector(isMDOpen);
	const id = useSelector(getMDElemId);
	const dispatch = useDispatch();

	const handleInput = (e) => {
		const elemID = e.target.id;
		const id = elemID?.split("_")?.slice(1)?.join("_");
		const name = elemID?.split("_")?.at(0);

		const value = e?.target?.value;
		let index = games?.findIndex((game) => game?.matchId === id);

		const updatedDataList = games;
		if (name === "temp") {
			updatedDataList[index].temp = value;
		} else {
			updatedDataList[index].predict = value;
		}

		setGames([...updatedDataList]);

		const matchesToSave = updatedDataList?.map((game) => {
			if (!game) return;

			const dataForSave = {
				matchId: game?.matchId,
				temp: Number.parseFloat(game?.temp),
				predict: Number.parseFloat(game?.predict),
			};
			return dataForSave;
		});

		setUpdatedMatches([...matchesToSave]);
	};

	const setTempAndPredictFromFile = async (e) => {
		try {
			const btnId = e.currentTarget.id;
			setLoadingTempFromFileBtnId(btnId);

			const handlerResult = await handleSetTempAndPredictFromFile(btnId, games);
			if (
				handlerResult.status === STATUS.ERROR ||
				handlerResult.status === STATUS.WARNING
			) {
				enqueueSnackbar(handlerResult?.message, {
					variant: handlerResult.status || STATUS.ERROR,
				});
				return;
			} else {
				enqueueSnackbar(handlerResult?.message, {
					variant: "success",
				});
			}
		} catch (err) {
			enqueueSnackbar(err?.message, {
				variant: STATUS.ERROR,
			});
		} finally {
			dispatch(handleUrlAdded(true));
			setLoadingTempFromFileBtnId("");
		}
	};

	const handleAccordionExpandedStatus = (panel) => (e, isExpanded) => {
		if (e.target.nodeName !== "BUTTON") {
			setExpanded((prev) => ({
				...prev,
				[getCyberIDForAccordion(panel)]: isExpanded,
			}));
		}
	};

	const openDeleteModal = (matchId) => {
		if (!matchId) return;

		const payload = {
			pageType: MODAL_DEL.PAGE_TYPE_MATCHES,
			descriptionExtend: TEXT.DESC_EXTENDED,
			elemId: matchId,
		};

		dispatch(setModalDelData(payload));
		dispatch(handleModalDelOpen());
	};

	const handleDelete = async () => {
		dispatch(setLoading());

		try {
			const handleDeleteResult = await ipcRenderer.invoke(
				CHANNELS.ANALYZE.DELETE_MATCH,
				{ id }
			);

			if (handleDeleteResult.statusCode !== 200) {
				enqueueSnackbar(handleDeleteResult?.message, {
					variant: "error",
				});

				return;
			}
			setGames((prev) => prev.filter((game) => game?.matchId !== id));
			setUpdatedMatches((prev) => prev.filter((game) => game?.matchId !== id));

			enqueueSnackbar(handleDeleteResult?.message, {
				variant: "success",
			});
		} catch (err) {
			enqueueSnackbar(err?.message, {
				variant: "error",
			});
			return;
		} finally {
			dispatch(handleModalDelClose());
			dispatch(refreshModalDel());
		}
	};

	const handleClose = () => {
		dispatch(handleModalDelClose());
		!isOpen && dispatch(refreshModalDel());
	};

	const delModalProps = {
		handleClose,
		handleDelete,
	};

	return (
		<Box sx={{ py: 1 }} maxWidth={1300}>
			{CYBER_LIST
				? CYBER_LIST.map((cyber) => {
						return (
							<Accordion
								key={cyber}
								expanded={expanded[getCyberIDForAccordion(cyber)]}
								id={getCyberIDForAccordion(cyber)}
								onChange={handleAccordionExpandedStatus(cyber)}
							>
								<AccordionSummaryComponent
									cyber={cyber}
									games={games}
									expanded={expanded}
									setTempAndPredictFromFile={setTempAndPredictFromFile}
									loadingTempFromFileBtnId={loadingTempFromFileBtnId}
								/>
								<AccordionDetails>
									<GamesStaticDetailsList
										handleTemp={handleInput}
										games={games}
										cyber={cyber}
										openDeleteModal={openDeleteModal}
									/>
								</AccordionDetails>
							</Accordion>
						);
				  })
				: ""}
			<DelModal {...delModalProps} />
		</Box>
	);
};

export default GamesStaticData;

GamesStaticData.propTypes = {
	games: PropTypes.array.isRequired,
	setGames: PropTypes.func.isRequired,
	setUpdatedMatches: PropTypes.func.isRequired,
};
