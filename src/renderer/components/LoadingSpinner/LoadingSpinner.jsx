import React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = ({ height, size }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height,
			}}
		>
			<CircularProgress size={size} />
		</Box>
	);
};

export default LoadingSpinner;
