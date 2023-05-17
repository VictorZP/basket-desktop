import * as React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				navigate("/");
			}}
		>
			Login
		</button>
	);
};

export default LoginPage;
