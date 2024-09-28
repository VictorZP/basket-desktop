const fs = require("fs").promises;
const path = require("path");
const os = require("os");

const { STATUS } = require("../../common/constants");

const getFilesFromSystem = async (fileName) => {
	try {
		// Access the Documents folder
		const documentsFolder = path.join(os.homedir(), "Documents", "BasketApp");

		// Construct full paths to the files
		const filePath = path.join(documentsFolder, `${fileName}.xlsx`);

		// Check if the files exist
		const isFileExists = await fs
			.access(filePath)
			.then(() => true)
			.catch(() => false);

		if (!isFileExists) {
			throw new Error(`Не удалось найти файл ${fileName}`);
		}

		const fileBuffer = await fs.readFile(filePath, null);
		const fileContent = fileBuffer.buffer.slice(
			fileBuffer.byteOffset,
			fileBuffer.byteOffset + fileBuffer.byteLength
		);

		// Return the file contents
		return { status: STATUS.SUCCESS, fileContent };
	} catch (err) {
		return {
			status: STATUS.ERROR,
			message: err?.message || "Error accessing files",
		};
	}
};

module.exports = { getFilesFromSystem };
