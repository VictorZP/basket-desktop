import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { ruRU as ruLoc } from "@mui/x-date-pickers/locales";
import { ruRU } from "@mui/material/locale";

import settingsRouter from "./routes/settingsWindow/settingsRoutes.js";
import DismissAction from "./components/DismissAction/DismissAction.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "normalize.css";

const theme = createTheme(ruRU, ruLoc);

const SettingsWindow = () => {
	return (
		<SnackbarProvider
			maxSnack={3}
			hideIconVariant
			action={(key) => <DismissAction id={key} />}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
		>
			<RouterProvider router={settingsRouter} />
		</SnackbarProvider>
	);
};

const root = createRoot(document.getElementById("settingsPage"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
				<SettingsWindow />
			</LocalizationProvider>
		</ThemeProvider>
	</React.StrictMode>
);
