import * as React from "react";

import {
	createHashRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import Matches from "../pages/Matches.jsx";
import MatchesSettings from "../pages/MatchesSettings.jsx";

const appRouter = createHashRouter(
	createRoutesFromElements(
		<>
			<Route element={<PrivateRoute />}>
				<Route path="/" element={<HomePage />}>
					<Route path="matches" element={<Matches />} />
					<Route path="matches_setting" element={<MatchesSettings />} />
				</Route>
			</Route>

			<Route element={<PublicRoute />}>
				<Route path="login" element={<LoginPage />} />
			</Route>
		</>
	)
);

export default appRouter;
