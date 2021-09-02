module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						components: './src/components',
						layoutcomp: './src/components/layout',
						utils: './src/utils',
						styles: './src/assets/styles',
						screens: './src/screens',
						navigation: './src/components/navigation',
					},
				},
			],
		],
	};
};
