module.exports = {
	packagerConfig: { asar: true, icon: "./src/main/images/icon.ico" },
	rebuildConfig: {},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				icon: "./src/main/images/icon.ico",
			},
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
				draft: true,
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
						{
							html: "./src/settings.html",
							js: "./src/renderer/settings.js",
							name: "settings_window",
							preload: {
								js: "./src/preload/preload.js",
							},
						},
						{
							html: "./src/matchesStats.html",
							js: "./src/renderer/matchesStats.js",
							name: "matches_stats_window",
							preload: {
								js: "./src/preload/preload.js",
							},
						},
					],
				},
			},
		},
	],
};
