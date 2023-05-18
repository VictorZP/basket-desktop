import * as React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

const LoginPage = () => {
	const navigate = useNavigate();
	return (
		<Button
			variant="outlined"
			onClick={() => {
				navigate("/");
			}}
		>
			Login
		</Button>
	);
};

export default LoginPage;
