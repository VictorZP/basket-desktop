import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { SnackbarProvider } from "notistack";

import appRouter from "./routes/appRouter.js";
import DismissAction from "./components/DismissAction/DismissAction.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "normalize.css";

const App = () => {
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
			<RouterProvider router={appRouter} />
		</SnackbarProvider>
	);
};

const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
