import * as React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const { shell } = window.require("electron");

import { Box, Typography, Tooltip, IconButton, Divider } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";

import { CYBER_LIST } from "../../constants/cyberList.js";
import { ACTIVE_PAGE } from "../../constants/activeGamesPage.js";

const ActiveGamesList = ({ matches, hideMatch }) => {
	const gamesByCyber = (cyber) => {
		return matches?.filter((item) => {
			return item?.cyber === cyber;
		});
	};

	const openBrowser = (url) => {
		shell.openExternal(url);
	};

	return (
		<Box p={3}>
			<Box
				sx={{
					position: "relative",
					overflow: "auto",
					width: "1100px",
				}}
			>
				{CYBER_LIST.map((cyber) => {
					return (
						<Box key={cyber}>
							<Box
								sx={{
									display: "flex",
									padding: "12px 16px",
									minHeight: "48px",
									border: "1px solid rgba(0, 0, 0, .125)",
									backgroundColor: "rgba(0, 0, 0, .03)",
								}}
							>
								<Typography variant="subtitle1">{cyber}</Typography>
							</Box>
							<ul>
								{gamesByCyber(cyber).map((match) => {
									return (
										<li
											key={match?.eventId ? match?.eventId : match?.url}
											className={`active-list__item ${
												match.difRes === "less"
													? "active-list__item-less"
													: "active-list__item-more"
											}`}
										>
											<div className="active-list__row">
												<span className="active-list__deviation">
													{match.deviation}
												</span>
												<span className="active-list__deviation"></span>
												<span className="active-list__championship">
													{match.champ}
												</span>
												<span className="active-list__team">
													{match.teamHome}
												</span>
												<span className="active-list__team">
													{match.teamAway}
												</span>
												<span className="active-list__total">
													{match.kickOFF}
												</span>
												<span className="active-list__total">{match.temp}</span>
												<span className="active-list__attackKEF">
													{match.attackKEF}
												</span>
												<span className="active-list__calcTemp">
													{match.calcTemp}
												</span>
												<span className="active-list__total2ndHALF">
													{match.total2ndHALF}
												</span>
												<span className="active-list__totalInMoment">
													<Tooltip
														title={
															<div className="active-list__tooltip">
																<div className="active-list__tooltip--ods">
																	<span className="active-list__tooltip-span">
																		{match?.overOd ?? "-"}
																	</span>
																	<span className="active-list__tooltip-span">
																		{match?.underOd ?? "-"}
																	</span>
																</div>
																<Divider sx={{ background: "#fff" }} />
																<div className="active-list__tooltip--limit">
																	<span className="active-list__tooltip-span">
																		{match?.betLimit ?? "-"}
																	</span>
																</div>
															</div>
														}
													>
														<Typography>{match.totalInMoment}</Typography>
													</Tooltip>
												</span>
												<span className="active-list__predict">
													{match.predict}
												</span>
												<span className="active-list__url">
													<Tooltip
														title={ACTIVE_PAGE.URL.TITLE}
														placement="right"
													>
														<IconButton
															color="primary"
															onClick={() => openBrowser(match.url)}
														>
															<LanguageIcon />
														</IconButton>
													</Tooltip>
												</span>
												<span className="active-list__close">
													<Tooltip title={ACTIVE_PAGE.CLOSE} placement="top">
														<IconButton
															color="error"
															onClick={() =>
																hideMatch(
																	match?.eventId ? match?.eventId : match?.url
																)
															}
														>
															<CloseIcon />
														</IconButton>
													</Tooltip>
												</span>
											</div>
										</li>
									);
								})}
							</ul>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

ActiveGamesList.propTypes = {
	matches: PropTypes.array,
	hideMatch: PropTypes.func,
};

export default ActiveGamesList;
