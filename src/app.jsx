import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import appRouter from "./routes/appRouter.js";

import "normalize.css";

const App = () => {
	return <RouterProvider router={appRouter} />;
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
