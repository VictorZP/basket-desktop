import React, { lazy } from "react";

import {
	createHashRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

const MainPage = lazy(() =>
	import("../../pages/matchesStatsWindow/MainPage.jsx")
);

const matchesStatsRouter = createHashRouter(
	createRoutesFromElements(<Route path="/" element={<MainPage />} />)
);

export default matchesStatsRouter;
