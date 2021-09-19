module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['.'],
					extensions: ['.android.js', '.js', '.jsx', '.json'],
					alias: {
						components: './src/components',
						layoutcomp: './src/components/layout',
						utils: './src/utils',
						styles: './src/assets/styles',
						screens: './src/screens',
						navigation: './src/components/navigation',
						images: './src/assets/images',
						search: './src/components/layout/search',
						person: './src/components/layout/person',
					},
				},
			],
		],
	};
};
