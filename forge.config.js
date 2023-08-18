module.exports = {
	packagerConfig: {},
	rebuildConfig: {},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {},
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin"],
		},
		{
			name: "@electron-forge/maker-deb",
			config: {},
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {},
		},
	],

	publishers: [
		{
			name: "@electron-forge/publisher-github",
			config: {
				repository: {
					owner: "VictorZP",
					name: "basket-desktop",
				},
				authToken: process.env.GITHUB_TOKEN,
				prerelease: false,
			},
		},
	],

	plugins: [
		{
			name: "@electron-forge/plugin-webpack",
			config: {
				port: 3000,
				mainConfig: "./webpack.main.config.js",
				devContentSecurityPolicy: `default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;`,
				renderer: {
					config: "./webpack.renderer.config.js",
					entryPoints: [
						{
							html: "./src/index.html",
							js: "./src/renderer/renderer.js",
							name: "main_window",
							preload: {
								js: "./src/preload/preload.js",
							},
						},
					],
				},
			},
		},
	],
	publishers: [
		{
			name: "@electron-forge/publisher-github",
			config: {
				repository: {
					repository: "https://github.com/VictorZP/basket-desktop.git",
					owner: "VictorZP",
					name: "basket-app",
					authToken: "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",
				},
				prerelease: true,
			},
		},
	],
};
