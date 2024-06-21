import React from "react";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import { AccordionSummary } from "../../helpers/reusableComponents/gamesStaticListAccordion";
import {
	generateBtnId,
	getGamesByCyber,
	getCyberIDForAccordion,
} from "../../helpers/functions/addMatches";

const AccordionSummaryComponent = ({
	cyber,
	games,
	expanded,
	setTempAndPredictFromFile,
	loadingTempFromFileBtnId,
}) => {
	const btnId = generateBtnId(cyber);
	return (
		<AccordionSummary>
			<Typography variant="subtitle1">{cyber}</Typography>
			{expanded[getCyberIDForAccordion(cyber)] && (
				<LoadingButton
					variant="outlined"
					size="small"
					sx={{ background: "#fff" }}
					id={btnId}
					onClick={setTempAndPredictFromFile}
					disabled={
						getGamesByCyber(games, cyber).length === 0 ||
						(loadingTempFromFileBtnId !== btnId &&
							loadingTempFromFileBtnId !== "")
					}
					loading={loadingTempFromFileBtnId === btnId}
				>
					Установить темп/предикт
				</LoadingButton>
			)}
		</AccordionSummary>
	);
};

AccordionSummaryComponent.propTypes = {
	cyber: PropTypes.string.isRequired,
	games: PropTypes.array.isRequired,
	expanded: PropTypes.object.isRequired,
	setTempAndPredictFromFile: PropTypes.func.isRequired,
	loadingTempFromFileBtnId: PropTypes.string.isRequired,
};

export default AccordionSummaryComponent;
