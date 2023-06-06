import React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = ({ height }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height,
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default LoadingSpinner;
