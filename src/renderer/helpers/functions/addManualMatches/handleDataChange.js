const handleDataChange = (e, games, updatedMatches) => {
	const elemID = e.target.id;
	const id = elemID?.split("_")[1];
	const name = elemID?.split("_")[0];
	const value = e?.target?.value;

	const index = games?.findIndex((game) => game?.matchId === id);

	const updatedDataList = [...games];

	switch (name) {
		case "deviation":
			updatedDataList[index].deviation = value;
			break;
		case "total":
			updatedDataList[index].total = value;
			break;
		case "temp":
			updatedDataList[index].temp = value;
			break;
		case "attackKef":
			updatedDataList[index].attackKef = value;
			break;
		case "calcTemp":
			updatedDataList[index].calcTemp = value;
			break;
		case "totalSecondHalf":
			updatedDataList[index].totalSecondHalf = value;
			break;
		case "totalInMoment":
			updatedDataList[index].totalInMoment = value;
			break;
		case "predict":
			updatedDataList[index].predict = value;
			break;

		default:
			break;
	}

	const updatedMatchIndex = updatedMatches?.findIndex(
		(match) => match?.matchId === id
	);

	if (updatedMatchIndex === -1) {
		updatedMatches.push({
			matchId: updatedDataList[index].matchId,
			deviation: Number.parseFloat(updatedDataList[index]?.deviation || 0),
			total: Number.parseFloat(updatedDataList[index]?.total || 0),
			temp: Number.parseFloat(updatedDataList[index]?.temp || 0),
			attackKef: Number.parseFloat(updatedDataList[index]?.attackKef || 0),
			calcTemp: Number.parseFloat(updatedDataList[index]?.calcTemp || 0),
			totalSecondHalf: Number.parseFloat(
				updatedDataList[index]?.totalSecondHalf || 0
			),
			totalInMoment: Number.parseFloat(
				updatedDataList[index]?.totalInMoment || 0
			),
			predict: Number.parseFloat(updatedDataList[index]?.predict || 0),
		});
	} else {
		updatedMatches[updatedMatchIndex].deviation = Number.parseFloat(
			updatedDataList[index]?.deviation || 0
		);
		updatedMatches[updatedMatchIndex].total = Number.parseFloat(
			updatedDataList[index]?.total || 0
		);
		updatedMatches[updatedMatchIndex].temp = Number.parseFloat(
			updatedDataList[index]?.temp || 0
		);
		updatedMatches[updatedMatchIndex].attackKef = Number.parseFloat(
			updatedDataList[index]?.attackKef || 0
		);
		updatedMatches[updatedMatchIndex].calcTemp = Number.parseFloat(
			updatedDataList[index]?.calcTemp || 0
		);
		updatedMatches[updatedMatchIndex].totalSecondHalf = Number.parseFloat(
			updatedDataList[index]?.totalSecondHalf || 0
		);
		updatedMatches[updatedMatchIndex].totalInMoment = Number.parseFloat(
			updatedDataList[index]?.totalInMoment || 0
		);
		updatedMatches[updatedMatchIndex].predict = Number.parseFloat(
			updatedDataList[index]?.predict || 0
		);
	}

	return { updatedDataList, updatedMatches };
};

export default handleDataChange;
