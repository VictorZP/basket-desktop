import React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default LoadingSpinner;
