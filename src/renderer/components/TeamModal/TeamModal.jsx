import React, { useState, useEffect } from "react";

import { Box, Typography, Divider } from "@mui/material";

import {
	TeamModalContainer,
	TeamModalInnerBox,
} from "../../helpers/reusableComponents/teamNameModal.js";

const TeamModal = () => {
	return (
		<TeamModalContainer>
			<TeamModalInnerBox
				sx={{
					background: "#fff",
					width: "1100px",
					height: "700px",
					borderRadius: "10px",
				}}
			>
				Team Modal
			</TeamModalInnerBox>
		</TeamModalContainer>
	);
};

export default TeamModal;
