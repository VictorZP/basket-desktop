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
const GamesSettings = lazy(() => import("../pages/GamesSettings.jsx"));
const MatchesSettings = lazy(() => import("../pages/MatchesSettings.jsx"));
const ActiveGames = lazy(() => import("../pages/ActiveGames.jsx"));
const ParserPage = lazy(() => import("../pages/ParserPage.jsx"));
const ParserSettings = lazy(() => import("../pages/ParcerSettings.jsx"));
const BettingResults = lazy(() => import("../pages/BettingResults.jsx"));
const ManualResults = lazy(() => import("../pages/ManualResults.jsx"));

const appRouter = createHashRouter(
	createRoutesFromElements(
		<>
			<Route element={<PrivateRoute />}>
				<Route path="/" element={<HomePage />}>
					<Route path="matches" element={<GamesSettings />} />
					<Route path="matches_setting" element={<MatchesSettings />} />
					<Route path="manual_results" element={<ManualResults />} />
					<Route path="betting_results" element={<BettingResults />} />
					<Route path="active_games" element={<ActiveGames />} />
					<Route path="parcer" element={<ParserPage />} />
					<Route path="parcer_settings" element={<ParserSettings />} />
				</Route>
			</Route>

			<Route element={<PublicRoute />}>
				<Route path="login" element={<LoginPage />} />
			</Route>
		</>
	)
);

export default appRouter;
