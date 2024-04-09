const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: "./src/main/main.js",
	// Put your normal webpack config below here
	module: {
		rules: require("./webpack.rules"),
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: "./dist/data/config.json",
					to: "./data/config.json",
				},
			],
		}),
	],
};
