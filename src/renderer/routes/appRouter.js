import React, { lazy } from "react";

import {
	createHashRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const Matches = lazy(() => import("../pages/Matches.jsx"));
const MatchesSettings = lazy(() => import("../pages/MatchesSettings.jsx"));

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
