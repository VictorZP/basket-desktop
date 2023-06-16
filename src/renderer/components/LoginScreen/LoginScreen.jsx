import * as React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { LOGIN_PAGE } from "../../constants/loginPage.js";
import s from "./styles.js";

const LoginScreen = ({ errorMessage, logError, handleSubmit, setLogError }) => {
	return (
		<Container component="section" maxWidth="xs" sx={s.section}>
			<Box sx={s.box}>
				<Typography component="h1" variant="h5">
					{LOGIN_PAGE.TITLE}
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={s.form}>
					<TextField
						error={logError}
						margin="normal"
						required
						fullWidth
						id="email"
						label={LOGIN_PAGE.LABEL.EMAIL}
						name="email"
						autoComplete="email"
						autoFocus
						helperText={logError && errorMessage.email}
					/>

					<TextField
						error={logError}
						margin="normal"
						required
						fullWidth
						name="password"
						label={LOGIN_PAGE.LABEL.PASSWORD}
						type="password"
						id="password"
						autoComplete="current-password"
						helperText={logError && errorMessage.password}
						onBlur={() => {
							setLogError(false);
						}}
					/>

					<Button type="submit" variant="contained" sx={s.button}>
						{LOGIN_PAGE.BUTTON.LOGIN}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

LoginScreen.propTypes = {
	errorMessage: PropTypes.shape({
		email: PropTypes.string,
		password: PropTypes.string,
	}),
	logError: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	setLogError: PropTypes.func.isRequired,
};

export default LoginScreen;
