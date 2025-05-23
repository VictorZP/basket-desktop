const { dialog } = require("electron");
const fs = require("fs");
const { utils, write } = require("xlsx");

const createSeasonStatisticsFile = async (data, title) => {
	const workbook = utils.book_new();

	const formattedData = data.map((item) => {
		return {
			Date: item.matchDate,
			Championship: item.championshipName,
			"Home Team": item.homeTeamName,
			"Away Team": item.awayTeamName,
			Res: item.matchResScores,
			Predict: item.predict,
			KickOff: item.kickOff,
			Diff: item.predictKickOffDiff,
			Conclusion: item.betConclusionResult,
			"": item.message,
		};
	});

	worksheet = utils.json_to_sheet(formattedData);

	utils.book_append_sheet(workbook, worksheet, "Статистика");

	const formattedTitle = title.replaceAll(" ", "_")?.replaceAll("/", "-");
	const fileName = `${formattedTitle}.xlsx`;

	const defaultPath = process.env.USERPROFILE + "\\Downloads\\";
	//	File in directory
	const dir = fs.readdirSync(defaultPath);
	// Count of files in directory with the same name
	const filesNumberWithSameName = dir?.filter((file) => {
		return file.includes(formattedTitle);
	})?.length;

	let dialogData = {
		title: "Сохранить файл",
		fileName: fileName,
		defaultPath: "",
		filters: [{ name: ".xlsx", extensions: ["xlsx", "xls"] }],
	};

	// According to the number of files with the same name, we will create a new name for the file
	// and set the path to save the file
	if (filesNumberWithSameName === 0) {
		const customFilePath = defaultPath + fileName;

		dialogData.defaultPath = customFilePath;
	} else if (filesNumberWithSameName > 0) {
		const extIndex = fileName.lastIndexOf(".");
		const newFileName = `${fileName.slice(
			0,
			extIndex
		)} - ${filesNumberWithSameName}${fileName.slice(extIndex)}`;
		const customFilePath = defaultPath + newFileName;

		dialogData.defaultPath = customFilePath;
		dialogData.fileName = newFileName;
	}

	const { filePath, canceled } = await dialog.showSaveDialog(null, dialogData);

	if (canceled || !filePath) {
		return { status: "cancelled" };
	}

	try {
		// Write the workbook to a file
		const wb = write(workbook, {
			bookType: "xlsx",
			type: "buffer",
		});

		fs.writeFileSync(filePath, wb);
		return { status: "finished" };
	} catch (err) {
		return { status: "error", message: err.message };
	}
};

module.exports = { createSeasonStatisticsFile };
