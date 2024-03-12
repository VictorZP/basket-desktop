import * as React from "react";
import "./styles.css";
import PropTypes from "prop-types";

import { Typography, Tooltip, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";

import { ACTIVE_PAGE } from "../../constants/activeGamesPage.js";

const ListItemButtons = ({ matchId, matchUrl, openBrowser, hideMatch }) => {
	return (
		<>
			<Typography variant="span" width={50}>
				<Tooltip title={ACTIVE_PAGE.URL.TITLE} placement="right">
					<IconButton color="primary" onClick={() => openBrowser(matchUrl)}>
						<LanguageIcon />
					</IconButton>
				</Tooltip>
			</Typography>
			<Typography variant="span">
				<Tooltip title={ACTIVE_PAGE.CLOSE} placement="top">
					<IconButton color="error" onClick={() => hideMatch(matchId)}>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</Typography>
		</>
	);
};

ListItemButtons.propTypes = {
	matchId: PropTypes.string.isRequired,
	matchUrl: PropTypes.string.isRequired,
	hideMatch: PropTypes.func.isRequired,
	openBrowser: PropTypes.func.isRequired,
};

export default ListItemButtons;
