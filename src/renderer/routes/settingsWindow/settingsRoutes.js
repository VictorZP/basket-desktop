import React, { lazy } from "react";

import {
	createHashRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

const MainPage = lazy(() => import("../../pages/settingsWindow/MainPage.jsx"));

const settingsRouter = createHashRouter(
	createRoutesFromElements(<Route path="/" element={<MainPage />} />)
);

export default settingsRouter;
